import { useQuery } from "@tanstack/react-query";
import { getUnreadChats } from "../api/chat";
import PropTypes from "prop-types";

export const MessagesIcon = ({ children }) => {
    const { data: hasUnreadMessages  } = useQuery({
        queryKey: ["has_unread_messages"],
        queryFn: getUnreadChats,
    })

    return (
        hasUnreadMessages?.has_unread_messages > 0 ? (
            <div className="indicator">
                <span className="indicator-item badge badge-primary badge-xs"></span>
                {children}
            </div>
        ) : children
    )
}

MessagesIcon.propTypes = {
    children: PropTypes.node.isRequired,
}