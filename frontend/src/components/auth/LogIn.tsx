"use client";
type Props = {
  formData: {
    email: string | number;
    password: string | number;
  };
  setFormData: (data: any) => any;
};

const LogIn = ({ formData, setFormData }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-1 not-italic">Log in</h1>

      <h6 className="text-[#71717A] text-[16px] font-normal not-italic">
        Log in to enjoy your favorite dishes.
      </h6>

      <div className="border border-[#e4e4e7] rounded-[6px] mt-5 w-[416px] h-[36px]">
        <input
          type="text"
          placeholder="Enter your email address"
          className="outline-none mt-1 ml-3 mr-3 w-full"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>

      <div className="border border-[#e4e4e7] rounded-[6px] mt-5 w-[416px] h-[36px]">
        <input
          type="text"
          placeholder="
          Password"
          className="outline-none mt-1 ml-3 mr-3 w-full"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </div>

      <p className="text-sm font-normal underline decoration-solid decoration-auto underline-offset-auto text-underline-position mt-4">
        Forgot password ?
      </p>
    </>
  );
};

export default LogIn;
