"use client";
import { montserrat } from "@/utils/fonts/font";
import { observer } from "mobx-react-lite";
import http from "@/services/httpServices";
import toast, { Toaster } from "react-hot-toast";

import { ChangeEvent, useState } from "react";
import todoStore from "@/mobx/TodoStore";
import { useSearchParams } from "next/navigation";

interface TodoData {
  title: string;
  description: string;
  priority: string;
  expiresAt: string;
  todoId: string;
}

const AddTaskModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [expiresAt, SetExpiresAt] = useState("");
  const [todoId, SetTodoId] = useState("");
  const [extremeChecked, setExtremeChecked] = useState(false);
  const [moderateChecked, setModerateChecked] = useState(false);
  const [lowChecked, setLowChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handlePriorityChange = (priority: string) => {
    setPriority(priority);
    setExtremeChecked(priority === "extreme");
    setModerateChecked(priority === "moderate");
    setLowChecked(priority === "low");
  };

  const handleExpireDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    SetExpiresAt(dateValue);
    console.log(dateValue);
    const currentDate = new Date();
    console.log(currentDate);
    todoStore.setNewDeadline(currentDate.toISOString());
    console.log(todoStore.todoExpireDate);
  };

  const searchParams = useSearchParams();
  // const name = searchParams.get("name") as string;
  const projectId = searchParams.get("id") as string;

  const createTodo = async () => {
    const newId = projectId;
    const todoData: TodoData = {
      title: title,
      description: description,
      priority: priority,
      expiresAt: todoStore.todoExpireDate,
      todoId: newId,
    };

    try {
      setLoading(true);
      const response = await http.post(`${baseURL}/todo/create`, todoData);
      console.log("Task created successfully:", response.data);
      toast.success("Task created successfully");
      setLoading(false);
    } catch (error) {
      console.log(`Error creating todo: ${error}`, error);
      toast.error("Failed to create task");
      setLoading(false);
    }
    // console.log(todoData);
  };

  return (
    <dialog id="my_modal_1" className="modal ">
      <div
        className={` modal-box rounded-none max-h-full h-[90%] flex flex-col justify-between max-w-[70%] p-12 bg-white  `}
      >
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1
              className={`${montserrat.className} text-black tracking-wider text-base font-semibold`}
            >
              Add New Task
            </h1>
            <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
          </div>

          <div
            onClick={() => {
              const modal1 = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement | null;
              modal1?.close();
            }}
            className="text-black cursor-pointer tracking-wide font-semibold underline text-sm"
          >
            Go back
          </div>
        </div>

        <form className="w-full h-[78%] gap-4 flex flex-col items-start p-4 border border-[#A1A3AB] shadow-sm">
          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="input input-bordered text-black w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
          </div>

          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="Date"
            >
              Expire at
            </label>
            <input
              type="datetime-local"
              placeholder=""
              value={expiresAt}
              onChange={handleExpireDateChange}
              className="input input-bordered text-black w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
          </div>

          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="Date"
            >
              Priority
            </label>
            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <span className="bg-[#F21E1E] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Extreme</p>
                <input
                  checked={extremeChecked} // Step 3: Bind state to the checkbox
                  onChange={() => handlePriorityChange("extreme")}
                  type="checkbox"
                  className="checkbox rounded-none border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#3ABEFF] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Moderate</p>
                <input
                  checked={moderateChecked}
                  onChange={() => handlePriorityChange("moderate")}
                  type="checkbox"
                  className="checkbox rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#05A301] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Low</p>
                <input
                  checked={lowChecked}
                  onChange={() => handlePriorityChange("low")}
                  type="checkbox"
                  className="checkbox rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>
            </div>
          </div>

          <div className="flex h-full gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="Date"
            >
              Task Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="textarea text-black textarea-bordered bg-white w-[511px] h-full border-[#A1A3AB] "
              placeholder=""
            ></textarea>
          </div>
        </form>
        <button
          onClick={createTodo}
          className="py-2 px-4 bg-[#F24E1E] text-white"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <p>Done</p>
          )}
        </button>
        <Toaster />
      </div>
    </dialog>
  );
};

export default observer(AddTaskModal);
