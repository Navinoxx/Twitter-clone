import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userProfile, deleteUser } from "../api/users";
import { FiMoreHorizontal } from "react-icons/fi";
import { PiWarningBold } from "react-icons/pi";
import { Avatar } from "./Avatar";
import PropTypes from "prop-types";

export const ProfileLink = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const username = localStorage.getItem("username");
    const modalRef = useRef(null);

    const { data: user } = useQuery({
        queryKey: ["user", username],
        queryFn: () => userProfile(username),
    });

    const handleLogout = async () => {
        localStorage.clear();
        navigate("/");
    };

    const handleDeleteAccount = async () => {
        await deleteUser();
        queryClient.removeQueries("user");
        localStorage.clear();
        navigate("/");
    };

    const showModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <div className="dropdown max-sm:dropdown-end sm:dropdown-top">
            <div
                tabIndex={0}
                className="rounded-full flex text-2xl m-1 p-2 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer items-center"
            >
                <Avatar src={user?.avatar} />
                <div className="hidden xl:block mx-4">
                    <p className="text-sm font-bold w-36 truncate">{user?.name || user?.username}</p>
                    <p className="text-neutral-500 text-sm">@{user?.username}</p>
                </div>
                <div className="hidden xl:flex ml-auto">
                    <FiMoreHorizontal />
                </div>
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] menu p-2 rounded-box w-48 bg-black mb-2 ml-3 shadow-[0px_0px_15px_rgba(255,255,255,0.2)]">
                <button
                    className="btn btn-ghost py-2 rounded-lg"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
                <button
                    className="btn btn-ghost py-2 rounded-lg"
                    onClick={showModal}
                >
                    Borrar cuenta
                </button>
            </div>
            <Modal ref={modalRef} handleDeleteAccount={handleDeleteAccount}/>
        </div>
    );
};

const Modal = React.forwardRef(({ handleDeleteAccount }, ref) => {

    return (
        <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Eliminar mi cuenta</h3>
                <p className="py-4">Estás a punto de eliminar tu cuenta permanentemente. ¿deseas continuar?</p>
                <div className="modal-action">
                    <button className="btn" onClick={handleDeleteAccount}>
                        <PiWarningBold />
                        Eliminar
                    </button>
                    <button className="btn" onClick={() => ref.current.close()}>Cancelar</button>
                </div>
            </form>
        </dialog>
    );
});

Modal.displayName = 'Modal';
Modal.propTypes = {
    handleDeleteAccount: PropTypes.func.isRequired
}