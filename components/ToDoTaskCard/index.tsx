"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EditTaskModal from "../EditTaskModal";
import todoStore, { Todo } from "@/mobx/TodoStore";
import { observer } from "mobx-react-lite";
import http from "@/services/httpServices";
import toast from "react-hot-toast";
import { RefetchOptions } from "@tanstack/react-query";
import TodoDeleteModal from "../todoDeleteModal";

function ToDoTaskCard({
  id,
  name,
  descrip,
  priority,
  status,
  date,
  EditTodo,
  todoId,
}: {
  id: string;
  name: string;
  descrip: string;
  priority: string;
  status: string;
  date: string;
  EditTodo: Todo;
  todoId: string;
}) {
  // useEffect(() => {
  const newdate = new Date(`${date}`);

  const year = newdate.getUTCFullYear();
  const month = String(newdate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(newdate.getUTCDate()).padStart(2, "0");
  const hours = String(newdate.getUTCHours()).padStart(2, "0");
  const minutes = String(newdate.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  console.log(todoId);
  // });

  useEffect(() => {
    todoStore.setTodoId(id);
    console.log(todoStore.todoId);
    console.log(id);
  });

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <div
      key={id}
      className="w-full flex  gap-8 justify-center items-center rounded-2xl p-2 border h-[116px]"
    >
      <span className="w-[15px] h-[15px] outline outline-2 outline-[#F21E1E] rounded-full bg-[#white] flex items-center justify-center"></span>

      <div className="w-[332px] h-full flex flex-col gap-2 justify-between">
        <h1 className="text-black font-bold uppercase text-sm">{name}</h1>

        <p className="text-[#747474] max-w-full text-[10px]">{descrip}</p>

        <div className="flex justify-between text-[10px] items-center">
          <p className="text-black">
            Priority: <span className="text-[#42ADE2]"> {priority}</span>
          </p>
          <p className="text-black">
            Status: <span className="text-[#F21E1E]"> {status}</span>
          </p>

          <p className="text-[10px] text-[#A1A3AB] ">
            Expire at: <br />
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center w-fit h-full flex-col gap-3 justify-center">
        <Image
          className="cursor-pointer"
          onClick={() => {
            todoStore.setEditTodo(EditTodo);
            console.log(todoStore.todo);
            const modal2 = document.getElementById(
              "edit_modal"
            ) as HTMLDialogElement | null;
            modal2?.showModal();
            // console.log(id);
          }}
          src={"/edit.png"}
          alt=""
          width={25}
          height={25}
        />

        <EditTaskModal />
        <Image
          src={"/delete.png"}
          alt=""
          width={40}
          className="cursor-pointer"
          height={40}
          onClick={() => {
            const modal2 = document.getElementById(
              "todo_delete_modal"
            ) as HTMLDialogElement | null;
            modal2?.showModal();
          }}
        />
        <TodoDeleteModal todoId={todoId} />
      </div>
    </div>
  );
}

export default observer(ToDoTaskCard);
