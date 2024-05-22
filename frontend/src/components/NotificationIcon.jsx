import { useQuery } from "@tanstack/react-query";
import { getUnreadNotifications } from "../api/notifications";
import PropTypes from "prop-types";

export const NotificationIcon = ({ children }) => {
    const { data: unreadNotifications } = useQuery({
        queryKey: ["noti", "unread"],
        queryFn: getUnreadNotifications,
    });

    return (
        unreadNotifications?.length > 0 ? (
            <div className="indicator">
                <span className="indicator-item badge badge-primary badge-xs"></span>
                {children}
            </div>
        ) : children
    )
}

NotificationIcon.propTypes = {
    children: PropTypes.node.isRequired,
}