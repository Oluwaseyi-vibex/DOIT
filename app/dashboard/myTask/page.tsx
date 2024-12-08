"use client";
import Image from "next/image";
import { montserrat } from "@/utils/fonts/font";
import { ToDoTaskCard, PendingTaskCard } from "@/components";

import { useState, useEffect } from "react";

import { CustomScroll } from "react-custom-scroll";

export default function MyTask() {
  // const { data, isFetching, isLoading, isError, error, refetch } = useQuery({
  //   queryKey: ["todos", pId],
  //   queryFn: () => fetchProjectTodos(pId as string),
  //   // enabled: !!pId && !hasRun, // Run only if id exists and the query hasn't run before
  //   // retry: false,
  //   refetchInterval: 5000,
  // });

  // const myTodos = data && data.data ? data.data : [];

  return (
    <main className="w-full h-full flex flex-col justify-end  ">
      <div className="w-full h-[93%] flex justify-between items-center gap-6  p-6 ">
        <div className="w-[50%] rounded-2xl  p-6 h-full border border-[#A1A3AB] shadow-[#A1A3AB] shadow-sm">
          <div className="flex flex-col">
            <h1
              className={`${montserrat.className} text-black text-xl font-semibold`}
            >
              My Tasks
            </h1>
            <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
          </div>

          {/* <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="statusFilter" className="font-medium">
                Filter by status:
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <CustomScroll heightRelativeToParent="100%">
              <div className="flex flex-col h-[385px] p-3 gap-4">
                <div className="flex flex-col w-[380px] h-[385px] p-3 gap-4">
                  {Array.isArray(myTodos) && myTodos.length > 0 ? (
                    myTodos
                      .filter((todo: any) =>
                        statusFilter
                          ? todo.status.toLowerCase() ===
                            statusFilter.toLowerCase()
                          : true
                      )
                      .map((todo: any) => (
                        <ToDoTaskCard
                          key={todo.id}
                          id={todo.id}
                          name={todo.title}
                          descrip={todo.description}
                          priority={todo.priority}
                          status={todo.status}
                          date={todo.expiresAt}
                          completed={todo.completed}
                          EditTodo={todo}
                          todoId={todo.id}
                        />
                      ))
                  ) : (
                    <p className="text-lg text-error font-medium">
                      No tasks available!
                    </p>
                  )}
                </div>
              </div>
            </CustomScroll>
          </div> */}
        </div>
        <div className="w-[50%] px-6 py-12 border border-[#A1A3AB] shadow-[#A1A3AB] shadow-sm rounded-2xl h-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-xl font-semibold tracking-wide">
              Walk the dog
            </h1>
            <p className="text-black font-medium text-[12px]">
              Priority: <span className="text-[#F21E1E]"> Extreme</span>
            </p>
            <p className="text-black font-medium text-[12px]">
              Status: <span className="text-[#F21E1E]"> Not Started</span>
            </p>
            <p className="text-[10px] text-[#A1A3AB] ">
              Created on: 20/06/2023
            </p>
          </div>

          <div className="text-base my-6 text-[#747474] w-full">
            Take Luffy and Jiro for a leisurely stroll around the neighborhood.
            Enjoy the fresh air and give them the exercise and mental
            stimulation they need for a happy and healthy day. Don&apos;t forget
            to bring along squeaky and fluffy for some extra fun along the way!
          </div>

          <ul className=" list-decimal text-[#747474] px-4 ">
            <li>Listen to a podcast or audiobook</li>
            <li>Practice mindfulness or meditation</li>
            <li>Take photos of interesting sights along the way</li>
            <li>Practice obedience training with your dog</li>
            <li>Chat with neighbors or other dog walkers</li>
            <li>Listen to music or an upbeat playlist</li>
          </ul>

          <div className="flex w-full h-fit justify-end items-end mt-8 gap-3">
            <div className="w-[36px] h-[36px] rounded-lg bg-[#FF6767] flex items-center justify-center">
              <Image src={"/delete2.png"} width={15} height={15} alt="" />
            </div>
            <div className="w-[36px] h-[36px] rounded-lg bg-[#FF6767] flex items-center justify-center">
              <Image src={"/edit2.png"} width={15} height={15} alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
