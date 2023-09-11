import { PropTypes } from 'prop-types';
import { BsFillTrashFill } from "react-icons/bs";
import { getUserTweets, deleteTweet } from "../api/tweets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader } from "./Loader";
import { LikeBtn } from "./LikeBtn";
import { RtBtn } from "./RtBtn";
import { formatFullDate } from '../utils/formatDate';
import { CommentBtn } from './CommentBtn';

export const MyTweets = ({ user, myUser }) => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("user_id");

    const deleteTweetMutation = useMutation({
        mutationFn: deleteTweet,
        onSuccess: () => {
            queryClient.invalidateQueries(["tweets", user.username]);
            toast.success("Tweet eliminado con éxito");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tweets", user.username],
        queryFn: () => getUserTweets(user.username),
    });

    if (deleteTweetMutation.isLoading) return <Loader />;
    if (isLoading) return <Loader />;
    if (isError) return toast.error(error.message);

    return (
        <>
        {data.map &&
            data.map((t) => (
            <div
                key={t.id}
                className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
            >
                <div className="flex flex-row items-start gap-3">
                    <div className="avatar">
                        <div className="w-11 bg-black rounded-full">
                            <img src={user.avatar} />
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
                            {myUser === user.username && (
                                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                                    <BsFillTrashFill
                                    onClick={() => deleteTweetMutation.mutate(t.id)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </>
    );
};

MyTweets.propTypes = {
    user: PropTypes.object.isRequired,
    myUser: PropTypes.string.isRequired,
    tweets: PropTypes.array.isRequired,
};
