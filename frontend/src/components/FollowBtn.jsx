import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../api/users";
import toast from "react-hot-toast";
import  PropTypes from "prop-types";

export const FollowBtn = ({ user }) => {
    const queryClient = useQueryClient();
    const [isHovered, setIsHovered] = useState(false);

    const followMutation = useMutation({
        mutationFn: follow,
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
            queryClient.invalidateQueries(['user']);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    
    const isFollowing = user?.i_follow;
    const isFollowingText = isFollowing ? 'Siguiendo' : 'Seguir';
    const hoverText = isFollowing ? 'Dejar de seguir' : 'Seguir';
    const btnStyle = isFollowing
        ? "btn btn-outline rounded-full text-white font-bold btn-sm py-1.5 px-3.5"
        : "bg-white text-black rounded-full font-bold btn-sm py-1.5 px-3.5";

    const handleFollowClick = () => {   
        followMutation.mutate(user.username);
    };

    return (
        <button
            onClick={handleFollowClick}
            className={`${btnStyle} ${isFollowing ? 'hover:text-red-700 hover:bg-red-700 hover:bg-opacity-10 hover:border-red-700' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && isFollowing ? hoverText : isFollowingText}
        </button>
    );
};


FollowBtn.propTypes = {
    user: PropTypes.object,
};
