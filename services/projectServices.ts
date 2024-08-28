import http from "./httpServices";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const fetchUserProjects =  async () => {
    try {
      const {data}:any = await http.get( `${baseURL}/project/user-project`)
      console.log(`UserProjectsData::: ${data}`);
      return data
    } catch (error) {
      console.log(`UserProjectsError::: ${error}`);
      return error
    }
    
      
}