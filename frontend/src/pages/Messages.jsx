import { Link } from "react-router-dom";
import { userProfile } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { TitleFeed } from "../components/TitleFeed";
import { getUnreadMessages } from "../api/chat";
import { Avatar } from "../components/Avatar";
import PropTypes from "prop-types";

export const Messages = () => {
    const myUser = localStorage.getItem("username");

    const { data: userData } = useQuery({
        queryKey: ["contacts", myUser],
        queryFn: () => userProfile(myUser),
    });

    const contacts = [...(userData?.followed_usernames ?? []), ...(userData?.following_usernames ?? [])];
    const uniqueContacts = contacts.filter((contact, index, self) => index === self.findIndex((c) => c.username === contact.username));

    return (
        <>
            <TitleFeed title="Mensajes"/>
            {uniqueContacts.map((contact, index) => (
                <ContactItem key={index} contact={contact} />
            ))}
        </>
    );
};

function ContactItem({ contact }) {
    const { data: unreadNotifications } = useQuery({
        queryKey: ["unread_count", contact.username],
        queryFn: () => getUnreadMessages(contact.username),
    });
    
    return (
        <Link to={`/chat/${contact.username}`} key={contact.username}>
            <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900">
                <div className="flex flex-row items-start gap-3">
                    <Avatar src={contact.avatar} />
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                            <p className="text-white font-semibold hover:underline">
                                {contact?.name || contact?.username}
                            </p>
                            <span className="text-neutral-500 hover:underline md:block">
                                @{contact.username}   
                            </span>
                        </div>
                        <p className={unreadNotifications?.unread_count > 0 ? "text-white" : "text-neutral-500"}>
                            {unreadNotifications?.unread_count > 0 ? (
                                unreadNotifications?.last_unread_message.message
                            ) : "No tienes nuevos mensajes"}
                        </p>  
                    </div>
                    {unreadNotifications?.unread_count > 0 &&
                        <div className="badge badge-primary badge-lg text-white">{unreadNotifications?.unread_count}</div>}
                </div>
            </div>
        </Link>
    );
}

ContactItem.propTypes = {
    contact: PropTypes.object,
}



