import { Link, useLocation } from "react-router-dom";
import { LikeBtn } from "./LikeBtn";
import { RtBtn } from "./RtBtn";
import { formatDate } from "../utils/formatDate";
import { CommentBtn } from "./CommentBtn";
import { BsFillTrashFill } from "react-icons/bs";
import { Bookmark } from "./Bookmark";
import { Avatar } from "./Avatar";
import PropTypes from "prop-types";

export const TweetsCard = ({ t, user, myUser, deleteTweetMutation }) => {
    const userId = localStorage.getItem("user_id");
    const location = useLocation();

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 pt-5 cursor-pointer hover:bg-neutral-900">
            <div className="flex items-start gap-3">
                <Avatar src={user.avatar} />
                <div className="grow">
                    <Link to={`/${user.username}`} className="flex items-center gap-2">
                        <p className="text-white font-semibold hover:underline">
                            {t.user || t.username}
                        </p>
                        <span className="text-neutral-500 hover:underline">
                            @{t.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            · {formatDate(t.created_at)}
                        </span>
                    </Link>
                    <Link to={`/tweet/${t.id}`}>
                        <div className="text-white mt-2 text-start break-all">
                            {t.content}
                        </div>
                        {t.image && 
                            <div className="mt-5 rounded-xl overflow-hidden">
                                <img src={`${t.image}`} alt="imagen" />
                            </div>
                        }
                    </Link>
                    <div className="grid grid-cols-10 items-center mt-2 right-4">
                        <CommentBtn t={t} />
                        <RtBtn t={t} user={userId} />
                        <LikeBtn t={t} user={userId} />
                        {myUser !== user.username && location.pathname !== `/${user.username}` &&
                            <Bookmark t={t} />
                        }
                        {myUser === user.username && location.pathname !== "/home" && (
                            <div className="flex col-span-1 items-center text-neutral-500 hover:text-red-500">
                                <BsFillTrashFill onClick={() => deleteTweetMutation.mutate(t.id)} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

TweetsCard.propTypes = {
    t: PropTypes.object,
    user: PropTypes.object,
    myUser: PropTypes.string,
    deleteTweetMutation: PropTypes.object
};
