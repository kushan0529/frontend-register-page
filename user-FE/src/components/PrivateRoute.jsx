import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute({children}){
    const navigate=useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    if(!localStorage.getItem('token')){
        return <p>Loading...</p>
    }
    return children
}