import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setloading] = useState(false)
    const [conversations, setconversations] = useState([])

    useEffect(() => {
        const getConversation = async () => {
            setloading(true)
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setconversations(data)

            } catch (error) {
                toast.error(error.message)
            }finally{
                setloading(false)
            }
        }

        getConversation();
    }, [])
    
    return { loading, conversations}
}

export default useGetConversations;