import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getSoloTweet } from "../api/tweets";
import { Loader } from "../components/Loader";
import { RtBtn } from "../components/RtBtn";
import { LikeBtn } from "../components/LikeBtn";
import { Comments } from "../components/Comments";
import { TitleFeed } from "../components/TitleFeed";
import { formatFullDate } from "../utils/formatDate";
import { Bookmark } from "../components/Bookmark";
import { CommentBtn } from "../components/CommentBtn";
import { Avatar } from "../components/Avatar";
import toast from "react-hot-toast";

export const Tweet = () => {
    const { id } = useParams();

    const {
        data: tweet,
        isLoading,
        isError,
        error,
    } = useQuery(["soloTweet", id], () => getSoloTweet(id));

    if (isLoading) return <Loader />
    if (isError) return toast.error(error.message);
    
    return (
        <>
            <TitleFeed title="Post"/>
            <div className="px-5 pt-5">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-3">
                        <Avatar src={tweet.avatar} />
                        <div className="flex flex-col">
                            <p className="text-white font-semibold cursor-pointer hover:underline">
                                <Link to={`/${tweet.username}`}>{tweet?.user || tweet?.username}</Link>
                            </p>
                            <span className="text-neutral-500 cursor-pointer hover:underline">  
                                @{tweet.username}
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="text-white mt-1 text-start break-all">{tweet.content}</div>
                        {tweet.image && 
                            <div className="mt-5 rounded-xl overflow-hidden">
                                <img src={`${tweet.image}`} alt="imagen" />
                            </div>
                        }
                        <span className="text-neutral-500 text-sm">
                            {formatFullDate(tweet.created_at)}
                        </span>
                        <div className="grid grid-cols-10 items-center mt-4 border-y border-neutral-800">
                            <CommentBtn t={tweet} />
                            <RtBtn t={tweet} />
                            <LikeBtn t={tweet} />
                            <Bookmark t={tweet} />
                        </div>
                    </div>
                </div>
            </div>
            <Comments tweet={tweet} />
        </>
    );
};
