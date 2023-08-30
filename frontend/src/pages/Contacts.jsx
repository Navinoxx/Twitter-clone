import { userProfile } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { TitleFeed } from "../components/TitleFeed";
import { useEffect, useState } from "react";
import { FollowersContacts } from "../components/FollowersContacts";
import { FollowingContacts } from "../components/FollowingContacts";
import { Link, useLocation } from "react-router-dom";

export const Contacts = () => {
    const username = localStorage.getItem("username");
    const location = useLocation();

    const [selected, setSelected] = useState(0);
    const [show, setShow] = useState(0);

    const stylesTabs = "border-b-[1px] border-neutral-800 hover:bg-neutral-900 transition flex-1 py-5 text-center";
    const stylesTabSelected = "border-b-[1px] flex-1 py-5 transition text-center";

    const { data } = useQuery({
        queryKey: ["contacts"],
        queryFn: () => userProfile(username),
    });

    useEffect(() => {
        if (location.pathname === "/contacts/followers") {
            setSelected(0)
        } else {
            setSelected(1)
        }
    }, [location.pathname])

    const handleTab = (index) => {
        setShow(index);
        setSelected(index);
    }  

    const contactKey = show === 0 ? "followers" : "followings";

    return (
        <>
            <TitleFeed title="Contactos"/>
            <div className="tabs">
                <Link to="/contacts/followers" className={selected === 0 ? stylesTabSelected : stylesTabs} onClick={() => handleTab(0)}>
                    Seguidores
                </Link>
                <Link to="/contacts/following" className={selected === 1 ? stylesTabSelected : stylesTabs} onClick={() => handleTab(1)}>
                    Siguiendo
                </Link>
            </div>
            {show === 0 && <FollowersContacts key={contactKey} data={data}/>}
            {show === 1 && <FollowingContacts key={contactKey} data={data}/>}
        </>
    );
};





