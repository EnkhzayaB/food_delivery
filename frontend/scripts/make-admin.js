// Clerk API ашиглан хэрэглэгчид admin эрх өгөх script
// Энэ script-г terminal дээрээс ажиллуулж болно: node scripts/make-admin.js EMAIL

const { clerkClient } = require("@clerk/nextjs/server");

async function makeUserAdmin(email) {
  try {
    // Email хаягаар хэрэглэгч хайх
    const users = await clerkClient.users.getUserList({
      emailAddress: [email],
    });

    if (users.length === 0) {
      console.log(`❌ ${email} хаягтай хэрэглэгч олдсонгүй`);
      return;
    }

    const user = users[0];

    // Admin role нэмэх
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role: "admin",
      },
    });

    console.log(`✅ ${email} хэрэглэгчид admin эрх олгогдлоо!`);
    console.log(`👤 User ID: ${user.id}`);
    console.log(`📧 Email: ${user.emailAddresses[0]?.emailAddress}`);
  } catch (error) {
    console.error("❌ Алдаа гарлаа:", error);
  }
}

// Command line аргумент шалгах
const email = process.argv[2];

if (!email) {
  console.log("❌ Email хаяг оруулна уу!");
  console.log("Жишээ: node scripts/make-admin.js user@example.com");
  process.exit(1);
}

makeUserAdmin(email);
