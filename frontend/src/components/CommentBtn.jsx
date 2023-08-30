import { FaRegComment, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

export const CommentBtn = ({t}) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`/tweet/${t.id}`)} className="btn btn-ghost rounded-full hover:bg-blue-700 hover:bg-opacity-20 transition-color">
            { t.parent.length > 0 ? <FaRegCommentDots color="blue"/> : <FaRegComment color="inherit"/> }
        </button>
    );
};

CommentBtn.propTypes = {
    t: PropTypes.object.isRequired,
}
