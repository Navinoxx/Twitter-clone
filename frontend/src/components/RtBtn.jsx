import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FaRetweet  } from "react-icons/fa6";
import { rt } from "../api/tweets";
import PropTypes from "prop-types";

export const RtBtn = ({ t, user }) => {
    const queryClient = useQueryClient()

    const rtMutation = useMutation({
        mutationFn: rt,
        onSuccess: () => {
            queryClient.invalidateQueries('tweets')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const found = t.retweeted.some((key) => {
        if(key === Number(user)){
            return true
        } else {
            return false
        }
    })

    return (
        <div className="flex col-span-3 items-center text-neutral-500 md:gap-1 cursor-pointer hover:text-green-700">
            <button onClick={() => rtMutation.mutate(t.id)} className="btn btn-ghost rounded-full hover:bg-green-700 hover:bg-opacity-20">
                { t.iretweeted || found ? <FaRetweet  color="green"/> : <FaRetweet color="inherit"/> }
            </button>
            <p className={t.iretweeted || found ? "text-green-700" : ""}>{t.retweets_count}</p>
        </div>
    );
};

RtBtn.propTypes = {
    t: PropTypes.object.isRequired,
    user: PropTypes.string
};
