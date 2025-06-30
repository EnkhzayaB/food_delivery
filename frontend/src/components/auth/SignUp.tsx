"use client";
type Props = {
  formData: {
    email: string | number;
  };
  setFormData: (data: any) => any;
};

const Email = ({ formData, setFormData }: Props) => {
  return (
    <>
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
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>
    </>
  );
};

export default Email;
