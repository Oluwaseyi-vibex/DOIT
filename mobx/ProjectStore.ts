import { makeAutoObservable } from "mobx";

class ProjectStore{
    projects: string[] = [];
    isModalOpen = false;
    newProjectName = '';
    aboutProject= ''
    projectDeadline = ''

    constructor() {
        makeAutoObservable(this);
    }

    openModal = () => {
        this.isModalOpen = true;
    };

    closeModal = () => {
        this.isModalOpen = false;
    };

    setNewProjectName = (name: string) => {
        this.newProjectName = name;
    };

    setNewAboutProject = (about: string)=>{
        this.aboutProject= about;
    }

    setNewDeadline = (deadline: string) => {
        this.projectDeadline= deadline;
    }

    addProject = () => {
        if (this.newProjectName.trim()) {
            this.projects.push(this.newProjectName, this.aboutProject, this.projectDeadline);
            this.newProjectName = '';
            this.aboutProject= '';
            this.projectDeadline=''
            this.isModalOpen = false;
        }
    };

}

const projectStore = new ProjectStore();
export default projectStore;