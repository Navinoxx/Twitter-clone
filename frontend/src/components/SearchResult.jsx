import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export function SearchResult({ data }) {

    return (
        <div className="absolute bg-black text-[#d9d9d9] space-y-3 border-[1px] border-neutral-800 rounded-xl w-full xl:w-9/12 z-10 mt-1 shadow-[0_0px_5px_1px_rgba(255,255,255)] shadow-neutral-50">
        {data &&
            data.map((user) => (
                <Link to={`/${user.username}`} key={user.username}>
                    <div
                        className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
                    >
                        <div className="avatar">
                            <div className="w-10 bg-black rounded-full">
                                <img src={`${user.avatar}`} />
                            </div>
                        </div>
                        <div className="ml-4 leading-5 group">
                            <h4 className="font-bold group-hover:underline">
                                {user.name || user.username}
                            </h4>
                            <h5 className="text-gray-500 text-[15px]">@{user.username}</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

SearchResult.propTypes = {
    data: PropTypes.array.isRequired,
};
