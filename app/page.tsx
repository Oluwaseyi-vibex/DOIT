"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { darumadrop_One } from "@/utils/fonts/font";

export default function Home() {
  return (
    <main
      className="bg-[#FF6767] w-full h-screen overflow-hidden bg-center text-white "
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className={`w-full flex flex-col h-screen  p-16 items-center justify-between absolute `}
      >
        <div className="flex gap-4 flex-col items-center">
          <Image src={"/logo.png"} width={150} height={150} alt="Logo" />
          <h1 className={`${darumadrop_One.className} text-6xl text-white`}>
            DO IT
          </h1>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <Link href={"/signUp"}>
            <button className="py-4 px-6 bg-[#FF9090] font-bold text-lg rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* <div
        className="w-full flex flex-col h-fit items-center px-[350px] justify-start absolute"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="w-full h-fit py-16 flex flex-col items-center justify-between">
          <Image
            src={"/listIllust.png"}
            alt="Illustration"
            width={450}
            height={450}
          />
          <p className={`${poppins.className} text-4xl text-center`}>
            Plan your tasks to do, that way you’ll stay organized and you won’t
            skip any.
          </p>
          <div className="flex items-center w-fit gap-16">
            <Image src={"/slider.png"} width={100} height={100} alt="Slider" />
            <Link href={"/signUp"}>
              <span className="w-[60px] cursor-pointer hover:shadow-lg hover:shadow-slate-300 h-[60px] flex items-center justify-center rounded-full bg-white">
                <Image src={"/arrow.png"} width={25} height={25} alt="Arrow" />
              </span>
            </Link>
          </div>
        </div>
      </div> */}
    </main>
  );
}
