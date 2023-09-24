import { ContactCard } from "./ContactCard";

export function FollowersContacts({data}) {

    return (
        data?.map((contact) => (
            <ContactCard contact={contact} key={contact.username}/>
        ))
    );
}