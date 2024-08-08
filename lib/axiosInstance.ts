
import { useSession } from "next-auth/react";
import http from "@/services/httpServices";

const AxiosInstance = ()=>{
    const {data: session}=useSession()

    const token = session
    if(token){
        http.setJwt
    }else{
        
    }
}

export default AxiosInstance

// axios.interceptors.request.use(
//     (config) => {
//         const  {data: session}= useSession()

//         const token = session?.user.token
        
//         if(token){
            
//             config.headers.Authorization= `Bearer ${token}`
//         }
        
//         return config;

//     },(error)=>{
//         return Promise.reject(error)
//     }
// )

// axios.interceptors.response.use(
//     (config) => {
        
//         return config;

//     },(error)=>{
//        if(error.response) {
//         if(error.response.status === 401) {
//             // sign user out
//         }
//        }
//     }
// )
