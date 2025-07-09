import { useFormContext } from "react-hook-form";
type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Email() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();

  return (
    <>
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="text-gray-600 text-lg font-normal">
        Sign up to explore your favorite dishes.
      </p>

      <input
        {...register("email")}
        type="email"
        placeholder="Enter your email address"
        className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        // value={formData.email}
        // onChange={(e) => {
        //   setFormData({ ...formData, email: e.target.value });
        // }}
      />
      {errors.email && <p className="text-red-300"> {errors.email.message} </p>}
    </>
  );
}
