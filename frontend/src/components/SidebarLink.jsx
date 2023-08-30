import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const SidebarLink = ({ icon, text, link, onClick }) => {

    return (
        <Link to={link} onClick={onClick} className="rounded-full flex text-2xl p-4 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer items-center">
            {icon}
            <span className="hidden xl:inline ml-4">{text}</span>
        </Link>
    );
};

SidebarLink.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
}