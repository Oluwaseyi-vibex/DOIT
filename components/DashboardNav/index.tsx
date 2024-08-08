import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";
export default function DashboardNav({
  img,
  name,
  width,
  height,
  navLink,
}: {
  img: string;
  name: string;
  width: number;
  height: number;
  navLink: string;
}) {
  return (
    <Link
      href={navLink}
      className="w-full  focus:bg-black  focus:rounded-[14px] font-semibold flex items-center justify-evenly gap-5 p-4"
    >
      <Image src={img} alt="" width={width} height={height} className=" " />

      <p className="w-[80%] text-sm">{name}</p>
    </Link>
  );
}
