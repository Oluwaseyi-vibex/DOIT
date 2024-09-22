"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import http from "@/services/httpServices";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import projectStore, { Project } from "@/mobx/ProjectStore";
import { useSearchParams } from "next/navigation";

const EditProject = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      newProjectName: "",
      aboutProject: "",
      completed: projectStore.project?.completed ?? false,
      projectDeadline: "",
    },
  });
  useEffect(() => {
    const date = new Date(projectStore.project.expiresAt);
    const formattedDate = `${date.getUTCFullYear()}-${String(
      date.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}T${String(
      date.getUTCHours()
    ).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
    if (projectStore.project) {
      reset({
        newProjectName: projectStore.project.title || "",
        aboutProject: projectStore.project.about || "",
        projectDeadline: formattedDate || "",
        completed: projectStore.project.completed,
      });
    }
  }, [projectStore.project, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const date = new Date(data.projectDeadline);

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
        `${baseURL}/project/update/${projectStore.project.id}`,
        {
          title: data.newProjectName,
          about: data.aboutProject,
          completed: data.completed,
          expireAt: formattedDate,
        }
      );
      console.log(response);
      toast.success("Project updated successfully");
      const modal2 = document.getElementById(
        "project_edit_modal"
      ) as HTMLDialogElement | null;
      modal2?.close();

      setLoading(false);
    } catch (error) {
      console.error(`Error updating project: ${error}`);
      toast.error("Failed to update project");
      setLoading(false);
    }
  };

  return (
    <dialog id="project_edit_modal" className="modal ">
      <div className="modal-box bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex text-black flex-col gap-1"
        >
          <input
            {...register("newProjectName", {
              required: "Project name is required",
            })}
            type="text"
            className=" p-2 bg-[#FF6767]/0  max-h-[35px] "
          />
          <input
            {...register("aboutProject", { required: "About is required" })}
            type="text"
            className=" p-2 bg-[#FF6767]/0  max-h-[35px] "
          />
          <input
            {...register("projectDeadline", {
              required: "Deadline is required",
            })}
            type="datetime-local"
            className=" p-2 bg-[#FF6767]/0  max-h-[20px] "
          />
          <div className="flex mt-2 gap-4 justify-start">
            <button
              type="submit"
              className="btn p-3 h-fit min-h-fit py-1 text-white text-sm w-fit"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <p>Submit</p>
              )}
            </button>

            <div
              onClick={() => {
                const modal2 = document.getElementById(
                  "project_edit_modal"
                ) as HTMLDialogElement | null;
                modal2?.close();
              }}
              className="btn bg-error border-none p-3 h-fit min-h-fit py-1 text-white text-sm w-fit"
            >
              Close
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default observer(EditProject);
