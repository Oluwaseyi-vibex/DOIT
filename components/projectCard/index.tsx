"use client";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import todoStore from "@/mobx/TodoStore";

interface ProjectCardProps {
  key: string;
  newProjectName: string;
  projectDeadline: string;
  aboutProject: string;
  projectId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  newProjectName,
  aboutProject,
  projectDeadline,
  projectId,
}) => {
  // const router = useRouter();

  // console.log("Router", router);

  function replaceSpacesWithUnderscores(str: string) {
    return str.replace(/ /g, "_");
  }
  const projectName = replaceSpacesWithUnderscores(newProjectName);
  const todoId = todoStore.todoId;

  return (
    <Link
      href={`/dashboard/dashboardManager?name=${projectName}&id=${projectId}&todoid=${todoId}`}
      className="w-[250px] py-4 scroll-container px-4 max-h-[150px] overflow-auto rounded-xl flex flex-col gap-2 bg-[#FF6767]/40 "
    >
      <h1 className="text-lg tracking-wide uppercase text-white font-bold ">
        {newProjectName}
      </h1>
      <p className="text-xs text-black">{aboutProject}</p>
      <p className="text-sm">{projectDeadline}</p>
    </Link>
  );
};

export default observer(ProjectCard);
