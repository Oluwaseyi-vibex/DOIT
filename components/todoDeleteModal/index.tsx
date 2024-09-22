"use client";
import projectStore from "@/mobx/ProjectStore";
import http from "@/services/httpServices";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TodoDeleteModal = ({ todoId }: { todoId: string }) => {
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <dialog id="todo_delete_modal" className="modal">
      <div className="modal-box items-center flex flex-col gap-5">
        <h1 className="text-xl text-white text-center">
          Are you sure you want to delete this Task?
        </h1>
        <div className="flex gap-7 text-white  text-xl">
          <button
            onClick={async () => {
              setLoading(true);
              try {
                const response = await http.delete(
                  `${baseURL}/todo/delete/${todoId}`
                );
                toast.success("Task deleted");
                setLoading(false);
                const modal2 = document.getElementById(
                  "todo_delete_modal"
                ) as HTMLDialogElement | null;
                modal2?.close();

                console.log(response);
              } catch (error) {
                console.log("delete error :::", error);
                toast.error("failed to delete");
              }
            }}
            className="btn"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <p>Yes</p>
            )}
          </button>
          <button
            onClick={() => {
              const modal2 = document.getElementById(
                "todo_delete_modal"
              ) as HTMLDialogElement | null;
              modal2?.close();
            }}
            className="btn"
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default TodoDeleteModal;
