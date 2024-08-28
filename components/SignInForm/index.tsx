"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // console.log("got here");
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(response?.status);
    console.log(response);
    setLoading(false);

    if (!response?.error) {
      router.push("/dashboard");
      router.refresh();
      toast.success("You are Successfully signed in!");
    } else {
      // Handle error (e.g., display a message to the user)
      console.error("Error signing in:", response.error);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
        <Image src="/username.png" alt="username" width={28} height={28} />
        <input
          type="email"
          className="grow text-black"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
      </label>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
        <Image src="/password.png" alt="password" width={28} height={28} />
        <input
          type="password"
          className="grow text-black"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
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

      <button
        type="submit"
        className="w-[129px] h-[60px] mt-6 bg-[#FF9090] text-[#F8F9FB] text-center flex items-center justify-center text-base rounded-md font-medium"
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          "Login"
        )}{" "}
        {/* Show loading text */}
      </button>
    </form>
  );
};

export default SignInForm;
