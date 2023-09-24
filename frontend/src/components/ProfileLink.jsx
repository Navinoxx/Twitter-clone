import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userProfile, deleteUser } from "../api/users";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PiWarningBold } from "react-icons/pi";
import PropTypes from "prop-types";

export const ProfileLink = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const queryClient = useQueryClient();

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

    return (
        <div className="dropdown dropdown-top w-full">
            <div
                tabIndex={0}
                className="rounded-full flex text-2xl m-1 p-2 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer items-center"
            >
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.avatar} alt="User Avatar"/>
                    </div>  
                </div>
                <div className="hidden xl:block mx-4">
                    <p className="text-sm">{user?.name || user?.username}</p>
                    <p className="text-neutral-500 text-sm">@{user?.username}</p>
                </div>
                <div className="hidden xl:flex ml-auto">
                    <FiMoreHorizontal />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 rounded-box w-52 border-[1px] bg-black border-neutral-800 mb-2 ml-3 shadow-[0_0px_5px_1px_rgba(255,255,255)] shadow-neutral-50">
                <button
                className="hover:bg-blue-300 hover:bg-opacity-10 py-2 rounded-lg"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
                <button
                    className="hover:bg-blue-300 hover:bg-opacity-10 py-2 rounded-lg"
                    onClick={()=>window.my_modal_1.showModal()}
                >
                    Borrar cuenta
                </button>
            </ul>
            <Modal handleDeleteAccount={handleDeleteAccount}/>
        </div>
    );
};

const Modal = ({handleDeleteAccount}) => {

    return (    
        <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Eliminar mi cuenta</h3>
                <p className="py-4">Estas a punto de eliminar tu cuenta permanentemente, deseas continuar?</p>
                <div className="modal-action">
                    <button className="btn" onClick={handleDeleteAccount}>
                        <PiWarningBold/>
                        Eliminar
                    </button>
                    <button className="btn">Cancelar</button>
                </div>
            </form>
        </dialog>
    );
};

Modal.propTypes = {
    handleDeleteAccount: PropTypes.func.isRequired
}