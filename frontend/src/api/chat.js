import { authAxios } from "./useAxios";

export const getChat = async (username) => {
    const response = await authAxios.get(`/chat/canal/${username}/`);
    return response.data;
}

export const getUnreadMessages = async (username) => {
    const res = await authAxios.get(`/chat/messages/${username}/`);
    return res.data;
}

export const getUnreadChats = async () => {
    const res = await authAxios.get(`/chat/unread_messages/`);
    return res.data;
}