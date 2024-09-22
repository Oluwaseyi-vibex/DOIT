
import http from "@/services/httpServices";
import { baseURL } from "@/services/TodoServices";
import { makeAutoObservable } from "mobx";

export type Todo = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  completed: boolean;
  completedAt: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  todoId: string;
};
class TodoStore {
    todoExpireDate:string=''
    todoId: string | null = null;
    todo: Todo = {
        id: '',
        title:'',
        description: '',
        priority: '',
        status: '',
        completed: false,
        completedAt: '' ,
        expiresAt: '',
        createdAt: '',
        updatedAt: '',
        todoId: ''
    }


    constructor() {
        makeAutoObservable(this);
    }

    // setEditTodos(todos: Todo[]) {
    //     this.todos = todos;
    // }

    setEditTodo = (payload : Todo)=>{
        let newEdit = {...payload}
        // newEdit.expiresAt = "2024-08-30T14:00"
        
        // `${new Date(newEdit.expiresAt).getFullYear()}-${new Date(newEdit.expiresAt).getMonth()}-${new Date(newEdit.expiresAt).getDay()}T${new Date(newEdit.expiresAt).getHours()}:${new Date(newEdit.expiresAt).getMinutes()}}`


        // console.log(newEdit);
        this.todo = newEdit
        // console.log(payload)
    }


    setTodoId=(deadline: string)=>{
        this.todoId=deadline
    }

    setNewDeadline = (deadline: string) => {
        this.todoExpireDate= deadline;
    }

    message:string = ''
    
    loading:boolean = false
    
}

const todoStore = new TodoStore()
export default todoStore;