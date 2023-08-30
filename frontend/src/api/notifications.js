import { authAxios } from "./useAxios";

export const markAsRead = async (notificationId) => {
    await authAxios.put(`/notifications/leer/${notificationId}/`);
}

export const getUnreadNotifications = async () => {
    const res = await authAxios.get("/notifications/no/");
    return res.data;
}

export const getReadNotifications = async () => {
    const res = await authAxios.get("/notifications/");
    return res.data;
}