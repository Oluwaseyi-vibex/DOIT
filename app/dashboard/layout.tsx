import React from "react";
import { inter } from "@/utils/fonts/font";
import Image from "next/image";

import DashboardNavSection from "@/components/dashboardNavSection";
import RealTimeDate from "@/components/RealTimeDate";
import { SessionProviderWrapper } from "@/components";

// import { options } from "../api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(options);
  // if (!session) {
  //   redirect("api/auth/signin?callbackUrl=/server");
  // }
  return (
    <section
      className={`${inter.className} w-full h-screen flex flex-col items-center justify-center`}
      style={{
        backgroundImage: `url('/dashboardBg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full flex flex-col h-full  ">
        <nav className="w-full relative z-10 h-[80px] flex items-center shadow-lg justify-between px-[72px] py-[37px] bg-[#F8F8F8]">
          <h1 className={`${inter.className} text-[36px] font-semibold`}>
            <span className="text-[#FF6767]">Dash</span>
            <span className="text-black">board</span>
          </h1>

          <label className="input bg-white p-0 pl-3 h-fit input-bordered w-[495px] flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search your task here..."
            />
            <div className="w-[36px] cursor-pointer h-[36px] rounded-lg bg-[#FF6767] flex items-center justify-center">
              <Image src={"/Search.png"} width={15} height={15} alt="" />
            </div>
          </label>

          <div className="flex gap-8 items-center">
            <div className="flex w-fit gap-3">
              <div className="w-[34px] cursor-pointer h-[34px] rounded-lg bg-[#FF6767] flex items-center justify-center">
                <Image
                  src={"/notification.png"}
                  width={15}
                  height={15}
                  alt=""
                />
              </div>

              <div className="w-[36px] h-[36px] rounded-lg bg-[#FF6767] flex items-center justify-center">
                <Image src={"/Search.png"} width={15} height={15} alt="" />
              </div>
            </div>

            <div>
              <RealTimeDate />
            </div>
          </div>
        </nav>

        <div className="bg-white relative gap-8 z-0 h-full w-full flex items-end justify-between">
          <div className="h-full flex flex-col justify-end items-center">
            <Image
              src={"/avatar.png"}
              alt=""
              width={86}
              height={56}
              className="absolute z-10 top-2 "
            />
            <DashboardNavSection />
          </div>

          <div className="w-full overflow-hidden h-full">
            <SessionProviderWrapper>{children} </SessionProviderWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
