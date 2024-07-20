import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}){
    const [isAuthoried, setAuthoried] = useState(null)

    useEffect(()=>{
        auth().catch(() => setAuthoried(false))
    }, [])


    const refreshToken = async() =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthoried(true)
            }else{
                setAuthoried(false)
            }
        }catch(e){
            console.log(e);
            setAuthoried(false);
        }
    }

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setAuthoried(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now()/1000

        if (tokenExpiration< now){
            await refreshToken()
        }else{
            setAuthoried(True)
        }

    }

    if (isAuthoried === null){
        return <div>Loading...</div>
    }

    return isAuthoried ? children : <Navigate to="/login" />
}

export default ProtectedRoute