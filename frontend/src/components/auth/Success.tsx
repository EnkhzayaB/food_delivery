import Link from "next/link";
export default function Success() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-green-600 mb-2">
        🎉 You became a new user!
      </h1>
      <Link href={"/log"}>
        <p className="text-blue-600 cursor-pointer text-xl font-semibold">
          Log In
        </p>
      </Link>
    </div>
  );
}
