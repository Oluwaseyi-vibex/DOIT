
import http from "./httpServices";

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchProjectTodos = async (projectId: string) => {
    try {
        const {data}: any = await http.get(`${baseURL}/todo/project-todos/${projectId}?status=pending`);
        console.log(`Fetched Todos:`, data);
        return data; // Ensure this returns the correct structure
    } catch (error: any) {
        console.error(`Error fetching todos:`, error);
        throw new Error('Failed to fetch project todos');
    }
};
