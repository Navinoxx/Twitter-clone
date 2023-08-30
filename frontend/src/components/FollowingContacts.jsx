import { ContactCard } from "./ContactCard";

export function FollowingContacts({data}) {

    return (
        data?.following_usernames?.map((contact) => (
            <ContactCard contact={contact} key={contact.username}/>
        ))
    );
}