import PropTypes from "prop-types";

export const ModalEditProfile = ({ children }) => {

    return (
        <div className="fixed grid top-0 left-0 w-full h-full bg-[#242424] bg-opacity-60 z-20">
            <div className="absolute place-self-center">
                <div className="modal-box bg-black h-[44rem] w-[38rem] rounded-xl">
                    {children}
                </div>
            </div>
        </div>
    );
};

ModalEditProfile.propTypes = {
    children: PropTypes.node.isRequired,
};
