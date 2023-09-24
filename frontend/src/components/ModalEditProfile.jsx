import PropTypes from "prop-types";

export const ModalEditProfile = ({ children }) => {

    return (
        <div className="fixed grid top-0 left-0 w-full h-full bg-[#242424] bg-opacity-50 z-20">
            <div className="absolute place-self-center">
                <div className="modal-box bg-[#000000] h-[44rem] w-[38rem] rounded-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

ModalEditProfile.propTypes = {
    children: PropTypes.node.isRequired,
};
