import { PropTypes } from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { getUserRt } from "../api/tweets";
import { toast } from "react-hot-toast";
import { Loader } from "./Loader";
import { TweetsCard } from './TweetsCard';

export const MyRe = ({ user }) => {
    const { data: rt, isLoading, isError, error } = useQuery({
        queryKey: ["tweets", user.username],
        queryFn: () => getUserRt(user.username),
    });

    if (isLoading) return <Loader />
    if (isError) return toast.error(error.message);

    return (
        rt.map((t) => (
            <TweetsCard key={t.id} t={t} user={user} />
        ))
    );
};

MyRe.propTypes = {
    user: PropTypes.object,
};
