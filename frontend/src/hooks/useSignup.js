import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setloading] = useState(false)
    const {setauthUser} = useAuthContext()

    const signup = async ({ fullname, username,password,confirmPassword,gender }) => {
        const success = handleInputsError({ fullname, username,password,confirmPassword,gender })
        if (!success) return

        setloading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ fullname, username,password,confirmPassword,gender })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setauthUser(data)

            console.log(data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setloading(false)
        }

    }

    return {loading, signup}

}

export default useSignup;

const handleInputsError = ({ fullname, username,password,confirmPassword,gender }) =>{
    if (!fullname || !username || !password || !confirmPassword || !gender ) {
        toast.error("Please fill all the Fields")
        return false
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return false
    }

    if (password.length < 6) {
        toast.error("Password must be of 6 characters")
        return false
    }

    return true
}