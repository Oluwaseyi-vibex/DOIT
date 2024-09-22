"use client";
import projectStore from "@/mobx/ProjectStore";
import http from "@/services/httpServices";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProjectDeleteModal = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <dialog id="project_delete_modal" className="modal">
      <div className="modal-box items-center flex flex-col gap-5">
        <h1 className="text-xl text-white text-center">
          Are you sure you want to delete this Project?
        </h1>
        <div className="flex gap-7 text-white  text-xl">
          <button
            onClick={async () => {
              setLoading(true);
              try {
                // console.log(todoId);
                const response = await http.delete(
                  `${baseURL}/project/delete/${projectStore.project.id}`
                );
                toast.success("Project deleted");
                const modal2 = document.getElementById(
                  "project_delete_modal"
                ) as HTMLDialogElement | null;
                modal2?.close();
                setLoading(false);

                console.log(response);
              } catch (error) {
                console.log("delete project error :::", error);
                toast.error("failed to delete project");
                setLoading(false);
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
                "project_delete_modal"
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

export default ProjectDeleteModal;
