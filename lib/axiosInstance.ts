
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
