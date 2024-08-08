import { SignupForm } from "@/components";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Signup() {
  // const session = await getServerSession;
  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
    <main className="w-full h-full bg-white flex items-center justify-center  rounded-xl">
      <div className="w-full flex items-end h-full">
        <Image src={"/signupImage.png"} alt="" width={333} height={352} />
      </div>
      <SignupForm />
    </main>
  );
}
