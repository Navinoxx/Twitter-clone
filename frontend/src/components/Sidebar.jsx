import { FiMoreHorizontal } from "react-icons/fi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { RiFileList2Fill, RiFileList2Line } from "react-icons/ri";
import { MdNotifications, MdNotificationsNone, MdEmail, MdOutlineEmail } from "react-icons/md";
import { BsBookmarksFill, BsBookmarks } from "react-icons/bs";
import { SidebarLink } from "./SidebarLink";
import { BsTwitter } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotifications } from "../api/notifications";
import { getUnreadChats } from "../api/chat";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProfileLink } from "./ProfileLink";

export const Sidebar = () => {
    const username = localStorage.getItem("username")
    const [selectedPage, setSelectedPage] = useState("/home")
    const location = useLocation();

    const { data: unreadNotifications } = useQuery({
        queryKey: ["noti", "unread"],
        queryFn: getUnreadNotifications,
    });

    const { data: hasUnreadMessages  } = useQuery({
        queryKey: ["has_unread_messages"],
        queryFn: getUnreadChats,
    })

    useEffect(() => {
        if (location.pathname === "/home") {
            setSelectedPage("/home")
        }
    }, [location.pathname])

    const links = [
        { icon: selectedPage === "/home" ? <GoHomeFill/> : (<GoHome/>), text: "Inicio", link: "/home", page: "Inicio" },
        {
            icon: (
                <div>
                    {unreadNotifications?.length > 0 ? (
                        <div className="indicator">
                            <span className="indicator-item badge badge-primary badge-xs"></span>
                            {selectedPage === "/notifications" ? (
                        <MdNotifications />
                    ) : (
                        <MdNotificationsNone />
                    )}
                        </div>
                    ) : (selectedPage === "/notifications" ? (
                        <MdNotifications />
                    ) : (
                        <MdNotificationsNone />
                    ))
                    }
                </div>
            ),
            text: "Notificaciones",
            link: "/notifications",
            page: "Notificaciones"
        },
        {
            icon: (
                <div>
                    {hasUnreadMessages?.has_unread_messages > 0 ? (
                        <div className="indicator">
                            <span className="indicator-item badge badge-primary badge-xs"></span>
                            {selectedPage === "/messages" ? (
                        <MdEmail/>
                    ) : (
                        <MdOutlineEmail />
                    )}
                        </div>
                    ) : (selectedPage === "/messages" ? (
                        <MdEmail/>
                    ) : (
                        <MdOutlineEmail />
                    ))
                    }
                </div>
            ),
            text: "Mensajes",
            link: "/messages",
            page: "Mensajes"
        },
        { icon: selectedPage === "/bookmarks" ? <BsBookmarksFill/> : (<BsBookmarks/>), text: "Guardados", link: "/bookmarks", page: "Guardados" },
        { icon: selectedPage === "/lists" ? <RiFileList2Fill/> : (<RiFileList2Line/>), text: "Listas", link: "/lists", page: "Listas" },
        { icon: selectedPage === `/profile/${username}` ? <BiSolidUser/> : (<BiUser/>), text: "Perfil", link: `/profile/${username}`, page: "perfil" },
        { icon: <FiMoreHorizontal className="icon" />, text: "Más" }
    ];

    return (
        <header className="flex flex-col fixed h-full justify-between">
            <div className="space-y-2.5 mt-3 mb-2.5 xl:ml-24">
                <div className="p-4">
                    <BsTwitter className="text-2xl text-white" />
                </div>
                <nav>
                    {links.map((link) => (
                        <SidebarLink key={link.text} icon={link.icon} text={link.text} link={link.link} onClick={() => setSelectedPage(link.link)} />
                    ))}
                </nav>
            </div>
            <div className="space-y-2.5 mb-2.5 xl:ml-24 p-2">
                <ProfileLink />
            </div>
        </header>
    );
};
