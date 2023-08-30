import { getSoloTweet } from "../api/tweets";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";
import { RtBtn } from "../components/RtBtn";
import { LikeBtn } from "../components/LikeBtn";
import { Comments } from "../components/Comments";
import { TitleFeed } from "../components/TitleFeed";
import { formatFullDate } from "../utils/formatDate";
import { Bookmark } from "../components/Bookmark";
import { CommentBtn } from "../components/CommentBtn";

export const Tweet = () => {
    const { id } = useParams();

    const {
        data: tweet,
        isLoading,
        isError,
        error,
    } = useQuery(["soloTweet", id], () => getSoloTweet(id));

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader />
        </div>
    );
    if (isError) return toast.error(error.message);

    return (
        <>
            <TitleFeed title="Tweet"/>
            <div className="border-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
                <div className="flex flex-row items-start gap-3">
                    <div className="avatar">
                        <div className="w-11 bg-black rounded-full">
                            <img src={`http://127.0.0.1:8000${tweet.avatar}`} />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-white font-semibold cursor-pointer hover:underline">
                                <Link to={`/profile/${tweet.username}`}>{tweet?.user || tweet?.username}</Link>
                            </p>
                            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                                @{tweet.username}
                            </span>
                            <span className="text-neutral-500 text-sm">
                                · {formatFullDate(tweet.created_at)}
                            </span>
                        </div>
                        <div className="text-white mt-1 text-start break-all">{tweet.content}</div>
                        <img src={tweet.image} />
                        <div className="flex flex-row items-center mt-3 gap-10">
                            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-blue-700">
                                <CommentBtn t={tweet} />
                                <p>{tweet.parent.length}</p>
                            </div>
                            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-700">
                                <RtBtn t={tweet} />
                                <p>{tweet.retweets_count}</p>
                            </div>
                            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-700">
                                <LikeBtn t={tweet} />
                                <p>{tweet.likes_count}</p>
                            </div>
                            <Bookmark t={tweet} />
                        </div>
                    </div>
                </div>
            </div>
            <Comments tweet={tweet} />
        </>
    );
};
