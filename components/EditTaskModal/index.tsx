"use client";
import { montserrat } from "@/utils/fonts/font";
import { observer } from "mobx-react-lite";
import http from "@/services/httpServices";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
// import

import { ChangeEvent, useState } from "react";
import todoStore from "@/mobx/TodoStore";
import { useSearchParams } from "next/navigation";
import { fetchProjectTodos } from "@/services/TodoServices";

interface TodoData {
  title: string;
  description: string;
  priority: string;
  expiresAt: string;
  status: string;
  completed: boolean;
}

const EditTaskModal = () => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const searchParamss = useSearchParams();
  const pId = searchParamss.get("id") as string;
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["todos", pId],
    queryFn: () => todoStore.fetchProjectTodos(pId as string),
    // enabled: !!pId && !hasRun, // Run only if id exists and the query hasn't run before
    retry: false,
    refetchInterval: 300000,
  });

  const myTodos = data && data.data ? data.data : [];

  // useEffect(() => {
  //   if (data) {
  //     // Store data in MobX
  //     todoStore.setEditTodos(myTodos);
  //     const editInput = todoStore.todos;
  //     // console.log(
  //     //   "hey",
  //     //   editInput.map((editTitle: string) => editTitle)
  //     // );
  //   }
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: todoStore.todo.title ? todoStore.todo.title : "",
      expireAt: "2024-08-30T14:00",
      priority: todoStore.todo.priority ? todoStore.todo.priority : "", // Single value for the radio group
      description: todoStore.todo.description ? todoStore.todo.description : "",
    },
  });

  // console.log(todoStore.todo.expiresAt);

  const onSubmit = (data: any) => {
    console.log(register);
    reset(); // Optionally reset the form after submission
  };

  const handlePriorityChange = (priority: string) => {
    setPriority(priority);
    setExtremeChecked(priority === "extreme");
    setModerateChecked(priority === "moderate");
    setLowChecked(priority === "low");
  };

  // const handleExpireDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const dateValue = e.target.value;
  //   SetExpiresAt(dateValue);
  //   const currentDate = new Date();
  //   console.log(currentDate);
  //   todoStore.setNewDeadline(currentDate.toISOString());
  //   console.log(todoStore.todoExpireDate);
  // };

  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") as string;
  // console.log(`projectId::: ${projectId}`);
  const { todoId } = todoStore;
  // console.log(`todoId::: ${todoId}`);

  // const updateTodo = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await http.patch(
  //       `${baseURL}/todo/update?projectid=${projectId}&todoid=${todoId}`,
  //       todoData
  //     );
  //     console.log("Task updated successfully:", response.data);
  //     toast.success("Task updated successfully");
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(`Error updating todo: ${error}`, error);
  //     toast.error("Failed to update task");
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const date = new Date(todoStore.todo.expiresAt);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    reset({
      title: todoStore.todo.title ? todoStore.todo.title : "",
      expireAt: formattedDate,

      // "2024-08-30T14:00",
      priority: todoStore.todo.priority ? todoStore.todo.priority : "", // Single value for the radio group
      description: todoStore.todo.description ? todoStore.todo.description : "",
    });
  }, [todoStore.todo, reset]);

  return (
    <dialog id="edit_modal" className="modal ">
      <div
        className={` modal-box rounded-none max-h-full h-[90%] flex flex-col justify-between max-w-[70%] p-12 bg-white  `}
      >
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1
              className={`${montserrat.className} text-black tracking-wider text-base font-semibold`}
            >
              Edit Task
            </h1>
            <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
          </div>

          <div
            onClick={() => {
              const modal = document.getElementById(
                "edit_modal"
              ) as HTMLDialogElement | null;
              modal?.close();
            }}
            className="text-black cursor-pointer tracking-wide font-semibold underline text-sm"
          >
            Go back
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-[78%] gap-4 flex flex-col items-start p-4 border border-[#A1A3AB] shadow-sm"
        >
          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered text-black w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="expireAt"
            >
              Expire at
            </label>
            <input
              type="datetime-local"
              {...register("expireAt", {
                required: "Expire at date is required",
              })}
              className="input input-bordered text-black w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
            {errors.expireAt && (
              <p className="text-red-500">{errors.expireAt.message}</p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="priority"
            >
              Priority
            </label>
            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <span className="bg-[#F21E1E] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Extreme</p>
                <input
                  type="radio"
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                  value="Extreme"
                  className="radio rounded-none border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#3ABEFF] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Moderate</p>
                <input
                  type="radio"
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                  value="Moderate"
                  className="radio rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#05A301] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Low</p>
                <input
                  type="radio"
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                  value="Low"
                  className="radio rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>
            </div>
            {errors.priority && (
              <p className="text-red-500">{errors.priority.message}</p>
            )}
          </div>

          <div className="flex h-full gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="description"
            >
              Task Description
            </label>
            <textarea
              {...register("description", {
                required: "Task description is required",
              })}
              className="textarea text-black textarea-bordered bg-white w-[511px] h-full border-[#A1A3AB]"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button type="submit" className="py-2 px-4 bg-[#F24E1E] text-white">
            <p>Update</p>
          </button>
        </form>

        <Toaster />
      </div>
    </dialog>
  );
};

export default observer(EditTaskModal);
