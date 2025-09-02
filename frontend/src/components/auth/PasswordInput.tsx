"use client";
import { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormClearErrors,
} from "react-hook-form";

interface PasswordInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  clearErrors: UseFormClearErrors<any>;
}

export const PasswordInput = ({
  register,
  errors,
  watch,
  clearErrors,
}: PasswordInputProps) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "Very Weak", color: "text-red-600" };
      case 2:
        return { text: "Weak", color: "text-orange-600" };
      case 3:
        return { text: "Fair", color: "text-yellow-600" };
      case 4:
        return { text: "Good", color: "text-blue-600" };
      case 5:
        return { text: "Strong", color: "text-green-600" };
      default:
        return { text: "", color: "" };
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <>
      {/* Main Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Create a strong password
        </h1>
      </div>

      {/* Password Requirements */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Password Requirements
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-700">8+ characters</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-700">Upper & lowercase</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-700">At least 1 number</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-700">Special characters</span>
          </div>
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800 mb-3"
          >
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              placeholder="Create a strong password"
              onChange={(e) => {
                register("password").onChange(e);
                const value = e.target.value;
                setPasswordStrength(calculatePasswordStrength(value));

                // Хоосон болоход error арилгах
                if (value === "" && errors.password) {
                  clearErrors("password");
                }
              }}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {watch("password") && (
            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Password Strength
                </span>
                <span
                  className={`text-sm font-semibold ${
                    getPasswordStrengthText(passwordStrength).color
                  }`}
                >
                  {getPasswordStrengthText(passwordStrength).text}
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-full rounded-full transition-all duration-300 ${
                      level <= passwordStrength
                        ? getPasswordStrengthColor(passwordStrength)
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {errors.password && (
            <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded-lg mt-1">
              <svg
                className="w-4 h-4 text-red-500 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-600">
                {String(errors.password.message)}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-800 mb-3"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              placeholder="Confirm your password"
              onChange={(e) => {
                register("confirmPassword").onChange(e);
                const value = e.target.value;

                // Хоосон болоход error арилгах
                if (value === "" && errors.confirmPassword) {
                  clearErrors("confirmPassword");
                }
              }}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg mt-3">
              <svg
                className="w-4 h-4 text-red-500 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-600">
                {String(errors.confirmPassword.message)}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
