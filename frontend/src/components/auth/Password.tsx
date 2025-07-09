"use client";
import { useFormContext } from "react-hook-form";
type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Password() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();

  return (
    <>
      <h1 className="text-2xl font-semibold">Create a strong password</h1>
      <p className="text-gray-600 text-lg font-normal">
        Create a strong password with letters, numbers.
      </p>

      <input
        type="password"
        placeholder="password"
        className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        {...register("password")}
      />

      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <input
        type="password"
        placeholder="confirm password"
        className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        {...register("confirmPassword")}
      />

      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <p className="text-[#71717A] text-sm font-normal flex items-center">
        <input type="checkbox" className="border-[#09090B]" />
        &nbsp; &nbsp;Show password
      </p>
    </>
  );
}
