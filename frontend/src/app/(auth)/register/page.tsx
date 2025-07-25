"use client";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Email from "../../../components/auth/Email";
import Password from "../../../components/auth/Password";
import Success from "../../../components/auth/Success";

const registerSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email address")
    .required("please must enter your email"),
  password: yup
    .string()
    .min(6, "please enter 6 characters long password")
    .required("please must enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password does not match")
    .required("please must enter your password again"),
});

type FormDataType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormDataType>({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleNext = async () => {
    const current = step === 1 ? ["email"] : ["password", "confirmPassword"];
    const isValid = await methods.trigger(current);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: FormDataType) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const result = await res.json();

      console.log(result);

      if (res.ok) {
        setStep(3);
      } else {
        alert("Signup failed: " + result.message);
      }
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <FormProvider {...methods}>
        {step === 3 ? (
          <div className="flex justify-center items-center p-8 bg-white w-full">
            <Success />
          </div>
        ) : (
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-start p-8 gap-6 bg-white"
          >
            <button
              type="button"
              onClick={() =>
                step > 1 ? setStep(step - 1) : <Link href={"/"}></Link>
              }
              className="border border-[#e4e4e7] rounded w-[36px] h-[36px] flex justify-center items-center"
            >
              <img
                src="/arrow-left.svg"
                alt="back"
                className="w-[16px] h-[16px]"
              />
            </button>

            {step === 1 && <Email />}
            {step === 2 && <Password />}

            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#18181B] text-white p-3 rounded-md font-medium hover:bg-gray-300 hover:text-black"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#18181B] text-white p-3 rounded-md font-medium hover:bg-gray-300 hover:text-black"
              >
                submit
              </button>
            )}

            <p className="text-sm text-gray-600 ">
              Already have an account?
              <span className="text-blue-600 cursor-pointer">
                {" "}
                &nbsp;Log in
              </span>
            </p>
          </form>
        )}

        <div className="hidden md:block">
          <img
            src="/food-delivery3.jpg"
            alt="Delivery rider"
            className="w-full h-screen object-cover"
          />
        </div>
      </FormProvider>
    </div>
  );
}
