import { PropTypes } from 'prop-types'
import { AiOutlineRetweet } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { rt } from '../api/tweets'

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
        if(key == user){
        return true
        } else {
        return false
        }
    })

    return (
        <button onClick={() => rtMutation.mutate(t.id)} className="btn btn-ghost rounded-full hover:bg-green-700 hover:bg-opacity-20 transition-color">
            <AiOutlineRetweet
            { ...t.iretweeted || found ? {color: 'green'} : {color: 'inherit'} }
            />
        </button>
    );
};

RtBtn.propTypes = {
    t: PropTypes.object.isRequired,
    user: PropTypes.string
};
