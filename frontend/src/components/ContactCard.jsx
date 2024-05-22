import { Link } from "react-router-dom";
import { FollowBtn } from "./FollowBtn";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../api/users";
import { Avatar } from "./Avatar";
import PropTypes from "prop-types";

export function ContactCard({ contact }) {
    const myUser = localStorage.getItem("username");
    const username = contact.username

    const {data: user} = useQuery({
        queryKey: ["user", username],
        queryFn: () => userProfile(username),
    })

    return (
        <div className="flex justify-between p-5 cursor-pointer hover:bg-neutral-900 transition">
            <Link to={`/${contact.username}`}>
                <div className="flex flex-row items-start gap-3">
                    <Avatar src={contact.avatar} />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-white font-semibold hover:underline">
                                {contact.name || contact.username}
                            </p>
                            <span className="text-neutral-500 hover:underline md:block">
                                @{contact.username}
                            </span>
                        </div>
                        <p className="text-neutral-500 break-words">
                            {contact.bio}
                        </p>
                    </div>
                </div>
            </Link>
            {myUser !== contact.username && (
                <div className="place-self-center">
                    <FollowBtn user={user}/>
                </div>
            )}
        </div>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object,
}
