"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ToDoTaskCard,
  CompletedTaskCard,
  PendingTaskCard,
  AddTaskModal,
} from "@/components";
import { CustomScroll } from "react-custom-scroll";

export default function DashboardManager() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <main className="w-full h-full flex flex-col justify-end  ">
      <div className="w-full h-[93%] flex flex-col items-center gap-6  px-6 ">
        <div className="flex justify-between w-full">
          <div className="w-full h-fit flex items-center gap-3">
            <h1 className="font-semibold text-4xl text-black">
              Welcome back, Sundar
            </h1>
            <Image src={"/handwave.png"} alt="" width={42.42} height={41} />
          </div>

          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <Image src={"/users.png"} alt="" width={60} height={60} />
              <Image src={"/users.png"} alt="" width={60} height={60} />
              <Image src={"/users.png"} alt="" width={60} height={60} />
              <Image src={"/users.png"} alt="" width={60} height={60} />
            </div>

            <div className="text-[#FF6767] cursor-pointer text-sm flex items-center px-4 py-2 gap-2 border border-[#FF6767] rounded-lg ">
              <Image src={"/invite.png"} alt="" width={55} height={55} />
              <p>Invite</p>
            </div>
          </div>
        </div>

        <div
          className="w-full border overflow-x-auto
         shadow-[#A1A3AB] gap-8 flex items-start justify-between h-[85%] shadow-sm p-4 "
        >
          <div className="w-[40%] h-fit  p-4 shadow-lg border-none">
            <div className="flex  justify-between">
              <div className="flex w-fit items-start justify-center">
                <Image src={"/Pending.png"} alt="" width={30} height={39} />
                <p className="text-[#FF6767] font-semibold text-lg">To-Do</p>
              </div>

              <div
                onClick={() => {
                  const modal1 = document.getElementById(
                    "my_modal_1"
                  ) as HTMLDialogElement | null;
                  modal1?.showModal();
                }}
                className="flex cursor-pointer items-center justify-center w-fit gap-2"
              >
                <Image src={"/add.png"} alt="" width={14} height={14} />
                <p className="text-[#A1A3AB] text-[15px]">Add task</p>
              </div>
            </div>
            <AddTaskModal />

            <div className="my-2 text-black text-sm">
              {formatDate(currentDate)}
            </div>
            <div className="w-full overflow-hidden h-fit ">
              <CustomScroll heightRelativeToParent="100%">
                <div className="flex w-full h-[385px] p-3 flex-col gap-4">
                  <ToDoTaskCard />
                </div>
              </CustomScroll>
            </div>
          </div>

          <div className="w-[40%] p-4 gap-10 flex flex-col shadow-lg border-none">
            <div className="flex w-fit items-center gap-6 justify-center">
              <Image src={"/Book.png"} alt="" width={18} height={18} />
              <p className="text-[#0225FF] font-semibold text-lg">
                Pending Task
              </p>
            </div>
            <CustomScroll heightRelativeToParent="100%">
              <div className="flex flex-col h-[385px] p-3 gap-4">
                <PendingTaskCard />
                <PendingTaskCard />
                <PendingTaskCard />
                <PendingTaskCard />
                <PendingTaskCard />
              </div>
            </CustomScroll>
          </div>

          <div className="w-[40%] p-4 flex flex-col gap-10 shadow-lg border-none">
            <div className="flex w-fit items-center gap-3 justify-center">
              <Image src={"/Book.png"} alt="" width={18} height={18} />
              <p className="text-[#FF6767] font-semibold text-lg">
                Completed Task
              </p>
            </div>

            <CustomScroll heightRelativeToParent="100%">
              <div className="flex flex-col h-[385px] p-6 gap-4">
                <CompletedTaskCard />
                <CompletedTaskCard />
                <CompletedTaskCard />
                <CompletedTaskCard />
              </div>
            </CustomScroll>
          </div>
        </div>
      </div>
    </main>
  );
}
