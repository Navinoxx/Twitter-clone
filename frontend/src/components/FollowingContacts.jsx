import { ContactCard } from "./ContactCard";

export function FollowingContacts({ data }) {

    return (
        data?.map((contact) => (
            <ContactCard contact={contact} key={contact.username}/>
        ))
    );
}