"use client";
import React, { useState, useRef } from "react";
import { montserrat } from "@/utils/fonts/font";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};
const SignInCmpnt = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className={props.className}>
      <main className="w-full h-full bg-white flex items-center justify-between px-10  rounded-xl">
        <div className="text-[#212427] flex flex-col gap-8">
          <h1 className="text-4xl font-bold">Sign In</h1>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/username.png" alt="" width={28} height={28} />
              <input
                type="email"
                className="grow"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  //   onChange: emailOnChangeHandler,
                })}
              />
            </label>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/password.png" alt="" width={28} height={28} />
              <input
                type="password"
                className="grow"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  //   onChange: passOnChangeHandler,
                })}
              />
            </label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div className="flex gap-6 items-center">
              <input
                type="checkbox"
                className="checkbox"
                {...register("rememberMe")}
              />
              <p className="text-base">Remember Me</p>
            </div>

            <Link href={"/dashboard"}>
              <button
                type="submit"
                className="w-[129px] h-[60px] mt-6 bg-[#FF9090] text-[#F8F9FB] text-base rounded-md font-medium"
              >
                Login
              </button>
            </Link>
          </form>
          <p className="text-base text-[#212427]">
            Don’t have an account?
            <Link href={"/signUp"}>
              <span className="text-[#008BD9]"> Create One</span>
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-end h-full justify-end w-full">
          <Image src={"/signin.png"} alt="" width={500} height={400} />
        </div>
      </main>
    </div>
  );
};

export default SignInCmpnt;
