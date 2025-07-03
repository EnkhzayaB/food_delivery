"use client";
import Link from "next/link";
type Props = {
  formData: {
    password: string | number;
    confirmPassword: string | number;
  };
  setFormData: (data: any) => any;
};

export default function Password({ formData, setFormData }: Props) {
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
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
      />

      <input
        type="password"
        placeholder="confirm password"
        className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        value={formData.confirmPassword}
        onChange={(e) => {
          setFormData({ ...formData, confirmPassword: e.target.value });
        }}
      />

      <p className="text-[#71717A] text-sm font-normal flex items-center">
        <input type="checkbox" className="border-[#09090B]" />
        &nbsp; &nbsp;Show password
      </p>
    </>
  );
}
