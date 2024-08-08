"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { darumadrop_One, poppins } from "@/utils/fonts/font";
export default function Home() {
  const [nextPage, setNextPage] = useState(true);

  const togglePage = () => {
    setNextPage(!nextPage);
  };
  return (
    <main
      className="bg-[#FF6767] w-full h-screen bg-center text-white  py-8 "
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {nextPage ? (
        <div className="w-full flex flex-col h-full pt-16 items-center justify-between">
          <div className="flex gap-4 flex-col items-center">
            <Image src={"/logo.png"} width={200} height={200} alt="" />
            <h1 className={`${darumadrop_One.className} text-6xl text-white`}>
              DO IT
            </h1>
          </div>
          <div className="flex flex-col gap-7 items-center">
            <button
              onClick={togglePage}
              className="py-4 px-6 bg-[#FF9090] font-bold text-lg rounded-lg"
            >
              Get Started
            </button>
            <p className={`${poppins.className} text-2xl `}>v 1.0.0</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col h-full items-center px-[350px] justify-start">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <Image src={"/listIllust.png"} alt="" width={550} height={550} />
            <p className={`${poppins.className} text-4xl text-center `}>
              Plan your tasks to do, that way you’ll stay organized and you
              won’t skip any
            </p>
            <div className="flex items-center w-fit gap-16">
              <Image src={"/slider.png"} width={100} height={100} alt="" />
              <Link href={"/signUp"}>
                <span className="w-[80px] cursor-pointer hover:shadow-lg hover:shadow-slate-300 h-[80px] flex items-center justify-center rounded-full bg-white ">
                  <Image src={"/arrow.png"} width={35} height={35} alt="" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
