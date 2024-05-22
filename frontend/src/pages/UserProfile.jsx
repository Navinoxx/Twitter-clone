import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../api/users";
import { Loader } from "../components/Loader";
import { IoMdCalendar } from "react-icons/io";
import { EditProfile } from "../components/EditProfile";
import { getUserTweets } from "../api/tweets";
import { TitleFeed } from "../components/TitleFeed";
import { formatFullDate } from "../utils/formatDate";
import { ProfileBtn } from "../components/ProfileBtn";
import { ProfileTabs } from "../components/ProfileTabs";
import defaultAvatar from "../assets/media/user.png";
import defaultCover from "../assets/media/cover.jpeg";
import toast from "react-hot-toast";

export const UserProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const myUser = localStorage.getItem("username");

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(true);
    };

    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isErrorUser,
        error: errorUser,
    } = useQuery({
        queryKey: ["user", username],
        queryFn: () => userProfile(username),
    });

    const {
        data: tweets,
        isLoading: isLoadingTweets,
        isError: isErrorTweets,
        error: errorTweets,
    } = useQuery({
        queryKey: ["user_tweets"],
        queryFn: () => getUserTweets(username),
    });

    if (isLoadingUser || isLoadingTweets) return <Loader />
    if (isErrorUser || !user) {
        toast.error(errorUser?.message);
        navigate('/home');
        return null;
    }
    if (isErrorTweets) return toast.error(errorTweets?.message);

    const handleErrorAvatar = (e) => {
        e.target.src = defaultAvatar;
    };

    const handleErrorCover = (e) => {
        e.target.src = defaultCover;
    };

    return (
        <>
            <EditProfile user={user} showModal={showModal} setShowModal={setShowModal} />
            <TitleFeed title={user.username}/>
            <div className="max-h-[26rem]">
                <div className="overflow-hidden max-h-[20rem]">
                    <img src={user.cover_image || defaultCover} onError={handleErrorCover} className="w-full object-cover" />
                </div>
                <div className="flex justify-between gap-4 ml-4 -mt-20">
                    <div className="avatar">
                        <div className="w-44 bg-gray-300 rounded-full ring ring-black">
                            <img src={user.avatar || defaultAvatar} onError={handleErrorAvatar} />
                        </div>
                    </div>
                    <ProfileBtn myUser={myUser} username={user.username} handleModal={handleModal} user={user}/>
                </div>
            </div>
            <p className="text-start ml-4 mt-4 text-xl font-bold">{user.name}</p>
            <div className="text-white text-start ml-4">
                <span className="text-neutral-500 block place-items-center">
                    @{user.username}
                </span>
                <span className="block mt-3 break-all">
                    {user.bio}
                </span>
                <div className="flex gap-3 w-full py-4 text-neutral-500 place-items-center">
                    <IoMdCalendar size={20} />
                    Se unió en {formatFullDate(user.date_joined).slice(5,-7)}
                </div>
                <div className="flex gap-3 w-full py-2 text-neutral-500">
                <Link to={`/${username}/following`} className="hover:underline decoration-white">
                    <span className="text-white">{user.following}</span> Siguiendo
                </Link>
                <Link to={`/${username}/followers`} className="hover:underline decoration-white">
                    <span className="text-white">{user.followers}</span> Seguidores
                </Link>
                </div>
            </div>
            <ProfileTabs user={user} tweets={tweets} myUser={myUser} />
        </>
    );
};
