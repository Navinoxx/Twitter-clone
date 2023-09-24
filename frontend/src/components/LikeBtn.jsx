import { PropTypes } from 'prop-types'
import { AiOutlineHeart } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { like } from '../api/tweets'

export const LikeBtn = ({ t, user }) => {
    const queryClient = useQueryClient()

    const likeMutation = useMutation({
        mutationFn: like,
        onSuccess: () => {
            queryClient.invalidateQueries('tweets')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const found = t.liked.some((key) => {
        if(key == user){
            return true
        } else {
            return false
        }   
    })

    return (
        <button onClick={() => likeMutation.mutate(t.id)}  className="btn btn-ghost rounded-full hover:bg-red-700 hover:bg-opacity-20 transition-color">
            <AiOutlineHeart 
            { ...t.iliked || found ? {color: 'red'} : {color: 'inherit'} } 
            />
        </button>
    );
};  

LikeBtn.propTypes = {
    t: PropTypes.object.isRequired,
    user: PropTypes.string
};