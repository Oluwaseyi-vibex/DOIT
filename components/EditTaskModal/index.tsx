"use client";
import { montserrat } from "@/utils/fonts/font";
import { observer } from "mobx-react-lite";
import http from "@/services/httpServices";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useState } from "react";
import todoStore from "@/mobx/TodoStore";
import { useSearchParams } from "next/navigation";

const EditTaskModal = () => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      expireAt: "",
      priority: "",
      description: "",
      status: "",
      completed: todoStore.todo?.completed ?? false,
    },
  });

  useEffect(() => {
    const date = new Date(todoStore.todo.expiresAt);
    const formattedDate = `${date.getUTCFullYear()}-${String(
      date.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}T${String(
      date.getUTCHours()
    ).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
    console.log(formattedDate);
    if (todoStore.todo) {
      reset({
        title: todoStore.todo.title || "",
        expireAt: formattedDate,
        priority: todoStore.todo.priority || "",
        description: todoStore.todo.description || "",
        status: todoStore.todo.status || "",
        completed: todoStore.todo.completed,
      });
    }
  }, [todoStore.todo, reset]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    // console.log("dataexpireat", data.expireAt);
    // Get the value from the input
    const date = new Date(data.expireAt);

    const offset = date.getTimezoneOffset();
    const hoursOffset = String(Math.abs(Math.floor(offset / 60))).padStart(
      2,
      "0"
    );
    const minutesOffset = String(Math.abs(offset % 60)).padStart(2, "0");
    const sign = offset <= 0 ? "+" : "-";
    const timezoneOffset = `${sign}${hoursOffset}:${minutesOffset}`;

    // Format the date to the desired format
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}${timezoneOffset}`;

    try {
      setLoading(true);
      const response = await http.patch(
        `${baseURL}/todo/update?projectid=${projectId}&todoid=${todoStore.todo.id}`,
        {
          title: data.title,
          expireAt: formattedDate,
          priority: data.priority,
          description: data.description,
          status: data.status,
          completed: data.completed,
        }
      );
      const modal = document.getElementById(
        "edit_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
      console.log(response);
      toast.success("Task updated successfully");

      setLoading(false);
    } catch (error) {
      console.error(`Error updating todo: ${error}`);
      toast.error("Failed to update task");
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

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
          className="w-full h-fit gap-4 flex flex-col items-start p-4 border border-[#A1A3AB] shadow-sm"
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
              // value="expireAt"
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
                  value="extreme"
                  className="radio rounded-none border-[#A1A3AB] w-[15px] h-[15px]"
                  // checked={todoStore.todo.priority == "extreme"}
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
                  value="moderate"
                  className="radio rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                  // checked={todoStore.todo.priority == "moderate"}
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
                  value="low"
                  className="radio rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                  // checked={todoStore.todo.priority == "low"}
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
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <p>Update</p>
            )}
          </button>
        </form>

        <Toaster />
      </div>
    </dialog>
  );
};

export default observer(EditTaskModal);
