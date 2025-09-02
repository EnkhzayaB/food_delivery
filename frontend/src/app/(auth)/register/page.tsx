"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomAlertDialog } from "@/components/dialogs/CustomAlertDialog";

const registerSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormDataType = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: "",
    description: "",
  });

  const showAlert = (title: string, description: string) => {
    setAlertDialog({
      isOpen: true,
      title,
      description,
    });
  };

  const closeAlert = () => {
    setAlertDialog({ ...alertDialog, isOpen: false });
  };

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
        showAlert("Signup Failed", result.message);
      }
    } catch (error) {
      console.error("Error during signup", error);
      showAlert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-red-500 flex items-center justify-center">
        <img
          src="/auth.jpg"
          alt="auth"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Create your account</h1>
                <p className="text-gray-600 text-lg font-normal">
                  Sign up to explore your favorite dishes.
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  {...methods.register("email")}
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {methods.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {methods.formState.errors.email.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">
                  Create a strong password
                </h1>
                <p className="text-gray-600 text-lg font-normal">
                  Create a strong password with letters, numbers.
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  {...methods.register("password")}
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                {methods.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {methods.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  {...methods.register("confirmPassword")}
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                {methods.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {methods.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                onClick={methods.handleSubmit(onSubmit)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Create Account
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-green-600 mb-2">
                🎉 You became a new user!
              </h1>
              <a
                href="/log"
                className="text-blue-600 cursor-pointer text-xl font-semibold"
              >
                Log In
              </a>
            </div>
          )}
        </div>
      </div>

      <CustomAlertDialog
        isOpen={alertDialog.isOpen}
        onClose={closeAlert}
        title={alertDialog.title}
        description={alertDialog.description}
      />
    </div>
  );
}
