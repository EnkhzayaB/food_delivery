import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Admin routes үед admin эрх шалгах
  if (isAdminRoute(request)) {
    const { sessionClaims } = await auth.protect();

    // Хэрэглэгчийн metadata-с admin эрх шалгах
    const isAdmin =
      sessionClaims?.metadata?.role === "admin" ||
      sessionClaims?.publicMetadata?.role === "admin";

    if (!isAdmin) {
      // Admin биш бол нүүр хуудас руу чиглүүлэх
      return Response.redirect(new URL("/", request.url));
    }
  }
  // Бусад хамгаалагдсан routes үед ердийн auth шалгах
  else if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
