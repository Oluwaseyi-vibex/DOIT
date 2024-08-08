"use client";
import React, { useState } from "react";
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

  console.log(session?.user?.token);
  if (session?.user?.token) {
    http.setJwt(session.user.token);
  }
  return (
    <div className="w-[310px] text-white flex flex-col justify-between gap-5 relative h-[91%] px-3 py-12 bg-[#FF6767] rounded-r-lg">
      <div className="w-full flex flex-col items-center">
        <p className="text-base font-semibold">
          {session?.user?.name} {session?.user?.lastName}
        </p>
        <p className="text-sm">{session?.user?.email}</p>
      </div>

      <div className="w-full flex flex-col items-center">
        <Link
          onMouseUp={toggleFocus}
          // onMouseOut={() => {
          //   setIsFocus(false);
          // }}
          href={"/dashboard"}
          className="w-full focus:bg-white focus:text-[#FF6767] text-white rounded-[14px]  flex items-center gap-5 p-4"
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
          <p className="text-sm">Dashboard</p>
        </Link>

        <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="/dashboard/vitalTask"
            img="/vital.png"
            name="Vital Task"
            width={9}
            height={20}
          />
        </div>

        <div
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
        </div>

        <div
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
        </div>

        <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="#"
            img="/settings.png"
            name="Settings"
            width={22}
            height={22}
          />
        </div>

        <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="#"
            img="/help.png"
            name="Help"
            width={22}
            height={22}
          />
        </div>

        <div
          className="w-full"
          onClick={() => {
            setIsFocus(false);
          }}
        >
          <DashboardNav
            navLink="/dashboard/projects"
            img="/help.png"
            name="My Projects"
            width={22}
            height={22}
          />
        </div>
      </div>

      <div
        className="w-fit cursor-pointer  focus:bg-black  focus:rounded-[14px] font-semibold flex items-center justify-evenly gap-5 p-4"
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
        {!!session && <Logout />}
      </div>
    </div>
  );
};

export default DashboardNavSection;
