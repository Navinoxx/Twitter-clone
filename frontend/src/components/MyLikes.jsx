import { PropTypes } from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "../api/tweets";
import { toast } from "react-hot-toast";
import { Loader } from "./Loader";
import { LikeBtn } from "./LikeBtn";
import { RtBtn } from "./RtBtn";
import { formatFullDate } from '../utils/formatDate';
import { CommentBtn } from './CommentBtn';

export const MyLikes = ({ user }) => {
    const userId = localStorage.getItem("user_id");

    const {
        data: likes,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["tweets"],
        queryFn: () => getUserLikes(user.username),
    });

    if (isLoading) return 
        <div className="flex h-screen items-center justify-center">
            <Loader />
        </div>;
        
    if (isError) return toast.error(error.message);

    return (
        <>
        {likes.map &&
            likes?.map((t) => (
                <div
                    key={t.id}
                    className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
                >
                    <div className="flex flex-row items-start gap-3">
                        <div className="avatar">
                            <div className="w-11 bg-black rounded-full">
                                <img src={`${t.avatar}`} />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-white font-semibold cursor-pointer hover:underline">
                                    {t.user || t.username}
                                </p>
                                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                                    @{t.username}
                                </span>
                                <span className="text-neutral-500 text-sm">
                                    · {formatFullDate(t.created_at)}
                                </span>
                            </div>
                            <div className="text-white mt-1 text-start break-all">{t.content}</div>
                            {
                                t.image &&
                                <img src={`${t.image}`} />
                            }
                            <div className="flex flex-row items-center mt-3 gap-10">
                                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-blue-700">
                                    <CommentBtn t={t} />
                                    <p>{t.parent.length}</p>
                                </div>
                                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-700">
                                    <RtBtn t={t} user={userId}/>
                                    <p>{t.retweets_count}</p>
                                </div>
                                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-700">
                                    <LikeBtn t={t} user={userId}/>
                                    <p>{t.likes_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

MyLikes.propTypes = {
    user: PropTypes.object.isRequired,
};
