import { PropTypes } from 'prop-types';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getComments, deleteComment } from "../api/tweets";
import { Loader } from "./Loader";
import toast from "react-hot-toast";
import { AddComment } from "./AddComment";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { formatFullDate } from '../utils/formatDate';

export const Comments = ({ tweet }) => {
    const queryClient = useQueryClient();
    const myUser = localStorage.getItem("username");

    const {
        data: comments,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["comments", tweet.id],
        queryFn: () => getComments(tweet.id),
    });

    const deleteCommentMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
        queryClient.invalidateQueries("comments");
        toast.success("Comment deleted");
        },
        onError: (error) => {
        toast.error(error.message);
        },
    });

    if (isLoading) return <Loader />;
    if (isError) return toast.error(error.message);

    return (
        <>
        <AddComment tweet={tweet} />
        {comments.map((c) => (
            <div
            key={c.id}
            className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
            >
                <div className="flex flex-row items-start gap-3">
                    <img
                    className="h-11 w-11 rounded-full"
                    src={`${c.avatar}`}
                    />
                    <div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-white font-semibold cursor-pointer hover:underline">
                                <Link to={`/${c.username}`}>{c.user || c.username}</Link>
                            </p>
                            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                                @{c.username}
                            </span>
                            <span className="text-neutral-500 text-sm">
                                · {formatFullDate(c.created_at)}
                            </span>
                        </div>
                        <div className="text-white mt-1 text-start">{c.body}</div>
                        <div className="flex justify-start gap-3 mt-4">
                            {myUser === c.username && (
                                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                                    <BsFillTrashFill
                                        onClick={() => deleteCommentMutation.mutate(c.id)}
                                        size={20}
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

Comments.propTypes = {
    tweet: PropTypes.object.isRequired,
};
