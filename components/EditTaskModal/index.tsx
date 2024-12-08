"use client";
import { montserrat } from "@/utils/fonts/font";
import { observer } from "mobx-react-lite";
import http from "@/services/httpServices";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import todoStore from "@/mobx/TodoStore";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@mantine/core";

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
      completed: todoStore.todo?.completed ?? false, // Default to the current value of completed
    },
  });

  useEffect(() => {
    const date = new Date(todoStore.todo.expiresAt);
    const formattedDate = `${date.getUTCFullYear()}-${String(
      date.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}T${String(
      date.getUTCHours()
    ).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;

    if (todoStore.todo) {
      reset({
        title: todoStore.todo.title || "",
        expireAt: formattedDate,
        priority: todoStore.todo.priority || "",
        description: todoStore.todo.description || "",
        status: todoStore.todo.status || "pending", // Default to "pending" if status is missing
        completed: todoStore.todo.completed, // Make sure the checkbox is properly controlled
      });
    }
  }, [todoStore.todo, reset]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const date = new Date(data.expireAt);
    const offset = date.getTimezoneOffset();
    const hoursOffset = String(Math.abs(Math.floor(offset / 60))).padStart(
      2,
      "0"
    );
    const minutesOffset = String(Math.abs(offset % 60)).padStart(2, "0");
    const sign = offset <= 0 ? "+" : "-";
    const timezoneOffset = `${sign}${hoursOffset}:${minutesOffset}`;

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
          completed: data.completed, // Include completed value
        }
      );

      const modal = document.getElementById(
        "edit_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
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
    <dialog id="edit_modal" className="modal">
      <div
        className={`modal-box rounded-none max-h-full h-[95%] lg:h-[90%] flex flex-col justify-between lg:max-w-[70%] lg:p-12 bg-white`}
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
            <label className="text-sm font-semibold text-black tracking-wider">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered text-black w-full lg:w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <label className="text-sm font-semibold text-black tracking-wider">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered text-black w-full lg:w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <label className="text-sm font-semibold text-black tracking-wider">
              Expire at
            </label>
            <input
              type="datetime-local"
              {...register("expireAt", {
                required: "Expire at date is required",
              })}
              className="input input-bordered text-black w-full lg:w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
            {errors.expireAt && (
              <p className="text-red-500">{errors.expireAt.message}</p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <label className="text-sm font-semibold text-black tracking-wider">
              Priority
            </label>
            <div className="flex lg:flex-row flex-col gap-2 lg:gap-10">
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
                />
              </div>
            </div>
            {errors.priority && (
              <p className="text-red-500">{errors.priority.message}</p>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <label className="text-sm font-semibold text-black tracking-wider">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="select text-black select-bordered bg-white w-full lg:w-[511px] max-w-full border-[#A1A3AB] h-[37px] p-2"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Checkbox for Completed */}
          <div className="flex gap-2 items-center">
            <label className="text-sm font-semibold text-black tracking-wider">
              Mark as Completed
            </label>
            <input
              type="checkbox"
              {...register("completed")}
              className="checkbox checkbox-primary"
            />
          </div>

          <div className="flex gap-5 items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F24E1E] py-3 px-5 text-white rounded-md"
            >
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default observer(EditTaskModal);
