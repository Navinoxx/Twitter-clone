import { PropTypes } from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "../api/tweets";
import { toast } from "react-hot-toast";
import { Loader } from "./Loader";
import { TweetsCard } from './TweetsCard';

export const MyLikes = ({ user }) => {
    const {
        data: likes,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["tweets", user.username],
        queryFn: () => getUserLikes(user.username),
    });

    if (isLoading) return <Loader />
    if (isError) return toast.error(error.message);

    return (
        likes.map((t) => (
            <TweetsCard key={t.id} t={t} user={user} />
        ))
    );
};

MyLikes.propTypes = {
    user: PropTypes.object.isRequired,
};
