import React from "react";
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
      className="w-full  focus:bg-black  font-semibold flex items-center justify-evenly gap-5 p-4"
    >
      <Image src={img} alt="" width={width} height={height} className=" " />

      <p className="w-[80%] text-base">{name}</p>
    </Link>
  );
}
