"use client";
import React, { useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import TodoCardSlice from "@/mobx/features/todoCardSlice";
import todoStore from "@/mobx/TodoStore";

function ToDoTaskCard() {
  const [notStarted, setNotStarted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [completed, setCompleted] = useState(true);

  const notStartedFunction = () => {
    setNotStarted(!notStarted);
  };

  const inProgressFunction = () => {
    setInProgress(!inProgress);
  };

  const completedFunction = () => {
    setCompleted(!completed);
  };

  return (
    <div className="w-full">
      {todoStore.tasks.map((task) => (
        <div
          key={task.id}
          className="w-full flex  gap-8 justify-center items-center rounded-2xl p-2 border h-[116px]"
        >
          <span className="w-[15px] h-[15px] outline outline-2 outline-[#F21E1E] rounded-full bg-[#white] flex items-center justify-center"></span>

          <div className="w-[332px] h-full flex flex-col gap-2 justify-between">
            <h1 className="text-black font-bold text-sm">{task.name}</h1>

            <p className="text-[#747474] text-[10px]">{task.descrip}</p>

            <div className="flex justify-between text-[10px] items-center">
              <p className="text-black">
                Priority:{" "}
                <span className="text-[#42ADE2]"> {task.priority}</span>
              </p>
              <p className="text-black">
                Status: <span className="text-[#F21E1E]"> {task.status}</span>
              </p>

              <p className="text-[10px] text-[#A1A3AB] ">
                Created on:
                {task.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-col justify-evenly">
            <div className="flex cursor-pointer w-fit h-fit gap-2">
              <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
              <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
              <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
            </div>

            <Image src={"/edit.png"} alt="" width={25} height={25} />
            <Image
              src={"/delete.png"}
              alt=""
              width={30}
              height={30}
              onClick={() => todoStore.updateMessage()}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default observer(ToDoTaskCard);
