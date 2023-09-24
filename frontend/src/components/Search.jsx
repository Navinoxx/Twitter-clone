import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { q, recommendations } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FollowBtn } from "./FollowBtn";
import { SearchResult } from "./SearchResult";

export const Search = () => {
    const [search, setSearch] = useState("");
    const inputRef = useRef(null);

    const { data } = useQuery({
        queryKey: ["search", search],
        queryFn: () => {
        if (search) {
            return q(search);
        }
        return { users: [] };
        },
    });

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: recommendations,
    });

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setSearch("");
            }};
            document.addEventListener("click", handleDocumentClick);
            return () => {
            document.removeEventListener("click", handleDocumentClick);
            };
    }, []);

    return (
        <div className="fixed hidden lg:inline lg:w-[20rem] xl:w-[28rem] mt-2">
            <label className="bg-black z-10">
                <span className="sr-only">Search</span>
                <span className="absolute flex mt-4 ml-1">
                    < MagnifyingGlassIcon className="text-gray-500 h-5"/>
                </span>
                <input ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} 
                    className="bg-[#202327] mt-2 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full xl:w-9/12" 
                    placeholder="Buscar" type="text" name="search" autoComplete="off"/>
            </label>
            {data?.users.length > 0 && <SearchResult data={data.users} />}
            <div className="text-[#d9d9d9] space-y-3 bg-[#202327] mt-4   pt-2 rounded-xl w-full xl:w-9/12">
                <h4 className="font-bold text-xl px-4">A quién seguir</h4>
                {user?.map((user) => (
                    <div key={user.username} className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center">
                        <div className="avatar">
                            <div className="w-10 bg-black rounded-full">
                                <img src={`${user.avatar}`} />
                            </div>
                        </div>
                        <div className="ml-4 leading-5 group flex-1">
                            <Link to={`/${user.username}`}>
                                <h4 className="font-bold group-hover:underline">
                                    {user.name || user.username}
                                </h4>
                            </Link>
                            <h5 className="text-gray-500 text-[15px]">@{user.username}</h5>
                        </div>
                        <FollowBtn user={user} />
                    </div>
                ))}
                <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
                Mostrar más
                </button>
            </div>
        </div>
    );
};
