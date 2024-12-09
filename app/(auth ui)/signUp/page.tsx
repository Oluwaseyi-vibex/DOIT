import { SignupForm } from "@/components";
import Image from "next/image";

export default function Signup() {
  // const session = await getServerSession;
  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
    <div className="w-full h-fit bg-white flex lg:flex-row flex-col p-4  rounded-xl">
      <div className="w-full lg:flex md:flex hidden items-end h-full">
        <Image src={"/signupImage.png"} alt="" width={333} height={352} />
      </div>
      <SignupForm />
    </div>
  );
}
