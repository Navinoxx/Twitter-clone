import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReadNotifications, getUnreadNotifications, markAsRead } from "../api/notifications";
import { Loader } from "../components/Loader";
import { TitleFeed } from "../components/TitleFeed";
import { formatDate } from "../utils/formatDate";
import { Avatar } from "../components/Avatar";
import toast from "react-hot-toast";

export const Notifications = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const markMutation = useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries(["noti", "unread"]);
            queryClient.invalidateQueries(["noti", "read"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { data: unreadNotifications, isLoading: unreadLoading, isError: unreadError } = useQuery({
        queryKey: ["noti", "unread"],
        queryFn: getUnreadNotifications,
    });

    const { data: readNotifications, isLoading: readLoading, isError: readError } = useQuery({
        queryKey: ["noti", "read"],
        queryFn: getReadNotifications,
    });

    const allNotifications = [...(unreadNotifications ?? []), ...(readNotifications ?? [])];
    allNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    const handleMarkAsRead = (notificationId, tweetId) => {
        markMutation.mutate(notificationId);
        navigate(`/tweet/${tweetId}`);
    };

    const handleFollowNotificationClick = (notificationId, username) => {
        markMutation.mutate(notificationId);
        navigate(`/${username}`);
    };

    if (unreadLoading || readLoading) return <Loader />
    if (unreadError || readError) return toast.error(unreadError?.message || readError?.message);

    return (
        <div>
            <TitleFeed title="Notificaciones"/>
            {allNotifications?.map((notification) => (
                <div
                    key={notification.id}
                    onClick={() =>
                        notification.type === "tweet" 
                            ? handleMarkAsRead(notification.id, notification.tweet.id)
                            : handleFollowNotificationClick(notification.id, notification.from_username)
                    }
                    className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900"
                >
                    <div className="flex flex-row items-start gap-3">
                        <Avatar src={notification.from_user_avatar} />
                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-white font-semibold hover:underline">
                                    {notification.from_user || notification.from_username}
                                </p>
                                <p className="hover:underline text-gray-600">
                                    @{notification.from_username}
                                </p>
                                <span className="text-neutral-600 text-sm">
                                    · {formatDate(notification.created_at)}
                                </span>
                            </div>
                            <div className={`font-semibold ${notification.is_read ? 'text-gray-600' : ''}`}>
                                {notification.type}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
