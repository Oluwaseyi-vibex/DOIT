"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { montserrat } from "@/utils/fonts/font";
import Image from "next/image";
// import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const [Gap, setGap] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<IFormInput>();

  // const onSubmit = async (e: FormEvent) => {};

  const changeGap = () => {
    setGap(!Gap);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://nodeit-backend.onrender.com/api/v1/auth/register",
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        }
      );

      if (response.status === 201) {
        // Redirect to login page after successful signup
        router.push("/signIn");
      } else {
        console.error("Signup failed:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <div
        className={`${montserrat.className} mr- w-full h-full ${
          Gap ? "py-2" : "py-7"
        }  text-[#212427]`}
      >
        <h1 className={`${montserrat.className} text-4xl font-bold`}>
          Sign Up
        </h1>
        <form
          className={`py-5 flex flex-col ${Gap ? "gap-1" : "gap-5"} `}
          onSubmit={handleSubmit}
        >
          <div>
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/firstName.png" alt="" width={28} height={28} />
              <input
                type="text"
                className="grow"
                placeholder="Enter First Name"
                // {...register("firstName", {
                //   required: "First name is required",
                // })}
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            {/* {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )} */}
          </div>

          <div>
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/lastname.png" alt="" width={28} height={28} />
              <input
                className="grow"
                placeholder="Enter Last Name"
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                // {...register("lastName", { required: "Last name is required" })}
              />
            </label>
            {/* {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )} */}
          </div>

          {/* <div>
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/username.png" alt="" width={28} height={28} />
              <input
                type="text"
                className="grow"
                placeholder="Enter Username"
                {...register("username", { required: "Username is required" })}
              />
            </label>
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div> */}

          <div>
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/email.png" alt="" width={28} height={28} />
              <input
                className="grow"
                placeholder="Enter Email address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // {...register("email", {
                //   required: "Email is required",
                //   pattern: {
                //     value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                //     message: "Invalid email address",
                //   },
                // })}
              />
            </label>
            {/* {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )} */}
          </div>

          <div>
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/password.png" alt="" width={28} height={28} />
              <input
                className="grow"
                placeholder="Enter Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // {...register("password", {
                //   required: "Password is required",
                //   minLength: {
                //     value: 6,
                //     message: "Password must be at least 6 characters long",
                //   },
                // })}
              />
            </label>
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )} */}
          </div>

          <div>
            <label className="input w-[559px] bg-white input-bordered flex items-center gap-8 border-black">
              <Image src="/confirmpassword.png" alt="" width={28} height={28} />
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                // {...register("confirmPassword", {
                //   required: "Please confirm your password",
                //   validate: (value) =>
                //     value === watch("password") || "Passwords do not match",
                // })}
              />
            </label>
            {/* {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )} */}
          </div>

          <button
            className="w-[129px] h-[60px] bg-[#FF9090] text-[#F8F9FB] rounded-md"
            type="submit"
            onClick={changeGap}
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
    </>
  );
};

export default SignupForm;
