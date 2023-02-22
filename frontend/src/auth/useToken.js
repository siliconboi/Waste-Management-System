import { useState } from "react"

export default function useToken() {
    const getToken =()=>{
        const userToken =sessionStorage.getItem("jwt");
        return userToken;
    }
    const [token, setToken]= useState(getToken());

    const saveToken=(userToken)=>{
        sessionStorage.setItem('jwt', userToken);
        setToken(userToken);
      };
    
      return {
        setToken: saveToken,
        token
      }
    }