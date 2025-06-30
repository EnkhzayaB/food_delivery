"use client";
type Props = {
  formData: {
    password: string | number;
    confirmPassword: string | number;
  };
  setFormData: (data: any) => any;
};

const CreatePassword = ({ formData, setFormData }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-1 not-italic">
        Create a strong password
      </h1>

      <h6 className="text-[#71717A] text-[16px] font-normal not-italic">
        Create a strong password with letters, numbers.
      </h6>

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

      <div className="border border-[#e4e4e7] rounded-[6px] mt-5 w-[416px] h-[36px]">
        <input
          type="text"
          placeholder="
           Confirm password"
          className="outline-none mt-1 ml-3 mr-3 w-full"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
          }}
        />
      </div>
    </>
  );
};

export default CreatePassword;
