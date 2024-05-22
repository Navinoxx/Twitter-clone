import { userProfile } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { TitleFeed } from "../components/TitleFeed";
import { useEffect, useState } from "react";
import { FollowersContacts } from "../components/FollowersContacts";
import { FollowingContacts } from "../components/FollowingContacts";
import { Link, useLocation, useParams } from "react-router-dom";

export const Contacts = () => {
    const { username } = useParams();
    const location = useLocation();

    const [selected, setSelected] = useState(0);

    const stylesTabs = "border-b-[1px] border-neutral-800 hover:bg-neutral-900 flex-1 py-5 text-center";
    const stylesTabSelected = "border-b-[1px] flex-1 py-5 text-center";

    const { data } = useQuery({
        queryKey: ["contacts", username],
        queryFn: () => userProfile(username),
    });

    useEffect(() => {
        if (location.pathname === `/${username}/followers`) {
            setSelected(0)
        } else {
            setSelected(1)
        }
    }, [location.pathname, username]);

    return (
        <>
            <TitleFeed title={`${username}`}/>
            <div className="grid grid-cols-2">
                <Link to={`/${username}/followers`} className={selected === 0 ? stylesTabSelected : stylesTabs} onClick={() => setSelected(0)}>
                    Seguidores
                </Link>
                <Link to={`/${username}/following`} className={selected === 1 ? stylesTabSelected : stylesTabs} onClick={() => setSelected(1)}>
                    Siguiendo
                </Link>
            </div>
            {selected === 0 && <FollowersContacts data={data?.followed_usernames}/>}
            {selected === 1 && <FollowingContacts data={data?.following_usernames}/>}
        </>
    );
};





