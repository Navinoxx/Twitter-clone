import defaultAvatar from "../assets/media/user.png";
import PropTypes from "prop-types";

export const Avatar = ({ src }) => {
    const handleError = (e) => {
        e.target.src = defaultAvatar;
    };

    return (
        <div className="avatar static">
            <div className="w-10 bg-gray-300 rounded-full">
                <img 
                    src={src || defaultAvatar} 
                    alt="Avatar del usuario"
                    onError={handleError}
                />
            </div>  
        </div>
    )
}

Avatar.propTypes = {
    src: PropTypes.string
}