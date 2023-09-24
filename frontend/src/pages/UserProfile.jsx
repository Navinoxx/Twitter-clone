import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../api/users";
import { Loader } from "../components/Loader";
import { IoMdCalendar } from "react-icons/io";
import { EditProfile } from "../components/EditProfile";
import { MyTweets } from "../components/MyTweets";
import { MyLikes } from "../components/MyLikes";
import { MyRe } from "../components/MyRe";
import { MyMedia } from "../components/MyMedia";
import { getUserTweets } from "../api/tweets";
import { TitleFeed } from "../components/TitleFeed";
import toast from "react-hot-toast";
import { formatFullDate } from "../utils/formatDate";
import { ProfileBtn } from "../components/ProfileBtn";

export const UserProfile = () => {
    const { username } = useParams();
    const myUser = localStorage.getItem("username");

    const [show, setShow] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(0);

    const handleTab = (index) => {
        setShow(index);
        setSelected(index);
    }   

    const stylesTabs = "border-b-[1px] border-neutral-800 hover:bg-neutral-900 transition flex-1 py-5";
    const stylesTabSelected = "border-b-[1px] flex-1 py-5 transition";

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

    if (isLoadingUser || isLoadingTweets) return (
        <div className="flex h-screen items-center justify-center">
            <Loader />
        </div>
    );

    if (isErrorUser) return  toast.error(errorUser?.message);
    if (isErrorTweets) return  toast.error(errorTweets?.message);

    return (
        <>
            <EditProfile user={user} showModal={showModal} setShowModal={setShowModal} />
            <TitleFeed title={user.username}/>
            <img className="bg-black h-[16rem] w-full object-cover" src={user.cover_image} />    
            <div className="flex justify-between">
                <div className="avatar ml-3 -mt-20">
                    <div className="w-[10rem] bg-black rounded-full ring ring-black">
                        <img src={user.avatar} />
                    </div>
                </div>
                <ProfileBtn myUser={myUser} username={user.username} handleModal={handleModal} user={user}/>
            </div>
            <p className="text-start ml-4 mt-4 text-xl font-bold ">{user.name}</p>
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
                <div className="flex gap-3 w-full py-2 text-neutral-500 ">
                <Link to={`/${username}/following`} className="hover:underline decoration-white">
                    <span className="text-white">{user.following}</span> Siguiendo
                </Link>
                <Link to={`/${username}/followers`} className="hover:underline decoration-white">
                    <span className="text-white">{user.followers}</span> Seguidores
                </Link>
                </div>
            </div>
            <div className="tabs">
                <button
                onClick={() => handleTab(0)}
                className={selected === 0 ? stylesTabSelected : stylesTabs}
                >
                Tweets
                </button>
                <button
                onClick={() => handleTab(1)}
                className={selected === 1 ? stylesTabSelected : stylesTabs}
                >
                Retweets
                </button>
                <button
                onClick={() => handleTab(2)}
                className={selected === 2 ? stylesTabSelected : stylesTabs}
                >   
                Fotos y videos  
                </button>
                <button 
                onClick={() => handleTab(3)}
                className={selected === 3 ? stylesTabSelected : stylesTabs}
                >
                Me gusta
                </button>
            </div>
            {show === 0 && <MyTweets user={user} tweets={tweets} myUser={myUser} />}
            {show === 1 && <MyRe user={user} />}
            {show === 2 && <MyMedia tweets={tweets} />}
            {show === 3 && <MyLikes user={user} />}
        </>
    );
};
