import { useEffect, useMemo, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { getChat } from "../api/chat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "../components/Loader";
import { formatDate } from '../utils/formatDate';

export const Chat = () => {
    const { user } = useParams()
    const queryClient = useQueryClient()

    const token_votify = jwt_decode(localStorage.getItem("access"))
    const me = token_votify.username

    const [messageHistory, setMessageHistory] = useState([])
    const [message, setMessage] = useState('')

    const { data: canal, isLoading } = useQuery({
        queryKey: ['chat', user],
        queryFn: () => getChat(user),
    })

    const baseURL = import.meta.env.VITE_BACKEND_WS

    const { sendJsonMessage } = useWebSocket(`${baseURL}/${user}/${me}/`, {
        onOpen: () => {
            console.log('Connected!')
            queryClient.invalidateQueries(['has_unread_messages'])
            sendJsonMessage({
                type: "mark_as_read",
                from_username: user,
                to_username: me,
            })
        },
        onClose: () => {
            console.log('Disconnected!')
        },
        onMessage: (e) => {
        const data = JSON.parse(e.data)
        switch (data.type) {
            case "chat_message_echo":
                setMessageHistory((prev) => prev.concat(data))
            break;
            default:
                console.error('Received unknown message type: ', data.type)
            break
        }
        }
    })

    function sendMsj () {
        sendJsonMessage({
            type: "chat_message",
            message: message,
            from_username: me,
            to_username: user,
        })
        setMessage('')
    }

    const newChat = useMemo(() => {
        if (canal) {
            let chat = [...canal, ...messageHistory];
            return chat.filter(message => message.type !== 'chat_message_echo');
        }

        return [];
    }, [canal, messageHistory]);

    useEffect(() => {
        queryClient.invalidateQueries(['chat', user]);
    }, [newChat, queryClient, user]);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader />
        </div>
        );

    return (
        <>
        <div className="border-b-[1px] border-neutral-800 p-5">
            <div className="flex flex-row items-start gap-3">
            <div>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-white font-semibold text-xl">{user}</p>
                </div>
            </div>
            </div>
        </div>
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer">
            <div className="scrollable-container relative w-full p-2 overflow-y-auto h-[40rem] flex flex-col-reverse" ref={chatContainerRef}>
                <ul className="space-y-2">
                    {newChat?.map((message) => (
                        <li
                        key={message.type === 'chat_message_echo' ? `echo_${message.message}` : message.id}
                            className={`${message.from_username === me ? 'chat chat-end' : 'chat chat-start'}`}
                        >
                            <div className="chat-bubble">
                                <span className="block text-indigo-600">{message.to_username !== me ? 'Tú' : message.from_username}</span>
                                <span className="block break-words">{message.message}</span>
                            </div>
                            <span className="chat-footer opacity-50">    
                                {formatDate(message.timestamp)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <form className="flex items-center justify-between w-full p-3 join">
            <input
            type="text"
            placeholder="Mensaje..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="input w-full join-item"
            maxLength={50}
            autoFocus
            />
            <button
            type="submit"
            onClick={sendMsj}
            className="btn btn-outline join-item"
            disabled={!message}
            >
            Enviar
            </button>
        </form>
        </>
    );
};
