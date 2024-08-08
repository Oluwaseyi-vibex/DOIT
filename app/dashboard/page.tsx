"use client";
import React from "react";
import Image from "next/image";
import CompletedTasksDoughnut from "@/components/CompletedTasksDoughnut";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const completedTasks = 75;
  const totalTasks = 100;

  const { data: session, status } = useSession();
  return (
    <main className="w-full h-full flex flex-col overflow-hidden justify-end  ">
      <div className="w-full h-[93%] flex flex-col items-center gap-6  p-6 ">
        <div className="flex justify-between w-full">
          <div className="w-full h-fit flex items-center gap-3">
            {session && (
              <h1 className="font-semibold text-4xl text-black">
                Welcome back, {session.user?.name}
              </h1>
            )}
            <Image src={"/handwave.png"} alt="" width={42.42} height={41} />
          </div>
        </div>

        <div className="w-full h-[550px] overflow-hidden">
          <div className="w-[15%]">
            <CompletedTasksDoughnut
              completedTasks={completedTasks}
              totalTasks={totalTasks}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
