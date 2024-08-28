    import { makeAutoObservable, runInAction } from "mobx";

    class FormStore {
    todoData: string | null = null;
    formData = {
        id: '',
        title: '',
        description: '',
        priority: '',
        status: '',
        expiresAt: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    async loadFormDataFromAPI() {
        try {
        const response = await fetch("https://api.example.com/user/1");
        const data = await response.json();
        
        // Update formData with API response
        runInAction(() => {
            this.formData = {
            id: data.name || "",
            title: data.email || "",
            description: data.phone || "",
            priority: data.priority || "",
            status: data.status || "",
            expiresAt: data.expiresAt || "",
            };
        });
        } catch (error) {
        console.error("Failed to load form data", error);
        }
    }
    }

    export const formStore = new FormStore();
