import { ContactCard } from "./ContactCard";

export function FollowersContacts({data}) {
    
    return (
        data?.followed_usernames?.map((contact) => (
            <ContactCard contact={contact} key={contact.username}/>
        ))
    );
}