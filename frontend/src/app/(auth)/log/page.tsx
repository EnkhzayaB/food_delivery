"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

const logInSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email address")
    .required("please must enter your email"),
  password: yup
    .string()
    .min(6, "please enter 6 characters long password")
    .required("please must enter your password"),
});

type LogInFormData = yup.InferType<typeof logInSchema>;

const LoginPage = () => {
  const { login } = useAuth();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: yupResolver(logInSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LogInFormData) => {
    console.log("Data", data);
    try {
      const res = await fetch("http://localhost:8000/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("login", result);

      if (result.success) {
        login(result.token, result.data.email);
        router.push("/");
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-start p-8 gap-6 bg-white"
      >
        <h1 className="text-2xl font-semibold">Log in </h1>
        <p className="text-gray-600 text-lg font-normal">
          Log in to enjoy your favorite dishes.
        </p>

        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email address"
          className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className="w-full border p-3 rounded-md outline-none focus:ring-2 hover:ring-red-300"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#18181B] text-white p-3 rounded-md font-medium hover:bg-gray-300 hover:text-black"
        >
          Let's Go
        </button>

        <Link href={"/register"}>
          <p className="text-sm text-gray-600 ">
            Don’t have an account?
            <span className="text-blue-600 cursor-pointer">
              {" "}
              &nbsp; Sign-up{" "}
            </span>
          </p>
        </Link>
      </form>

      <div className="hidden md:block">
        <img
          src="/food-delivery3.jpg"
          alt="Delivery rider"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
