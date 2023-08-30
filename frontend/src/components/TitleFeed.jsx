import { PropTypes } from "prop-types";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

export const TitleFeed = ({ title }) => {
    const location = useLocation()
    const isHome = location.pathname != "/home";

    return (
        <div className="sticky top-0 border-b-[1px] border-neutral-800 p-5 z-10 bg-[rgba(2,2,2,0.82)] shadow-md backdrop-blur-[10.7px] -webkit-backdrop-blur-[10.7px]">
            <div className="flex flex-row items-start gap-3">
                <div>
                    <div className="flex flex-row items-center gap-2">
                        {isHome ? (
                            <Link to="/home">
                                <AiOutlineArrowLeft
                                    size={20}
                                    className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"
                                />
                            </Link>
                        ) : false}
                        <p className="text-white font-semibold text-xl">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

TitleFeed.propTypes = {
    title: PropTypes.string.isRequired,
};
