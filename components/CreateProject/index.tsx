"use client";

import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

interface ProjectData {
  title: string;
  about: string;
  expiresAt: string;
}

const CreateProject: React.FC = () => {
  const { data: session, status } = useSession();
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = session?.user.token;
  console.log(token);

  const projectData: ProjectData = {
    title: "nodeit new",
    about: "fintech website for training new siwes students",
    expiresAt: "2024-08-14T13:15:03-08:00",
  };

  const createProject = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/project/create`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Project created successfully:", response.data);
      toast("Project created successfully");
      if (response.data) {
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  };

  return (
    <div>
      <Toaster />
      <button onClick={createProject}>Create Project</button>
    </div>
  );
};

export default CreateProject;
