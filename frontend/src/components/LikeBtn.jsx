import { useQueryClient, useMutation } from "@tanstack/react-query"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { like } from "../api/tweets"
import PropTypes from "prop-types"

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
        if(key === Number(user)){
            return true
        } else {
            return false
        }   
    })
    
    return (
        <div className="flex col-span-3 items-center text-neutral-500 md:gap-1 cursor-pointer hover:text-red-700">
            <button onClick={() => likeMutation.mutate(t.id)}  className="btn btn-ghost rounded-full hover:bg-red-700 hover:bg-opacity-20">
                { t.iliked || found ? <AiFillHeart color="red"/> : <AiOutlineHeart color="inherit"/> }
            </button>
            <p className={t.iliked || found ? "text-red-700" : ""}>{t.likes_count}</p>
        </div>
    );
};  

LikeBtn.propTypes = {
    t: PropTypes.object.isRequired,
    user: PropTypes.string
};