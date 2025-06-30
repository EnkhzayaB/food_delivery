"use client";
import { useState } from "react";
import SignUp from "@/components/auth/SignUp";
import CreatePassword from "./CreatePassword";
import LogIn from "./LogIn";
import Link from "next/link";

export default function Auth() {
  const [step, setStep] = useState(1);
  type FormDataType = {
    email: string | number;
    password: string | number;
    confirmPassword: string | number;
  };
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="flex justify-center items-center h-[1100px]">
      <div className="w-full h-full flex items-center relative">
        <div className="w-[40%] h-full flex flex-col justify-center items-center">
          <div
            className={
              step === 1
                ? "absolute left-[10.8%] top-[34%]"
                : "absolute left-[10.8%] top-[31%]"
            }
          >
            <button
              className="border border-[#e4e4e7] rounded w-[36px] h-[36px] flex justify-center items-center mb-5"
              onClick={() => (step > 1 ? setStep(step - 1) : "")}
            >
              <img src="/arrow-left.svg" alt="" className="w-[16px] h-[16px]" />
            </button>
          </div>

          <div>
            {step === 1 && (
              <SignUp formData={formData} setFormData={setFormData} />
            )}
            {step === 2 && (
              <CreatePassword formData={formData} setFormData={setFormData} />
            )}
            {step === 3 && (
              <LogIn formData={formData} setFormData={setFormData} />
            )}
          </div>

          <button
            className="border border-[#e4e4e7] bg-[#18181B] rounded-[6px] mt-5 w-[416px] h-[36px] text-white not-italic"
            onClick={() => (step < 3 ? setStep(step + 1) : "")}
          >
            {" "}
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

        <img
          src="/auth.jpg"
          className="w-[60%] h-full rounded-[20px] absolute right-10 mt-20 mb-10 bg-cover bg-no-repeat bg-center"
        />
      </div>
    </div>
  );
}
