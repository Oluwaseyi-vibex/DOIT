
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
    todos: Todo[] = [];
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

    setEditTodos(todos: Todo[]) {
        this.todos = todos;
    }

     setEditTodo = (payload : Todo)=>{
        let newEdit = {...payload}
        // newEdit.expiresAt = "2024-08-30T14:00"
        
        // `${new Date(newEdit.expiresAt).getFullYear()}-${new Date(newEdit.expiresAt).getMonth()}-${new Date(newEdit.expiresAt).getDay()}T${new Date(newEdit.expiresAt).getHours()}:${new Date(newEdit.expiresAt).getMinutes()}}`


        console.log(new Date(newEdit.expiresAt));
        this.todo = newEdit
        console.log(payload)
     }

fetchProjectTodos = async (projectId: string) => {
    try {
        const {data}: any = await http.get(`${baseURL}/todo/project-todos/${projectId}?status=pending`);
        console.log(`Fetched Todos:`, data);
        this.setEditTodos(data?.data);
        return data; // Ensure this returns the correct structure
    } catch (error: any) {
        console.error(`Error fetching todos:`, error);
        throw new Error('Failed to fetch project todos');
    }
};
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