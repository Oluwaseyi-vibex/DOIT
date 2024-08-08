"use client";
import Link from "next/link";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import projectStore from "@/mobx/ProjectStore";
const ProjectCard = ({
  newProjectName,
  aboutProject,
  projectDeadline,
}: {
  newProjectName: string;
  aboutProject: string;
  projectDeadline: string;
}) => {
  return (
    <Link
      className="w-[250px] py-4 scroll-container px-4 max-h-[100px] overflow-auto rounded-xl flex flex-col gap-2 bg-[#FF6767]/40 "
      href={"/dashboard/dashboardManager"}
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
