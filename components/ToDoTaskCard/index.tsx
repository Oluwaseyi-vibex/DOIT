"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EditTaskModal from "../EditTaskModal";
import todoStore, { Todo } from "@/mobx/TodoStore";
import { observer } from "mobx-react-lite";

function ToDoTaskCard({
  id,
  name,
  descrip,
  priority,
  status,
  date,
  EditTodo,
}: {
  id: string;
  name: string;
  descrip: string;
  priority: string;
  status: string;
  date: string;
  EditTodo: Todo;
}) {
  return (
    <div className="w-full">
      <div
        key={id}
        className="w-full flex  gap-4 justify-between items-center rounded-2xl p-2 border h-[116px]"
      >
        <span className="w-[25px] h-[25px] outline outline-2 outline-[#F21E1E] rounded-full bg-[#white] flex items-center justify-center"></span>

        <div className="w-[352px] h-full flex flex-col justify-between">
          <h1 className="text-black font-bold text-sm">{name}</h1>

          <p className="text-[#747474] text-[10px]">{descrip}</p>

          <div className="flex justify-center gap-3 text-[10px] items-center">
            <p className="text-black">
              Priority: <span className="text-[#42ADE2]"> {priority}</span>
            </p>
            <p className="text-black">
              Status: <span className="text-[#F21E1E]"> {status}</span>
            </p>

            <p className="text-[10px] text-[#A1A3AB] ">
              Expire at:
              {date}
            </p>
          </div>
        </div>

        <div className="flex items-center w-fit h-full flex-col gap-3 justify-center">
          {/* <div className="flex cursor-pointer w-fit h-fit gap-2">
            <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
            <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
            <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
          </div> */}

          <Image
            className="cursor-pointer"
            onClick={() => {
              todoStore.setEditTodo(EditTodo);
              // console.log(todoStore.todo);
              const modal2 = document.getElementById(
                "edit_modal"
              ) as HTMLDialogElement | null;
              modal2?.showModal();
              // console.log(id);
            }}
            src={"/edit.png"}
            alt=""
            width={40}
            height={40}
          />

          <EditTaskModal />
          <Image
            src={"/delete.png"}
            alt=""
            width={40}
            height={40}
            // onClick={}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(ToDoTaskCard);
