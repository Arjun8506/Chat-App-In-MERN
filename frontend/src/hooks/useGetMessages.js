import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data === null) {
                    console.log([]);
                }
                if (res.ok) {
                    setMessages(data);
                } else {
                    throw new Error(data.error.message);
                }
                // setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if(selectedConversation?._id) {
            getMessages().catch(error => {
                console.error("Failed to fetch messages:", error);
                toast.error("Failed to fetch messages");
                setLoading(false);
            });
        }
    }, [selectedConversation?._id, setMessages])

    return { loading, messages}
}

export default useGetMessages;