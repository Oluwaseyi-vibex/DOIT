"use client";

import React from "react";
import Link from "next/link";
import { montserrat } from "@/utils/fonts/font";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await axios.post(
        "https://nodeit-backend.onrender.com/api/v1/auth/register",
        {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          password: data.password,
        }
      );

      if (response.status === 201) {
        router.push("/signIn");
      } else {
        console.error("Signup failed:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const password = watch("password");

  return (
    <div
      className={`${montserrat.className} w-full h-full py-3 text-[#212427]`}
    >
      <h1 className={`${montserrat.className} text-4xl font-bold`}>Sign Up</h1>
      <form
        className="py-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="input lg:w-[559px] w-full bg-white input-bordered flex items-center gap-8 border-black">
            <Image src="/firstName.png" alt="" width={28} height={28} />
            <input
              type="text"
              className="grow"
              placeholder="Enter First Name"
              {...register("firstName", { required: "First name is required" })}
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <div className="input lg:w-[559px] w-full bg-white input-bordered flex items-center gap-8 border-black">
            <Image src="/lastname.png" alt="" width={28} height={28} />
            <input
              className="grow"
              placeholder="Enter Last Name"
              type="text"
              {...register("lastName", { required: "Last name is required" })}
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <div className="input lg:w-[559px] w-full bg-white input-bordered flex items-center gap-8 border-black">
            <Image src="/email.png" alt="" width={28} height={28} />
            <input
              className="grow"
              placeholder="Enter Email address"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="input lg:w-[559px] w-full bg-white input-bordered flex items-center gap-8 border-black">
            <Image src="/password.png" alt="" width={28} height={28} />
            <input
              className="grow"
              placeholder="Enter Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <div className="input lg:w-[559px] w-full bg-white input-bordered flex items-center gap-8 border-black">
            <Image src="/confirmpassword.png" alt="" width={28} height={28} />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          className="w-[129px] h-[60px] bg-[#FF9090] text-[#F8F9FB] rounded-md"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="text-base">
        Already have an account?{" "}
        <Link href={"/signIn"}>
          <span className="text-[#008BD9]">Sign In</span>
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
