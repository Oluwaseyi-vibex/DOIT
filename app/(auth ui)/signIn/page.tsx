import { SignInForm } from "@/components";

import Image from "next/image";
import Link from "next/link";

export default async function Login() {
  return (
    // <div className={props.className}>
    <div className="w-full h-full bg-white flex items-center lg:justify-between px-4 lg:px-10  rounded-xl">
      <div className="text-[#212427] flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Sign In</h1>
        {/* form */}
        <SignInForm />
        <p className="text-base text-[#212427]">
          Don’t have an account?
          <Link href={"/signUp"}>
            <span className="text-[#008BD9]"> Create One</span>
          </Link>
        </p>
      </div>
      <div className="lg:flex hidden flex-col items-end h-full justify-end w-full">
        <Image src={"/signin.png"} alt="" width={500} height={400} />
      </div>
    </div>
    // </div>
  );
}
