"use client";
import React, { useEffect, useState } from "react";
import { DashboardNav, Logout } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import http from "@/services/httpServices";

// const session = getServerSession();

const DashboardNavSection = () => {
  const [isFocus, setIsFocus] = useState(false);

  const toggleFocus = () => {
    setIsFocus(true);
  };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You need to be authenticated to view this page.</div>;
  }

  // Calculate remaining time
  const remainingTime = session ? session.user.exp * 1000 - Date.now() : 0;

  // Check if the token is expired
  if (remainingTime <= 0) {
    return <div>Your session has expired. Please log in again.</div>;
  }

  // console.log(session?.user?.token);
  if (session?.user?.token) {
    http.setJwt(session.user.token);
  }

  return (
    <div className="lg:w-[250px] w-full text-white flex flex-col gap-9 py-6 left-0 top-0  fixed lg:relative h-full lg:h-[91%]  lg:py-12 bg-[#FF6767] lg:rounded-r-lg">
      <div className="w-full flex flex-col items-center">
        <Image
          src={"/avatar.png"}
          alt=""
          width={86}
          height={56}
          className="flex lg:hidden"
        />
        <p className="text-base font-semibold">
          {session?.user?.name} {session?.user?.lastName}
        </p>
        <p className="text-sm">
          {session?.user?.email}
          {/* oluseyiwmwm@gmail.com */}
        </p>
      </div>

      <div className="w-full flex flex-col items-center">
        <Link
          onMouseUp={toggleFocus}
          href={"/dashboard"}
          className="w-full focus:bg-white focus:text-[#FF6767] text-white  flex items-center gap-5 p-4"
        >
          {isFocus ? (
            <Image
              src={"/dashIcon.png"}
              alt=""
              width={20}
              height={20}
              className=" "
            />
          ) : (
            <Image
              src={"/whitedashboard.png"}
              alt=""
              width={20}
              height={20}
              className=" "
            />
          )}
          <p className="text-base font-bold">Dashboard</p>
        </Link>

        {/* <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="/dashboard/myTask"
            img="/mytask.png"
            name="My Task"
            width={20}
            height={20}
          />
        </div> */}
        <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="/dashboard/projects"
            img="/projects.png"
            name="My Projects"
            width={22}
            height={22}
          />
        </div>

        {/* <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="/dashboard/taskCategories"
            img="/taskCat.png"
            name="Task Categories"
            width={22}
            height={22}
          />
        </div> */}
      </div>

      <div
        className="w-fit h-full cursor-pointer  focus:bg-black  focus:rounded-[14px] font-semibold flex items-center justify-evenly gap-5 p-4"
        onClick={() => {
          setIsFocus(false);
          signOut();
        }}
      >
        <Image
          src={"/logOut.png"}
          alt=""
          width={22}
          height={22}
          className=" "
        />

        {/* <p className="w-[80%] text-sm">Log Out</p> */}
        {/* {!!session && <Logout />} */}
        <Logout />
      </div>
    </div>
  );
};

export default DashboardNavSection;
