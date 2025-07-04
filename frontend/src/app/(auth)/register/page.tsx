"use client";
import Link from "next/link";
import { useState } from "react";
import Email from "./components/Email";
import Password from "./components/Password";

export default function registerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  type FormDataType = {
    email: string | number;
    password: string | number;
    confirmPassword: string | number;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-start p-8 gap-6 bg-white">
        {step === 1 ? (
          <Link href={"/"}>
            {" "}
            <button className="border border-[#e4e4e7] rounded w-[36px] h-[36px] flex justify-center items-center">
              {" "}
              <img src="/arrow-left.svg" alt="" className="w-[16px] h-[16px]" />
            </button>{" "}
          </Link>
        ) : (
          <button
            className="border border-[#e4e4e7] rounded w-[36px] h-[36px] flex justify-center items-center"
            onClick={() => (step > 1 ? setStep(step - 1) : "")}
          >
            {" "}
            <img src="/arrow-left.svg" alt="" className="w-[16px] h-[16px]" />
          </button>
        )}

        {step === 1 && <Email formData={formData} setFormData={setFormData} />}
        {step === 2 && (
          <Password formData={formData} setFormData={setFormData} />
        )}

        <button
          className="w-full bg-[#18181B] text-white p-3 rounded-md font-medium hover:bg-gray-300 hover:text-black"
          onClick={() => (step < 2 ? setStep(step + 1) : "")}
        >
          Let's Go
        </button>

        <Link href={"/log"}>
          <p className="text-sm text-gray-600 ">
            Already have an account?
            <span className="text-blue-600 cursor-pointer"> &nbsp; Log in</span>
          </p>
        </Link>
      </div>

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
