import React, { useState } from "react";
import { MyTweets } from "../components/MyTweets";
import { MyLikes } from "../components/MyLikes";
import { MyRe } from "../components/MyRe";
import { MyMedia } from "../components/MyMedia";
import PropTypes from "prop-types";

export const ProfileTabs = ( { user, tweets, myUser }) => {
    const [selected, setSelected] = useState(0);
    
    const tabs = [
        { title: 'Posts', Component: <MyTweets user={user} tweets={tweets} myUser={myUser} /> },
        { title: 'Respuestas', Component: <MyRe user={user} /> },
        { title: 'Fotos y videos', Component: <MyMedia tweets={tweets} /> },
        { title: 'Me gusta', Component: <MyLikes user={user} /> },
    ];

    const handleTab = (index) => {
        setSelected(index);
    }   

    return (
        <>
            <div role="tablist" className="tabs tabs-bordered tabs-lg grid-cols-4 mt-5">
                {tabs.map(({ title }, index) => (
                    <React.Fragment key={index}>
                        <input
                            type="radio"
                            id={`tab${index}`}
                            name="my_tabs_1"
                            className="tab hover:bg-neutral-900 text-nowrap static"
                            aria-label={title}
                            checked={selected === index}
                            onChange={() => handleTab(index)}
                        />
                    </React.Fragment>
                ))}
            </div>
            {tabs[selected].Component}
        </>
    );
}

ProfileTabs.propTypes = {
    user: PropTypes.object.isRequired,
    tweets: PropTypes.array.isRequired,
    myUser: PropTypes.string.isRequired,
}