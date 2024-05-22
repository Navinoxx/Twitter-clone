import { useNavigate } from "react-router-dom";
import { FaRegComment, FaComment  } from "react-icons/fa";
import PropTypes from "prop-types";

export const CommentBtn = ({ t }) => {
    const navigate = useNavigate();

    return (
        <div className="flex col-span-3 items-center text-neutral-500 md:gap-1 cursor-pointer hover:text-blue-700">
            <button onClick={() => navigate(`/tweet/${t.id}`)} className="btn btn-ghost rounded-full hover:bg-blue-700 hover:bg-opacity-20">
                { t.parent.length > 0 ? <FaComment  color="blue"/> : <FaRegComment color="inherit"/> }
            </button>
            <p className={t.parent.length > 0 ? "text-blue-700" : ""}>{t.parent.length}</p>
        </div>
    );
};

CommentBtn.propTypes = {
    t: PropTypes.object.isRequired,
}
