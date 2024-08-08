import { makeAutoObservable } from "mobx";

interface TaskType{
    id: number  
    name: string;
    descrip: string;
    priority: string
    status: string
    date: string
}

class TodoStore {

    tasks = [
        {
            id: 1,  
            name: "Init the Project",
            descrip: "Buy gifts on the way and pick up cake from the bakery. 6 PM | Fresh Elements",
            priority: "Moderate",
            status: "Not Started",
            date: "20/06/2023"
        },

        {
            id: 2,  
            name: "Burn the Project",
            descrip: "Buy gifts on the way and pick up cake from the bakery. 6 PM | Fresh Elements",
            priority: "Moderate",
            status: "Not Started",
            date: "20/06/2023"
        }
    ]

    message:string = ''
    
    loading:boolean = false
    constructor(){
        makeAutoObservable(this);
    }
    updateMessage(){
        this.message = 'Hello there'
        this.tasks
    }
}

const todoStore = new TodoStore()
export default todoStore;