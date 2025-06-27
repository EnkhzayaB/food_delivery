const SignUp = () => {
  return (
    <div className="flex flex-col">
      <div className="border border-[#e4e4e7] rounded w-[36px] h-[36px] flex justify-center items-center mb-5">
        <img src="/arrow-left.svg" alt="" className="w-[16px] h-[16px]" />
      </div>

      <h1 className="text-2xl font-semibold mb-1 not-italic">
        Create your account
      </h1>

      <h6 className="text-[#71717A] text-[16px] font-normal not-italic">
        Sign up to explore your favorite dishes.
      </h6>

      <div className="border border-[#e4e4e7] rounded-[6px] mt-5 w-[416px] h-[36px]">
        <input
          type="text"
          placeholder="Enter your email address"
          className="outline-none mt-1 ml-3 mr-3 w-full"
        />
      </div>

      <button className="border border-[#e4e4e7] bg-[#c6c5c5] rounded-[6px] mt-5 w-[416px] h-[36px] text-white not-italic">
        Let's go
      </button>

      <div className="flex justify-center mt-[24px]">
        <p className="text-[#71717A] text-lg font-normal not-italic">
          Already have an account?
        </p>
        <p className="text-[#2563EB] text-lg font-normal ml-1.5 not-italic">
          Log in
        </p>
      </div>
    </div>
  );
};

export default SignUp;
