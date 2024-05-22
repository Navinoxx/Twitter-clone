import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ProfileLink } from "./ProfileLink";
import PropTypes from "prop-types";

export const TitleFeed = ({ title }) => {
    const location = useLocation()
    const isHome = location.pathname != "/home";

    return (
        <div className="sticky top-0 border-b-[1px] border-neutral-800 pl-5 sm:p-5 z-10 bg-[rgba(2,2,2,0.82)] shadow-md backdrop-blur-[10.7px] -webkit-backdrop-blur-[10.7px]">
            <div className="flex justify-between gap-3">
                    <div className="flex items-center gap-5">
                        {isHome ? (
                            <Link to="/home">
                                <AiOutlineArrowLeft
                                    size={20}
                                    className="mr-4text-slate-200 cursor-pointer"
                                />
                            </Link>
                        ) : false}
                        <p className="text-white font-semibold text-xl">{title}</p>
                    </div>
            <div className="sm:hidden">
                <ProfileLink />
            </div>
            </div>
        </div>
    );
};

TitleFeed.propTypes = {
    title: PropTypes.string.isRequired,
};
