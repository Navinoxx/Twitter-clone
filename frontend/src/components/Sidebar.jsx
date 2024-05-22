import { FiMoreHorizontal } from "react-icons/fi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { RiFileList2Fill, RiFileList2Line } from "react-icons/ri";
import { MdNotifications, MdNotificationsNone, MdEmail, MdOutlineEmail } from "react-icons/md";
import { BsBookmarksFill, BsBookmarks } from "react-icons/bs";
import { SidebarLink } from "./SidebarLink";
import { BsTwitter } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProfileLink } from "./ProfileLink";
import { NotificationIcon } from "./NotificationIcon";
import { MessagesIcon } from "./MessagesIcon";

export const Sidebar = () => {
    const username = localStorage.getItem("username")
    const [selectedPage, setSelectedPage] = useState("/home")
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/home") {
            setSelectedPage("/home")
        }
    }, [location.pathname])

    const links = [
        { icon: selectedPage === "/home" ? <GoHomeFill/> : <GoHome/>, text: "Inicio", link: "/home" },
        {
            icon: selectedPage === "/notifications" ? <NotificationIcon><MdNotifications /></NotificationIcon> : <NotificationIcon><MdNotificationsNone /></NotificationIcon>,
            text: "Notificaciones",
            link: "/notifications"
        },
        {
            icon: selectedPage === "/messages" ? <MessagesIcon><MdEmail/></MessagesIcon> : <MessagesIcon><MdOutlineEmail/></MessagesIcon>,
            text: "Mensajes",
            link: "/messages"
        },
        { icon: selectedPage === "/bookmarks" ? <BsBookmarksFill/> : (<BsBookmarks/>), text: "Guardados", link: "/bookmarks" },
        { icon: selectedPage === "/lists" ? <RiFileList2Fill/> : (<RiFileList2Line/>), text: "Listas", link: "/lists" },
        { icon: selectedPage === `/${username}` ? <BiSolidUser/> : (<BiUser/>), text: "Perfil", link: `/${username}` }
    ];

    return (
        <nav className="flex sm:flex-col fixed h-full justify-between w-full sm:w-auto">
            <div className="sm:my-2 xl:ml-24 mx-auto">
                <div className="hidden sm:block p-5">
                    <BsTwitter className="text-2xl text-white" />
                </div>
                <ul className="flex sm:flex-col">
                    {links.map((link) => (
                        <SidebarLink key={link.text} icon={link.icon} text={link.text} link={link.link} onClick={() => setSelectedPage(link.link)} />
                    ))}
                    <li className="hidden sm:flex rounded-full hover:bg-gray-300 hover:bg-opacity-10 p-3 items-center text-2xl m-2 cursor-pointer">
                        <FiMoreHorizontal className="icon" />
                        <span className="hidden xl:block ml-4">Más opciones</span>
                    </li>
                </ul>
            </div>
            <div className="hidden sm:block mb-4 xl:ml-24">
                <ProfileLink />
            </div>
        </nav>
    );
};
