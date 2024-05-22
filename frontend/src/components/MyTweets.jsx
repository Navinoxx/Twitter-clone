import { PropTypes } from 'prop-types';
import { getUserTweets, deleteTweet } from "../api/tweets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader } from "./Loader";
import { TweetsCard } from './TweetsCard';

export const MyTweets = ({ user, myUser }) => {
    const queryClient = useQueryClient();

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

    if (deleteTweetMutation.isLoading || isLoading) return <Loader />
    if (isError) return toast.error(error.message);

    return (
        data.map((t) => (
            <TweetsCard key={t.id} t={t} myUser={myUser} user={user} deleteTweetMutation={deleteTweetMutation} />
        ))
    );
};

MyTweets.propTypes = {
    user: PropTypes.object.isRequired,
    myUser: PropTypes.string.isRequired,
    tweets: PropTypes.array.isRequired,
};
