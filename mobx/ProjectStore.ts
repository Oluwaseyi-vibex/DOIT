import { makeAutoObservable } from "mobx";
export type Project ={
    id: string,
    title: string,
    about: string,
    completed: boolean,
    completedAt: string,
    expiresAt: string,
    createdAt: string,
    updatedAt: string,
    userId: string,
}
class ProjectStore{
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
    // newProjectName = '';
    // aboutProject= ''
    // projectDeadline = ''
    // projectId=''

    constructor() {
        makeAutoObservable(this);
    }

    setEditProjects(payload: Project) {
        let newProject = {...payload}
        this.project = newProject
    }

    openModal = () => {
        this.isModalOpen = true;
    };

    closeModal = () => {
        this.isModalOpen = false;
    };

    // setNewProjectName = (name: string) => {
    //     this.newProjectName = name;
    // };

    // setNewAboutProject = (about: string)=>{
    //     this.aboutProject= about;
    // }

    // setNewDeadline = (deadline: string) => {
    //     this.projectDeadline= deadline;
    // }

    // setProjectId=(id: string)=>{
    //     this.projectId= id;
    // }

    // addProject = () => {
    //     if (this.newProjectName.trim()) {
    //         this.projects.push(this.newProjectName, this.aboutProject, this.projectDeadline);
    //         this.newProjectName = '';
    //         this.aboutProject= '';
    //         this.projectDeadline=''
    //         this.isModalOpen = false;
    //         // this.projectId= ''
    //     }
    // };

}

const projectStore = new ProjectStore();
export default projectStore;