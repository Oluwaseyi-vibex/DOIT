"use client";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import ProjectCard from "@/components/projectCard";
import { useSession } from "next-auth/react";

import { observer } from "mobx-react-lite";
import projectStore from "@/mobx/ProjectStore";

import toast, { Toaster } from "react-hot-toast";
import DateInput from "@/components/dateInput";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProjects } from "@/services/projectServices";

import http from "@/services/httpServices";

interface ProjectData {
  title: string;
  about: string;
  expiresAt: string;
}

const Projects = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const [isProjectModalVisible, setProjectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleProjectModal = () => {
    setProjectModal(!isProjectModalVisible);
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    projectStore.setNewProjectName(e.target.value);
    // console.log(projectStore.newProjectName);
  };

  const handleAboutProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    projectStore.setNewAboutProject(e.target.value);
    // console.log(projectStore.aboutProject);
  };

  const { data: session, status } = useSession();

  const projectData: ProjectData = {
    title: projectStore.newProjectName,
    about: projectStore.aboutProject,
    expiresAt: projectStore.projectDeadline,
  };

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const createProject = async () => {
    try {
      setLoading(true);
      const response = await http.post(
        `${baseURL}/project/create`,
        projectData
      );
      setLoading(false);
      console.log("Project created successfully:", response.data);
      toast.success("Project created successfully");

      setProjectModal(!isProjectModalVisible);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      setLoading(false);
    }
  };

  const { isFetching, isError, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchUserProjects,
  });

  const myProjects = data && data.data ? data.data : [];
  // console.log("mypid", myProjects.id);
  // const projectId = myProjects.map((todo: any) => todo.id);
  // projectStore.setProjectId(projectId);
  // console.log(projectStore.projectId);

  // console.log(myProjects);

  return (
    <>
      <main className="w-full h-full flex flex-col overflow-hidden justify-end  ">
        <div className="w-full h-[93%] flex flex-col items-center gap-6  p-6 ">
          <div className="flex justify-between w-full">
            <div className="w-full h-fit flex items-center gap-3">
              <h1 className="font-semibold text-4xl text-black">
                Welcome back, {session?.user.name}
              </h1>
              <Image src={"/handwave.png"} alt="" width={42.42} height={41} />
            </div>
          </div>

          <div className="w-full h-[550px] overflow-hidden">
            <div className="w-full grid-cols-4 gap-0  grid overflow-y-scroll  h-full">
              {myProjects?.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  newProjectName={project.title}
                  projectDeadline={project.expiresAt}
                  aboutProject={project.about}
                  projectId={project.id}
                />
              ))}

              <div className="flex w-fit gap-3">
                <div
                  onClick={toggleProjectModal}
                  className="w-[200px]  p-6 flex rounded-lg justify-center items-center h-[100px] bg-black cursor-pointer"
                >
                  <p className="text-sm font-thin text-white">
                    Add new project
                  </p>
                </div>

                {isProjectModalVisible && (
                  <div className="glass w-[300px] h-fit text-white flex flex-col gap-10 p-4 rounded-lg duration-500 transition-all ease-in  bg-[rgb(40,46,51)]">
                    <div className="w-full flex items-center ">
                      <h1 className="w-full text-center tracking-wide text-base font-semibold">
                        Create Project
                      </h1>
                      <div className="w-[15%] p-2 transition-all ease-in duration-300 rounded-md hover:bg-slate-300 ">
                        <Image
                          src={"/close.png"}
                          alt="close"
                          width={20}
                          height={20}
                          className="cursor-pointer"
                          onClick={toggleProjectModal}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <label
                          aria-required
                          htmlFor="name"
                          className="text-base tracking-wide font-semibold"
                        >
                          Project title
                        </label>
                        <input
                          type="text"
                          required
                          className="p-2 rounded-md"
                          value={projectStore.newProjectName}
                          onChange={handleProjectNameChange}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          aria-required
                          htmlFor="name"
                          className="text-base tracking-wide font-semibold"
                        >
                          About Project
                        </label>
                        <input
                          type="text"
                          required
                          className="p-2 rounded-md"
                          value={projectStore.aboutProject}
                          onChange={handleAboutProjectChange}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          aria-required
                          htmlFor="name"
                          className="text-base tracking-wide font-semibold"
                        >
                          Set Project Deadline
                        </label>
                        {/* <input
                          type="date"
                          required
                          className="p-2 rounded-md"
                          value={projectStore.projectDeadline}
                          onChange={handleDateChange}
                        /> */}
                        <DateInput />
                      </div>
                    </div>

                    <button
                      onClick={createProject}
                      aria-disabled
                      className="w-full py-4 flex items-center justify-center bg-black rounded-lg text-sm"
                    >
                      {loading ? (
                        <span className="loading loading-ring loading-lg"></span>
                      ) : (
                        <p>Create Project</p>
                      )}
                    </button>
                    <Toaster />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Projects);
