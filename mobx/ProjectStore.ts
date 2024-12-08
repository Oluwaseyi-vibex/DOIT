import { makeAutoObservable } from "mobx";

export type Project = {
  id: string;
  title: string;
  about: string;
  completed: boolean;
  completedAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

class ProjectStore {
  project: Project = {
    id: '',
    title: '',
    about: '',
    completed: false,
    completedAt: '',
    expiresAt: '',
    createdAt: '',
    updatedAt: '',
    userId: '',
  };

  isModalOpen = false;
  testId: string = ''; // New testId property

  constructor() {
    makeAutoObservable(this);
  }

  setEditProjects(payload: Project) {
    let newProject = { ...payload };
    this.project = newProject;
  }

  openModal = () => {
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.isModalOpen = false;
  };

  setTestId = (id: string) => {
    this.testId = id; // Method to update the testId
  };
}

const projectStore = new ProjectStore();
export default projectStore;
