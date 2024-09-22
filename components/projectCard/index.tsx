"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import todoStore from "@/mobx/TodoStore";
import Image from "next/image";
import http from "@/services/httpServices";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import projectStore, { Project } from "@/mobx/ProjectStore";
import { EditProjectModal, ProjectDeleteModal } from "..";
interface ProjectCardProps {
  id: string;
  newProjectName: string;
  projectDeadline: string;
  aboutProject: string;
  projectId: string;
  EditProject: Project;
  completed: boolean;
  refetch: () => void;
}

const ProjectCard = ({
  id,
  newProjectName,
  aboutProject,
  projectDeadline,
  projectId,
  EditProject,
  completed,
  refetch,
}: ProjectCardProps) => {
  function replaceSpacesWithUnderscores(str: string) {
    return str.replace(/ /g, "_");
  }
  const projectName = replaceSpacesWithUnderscores(newProjectName);
  const todoId = todoStore.todoId;

  const newdate = new Date(projectDeadline);

  const year = newdate.getUTCFullYear();
  const month = String(newdate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(newdate.getUTCDate()).padStart(2, "0");
  const hours = String(newdate.getUTCHours()).padStart(2, "0");
  const minutes = String(newdate.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div
      key={id}
      className="w-[250px] py-4 relative z-0 scroll-container px-4 justify-between max-h-[150px] overflow-auto rounded-xl flex flex-col gap-2 bg-[#FF6767]/40 "
    >
      <Link
        href={`/dashboard/dashboardManager?name=${projectName}&id=${projectId}&todoid=${todoId}`}
        className="flex flex-col gap-1"
      >
        <h1 className="text-lg tracking-wide uppercase text-white font-bold ">
          {newProjectName}
        </h1>
        <p className="text-xs text-black">{aboutProject}</p>
        <p className="text-sm">{formattedDate}</p>
      </Link>

      <div className="w-full relative z-10 flex items-center gap-1 justify-end">
        <Image
          className="cursor-pointer"
          onClick={() => {
            console.log("EditProject");
            projectStore.setEditProjects(EditProject);
            console.log(projectStore.project.title);
            // setEditVisibility(!editVisibility);
            const modal2 = document.getElementById(
              "project_edit_modal"
            ) as HTMLDialogElement | null;
            modal2?.showModal();
            // refetch();
          }}
          src={"/edit.png"}
          alt=""
          width={25}
          height={25}
        />

        <Image
          src={"/delete.png"}
          alt=""
          width={30}
          className="cursor-pointer"
          height={30}
          onClick={() => {
            projectStore.setEditProjects(EditProject);

            const project_delete_modal = document.getElementById(
              "project_delete_modal"
            ) as HTMLDialogElement | null;
            project_delete_modal?.showModal();
          }}
        />
      </div>
      <ProjectDeleteModal />
      <EditProjectModal />
    </div>
  );
};

export default observer(ProjectCard);
