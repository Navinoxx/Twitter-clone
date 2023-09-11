import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FollowBtn } from "./FollowBtn";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../api/users";

export function ContactCard({contact}) {
    const username = contact.username

    const {data: user} = useQuery({
        queryKey: ["user", username],
        queryFn: () => userProfile(username),
    })

    return (
        <> 
            <div className="flex justify-between border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
                <Link to={`/profile/${contact.username}`}>
                    <div className="flex flex-row items-start gap-3">
                        <div className="avatar">
                            <div className="w-11 bg-black rounded-full">
                                <img src={`${contact.avatar}`} />
                            </div>
                        </div>
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
                <div className="place-self-center">
                    <FollowBtn user={user}/>
                </div>
            </div>
        </>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object,
}
