
// import { useSession } from "next-auth/react";
// import http from "@/services/httpServices";

// const AxiosInstance = ()=>{
//     const {data: session}=useSession()

//     const token = session
//     if(token){
//         http.setJwt
//     }
//     // else{
        
//     // }
//     }

// export default AxiosInstance

import { useSession } from "next-auth/react";
import http from "@/services/httpServices";

const AxiosInstance = () => {
  const { data: session } = useSession();

  const token = session?.user.token; // Ensure you're accessing the right token
  if (token) {
    http.setJwt(token); // Call the function with the token
  }
};

export default AxiosInstance;
