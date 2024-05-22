import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const SidebarLink = ({ icon, text, link, onClick }) => {

    return (
        <Link to={link} onClick={onClick} className="text-2xl m-2">
            <li className="rounded-full hover:bg-gray-300 hover:bg-opacity-10 flex p-3 items-center">
                {icon}
                <span className="hidden xl:block ml-4">{text}</span>
            </li>
        </Link>
    );
};

SidebarLink.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
}