import Link from "next/link";

export default function rE() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-start p-8 gap-6 bg-white">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-gray-600 text-lg font-normal">
          Sign up to explore your favorite dishes.
        </p>

        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        />

        <button className="w-full bg-[#18181B] text-white p-3 rounded-md font-medium hover:bg-gray-300 hover:text-black">
          Let's Go
        </button>

        <Link href={"/log"}>
          <p className="text-sm text-gray-600 ">
            Already have an account?
            <span className="text-blue-600 cursor-pointer"> &nbsp; Log in</span>
          </p>
        </Link>
      </div>

      {/* Right section - Image */}
      <div className="hidden md:block">
        <img
          src="/auth.jpg"
          alt="Delivery rider"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
