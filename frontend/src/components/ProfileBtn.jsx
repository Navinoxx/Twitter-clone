import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow } from "../api/users";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export const ProfileBtn = ({ myUser, username, handleModal, user }) => {
    const queryClient = useQueryClient();
    const [isHovered, setIsHovered] = useState(false);

    const followMutation = useMutation({
        mutationFn: follow,
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const isFollowing = user.i_follow;
    const isFollowingText = isFollowing ? 'Siguiendo' : 'Seguir';
    const hoverText = isFollowing ? 'Dejar de seguir' : 'Seguir';

    const handleFollowClick = () => {
        followMutation.mutate(username);
    };

    return (
        myUser === username ? (
            <button onClick={handleModal} className="btn btn-outline rounded-full text-white mt-24 mr-4">
                Editar perfil
            </button>
            ) : (
                <button
                onClick={handleFollowClick}
                className={`btn btn-outline rounded-full text-white mt-24 mr-4 ${isFollowing ? 'hover:text-red-700 hover:bg-red-700 hover:bg-opacity-10 hover:border-red-700' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered && isFollowing ? hoverText : isFollowingText}
            </button>
        )
    );
};

ProfileBtn.propTypes = {
    myUser: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    handleModal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};
