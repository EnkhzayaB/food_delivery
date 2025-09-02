"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomAlertDialog } from "@/components/dialogs/CustomAlertDialog";
import { PasswordInput } from "@/components/auth/PasswordInput";

const registerSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  adminCode: yup.string().optional(),
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
      adminCode: "",
    },
  });

  const handleNext = async () => {
    const current =
      step === 1
        ? (["email"] as const)
        : (["password", "confirmPassword"] as const);
    const isValid = await methods.trigger(current);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: FormDataType) => {
    try {
      const res = await fetch(`http://localhost:8000/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          adminCode: data.adminCode || undefined,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Signup successful
        setStep(3);
      } else {
        // Signup failed → backend-аас ирсэн message-ийг харуулна
        showAlert(
          "Signup Failed",
          result.message ||
            result.error?.message ||
            "Signup failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during signup", error);
      showAlert(
        "Error",
        `Network error: ${
          error instanceof Error
            ? error.message
            : "Please check if the server is running"
        }`
      );
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
              <PasswordInput
                register={methods.register}
                errors={methods.formState.errors}
                watch={methods.watch}
                clearErrors={methods.clearErrors}
              />

              {/* Admin Code (Optional) */}
              <div className="border-t pt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Want to create an admin account?
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="adminCode"
                    className="block text-sm font-semibold text-gray-800 mb-3"
                  >
                    Admin Code (Optional)
                  </label>
                  <div className="relative">
                    <input
                      {...methods.register("adminCode")}
                      type="password"
                      id="adminCode"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                      placeholder="Enter admin code (leave empty for regular user)"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Leave this empty to create a regular user account
                  </p>
                </div>
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
