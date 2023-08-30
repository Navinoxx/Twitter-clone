import { PropTypes } from "prop-types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { updateProfile } from "../api/users";
import toast from "react-hot-toast";
import { ModalEditProfile } from './ModalEditProfile';
import { TbCameraUp } from "react-icons/tb";
import { useState } from "react";

export const EditProfile = ({ user, showModal, setShowModal }) => {
    const queryClient = useQueryClient();
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user", user.username] });
            toast.success("Perfil actualizado con éxito");
        },
        onError: (error) => {   
            toast.error(error.message);
        },
    });

    const closeModal = () => {
        setShowModal(false);
        setPreviewAvatar(user.avatar)
        setPreviewCoverImage(user.cover_image)
        formik.resetForm()  
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            bio: '',
            avatar: null,
            cover_image: null,
        },
        onSubmit: (values) => { 
            const { name, bio, avatar, cover_image } = values
            const formData = new FormData()
            if (values.name) {
                formData.append("name", name);
            }
            if (values.bio) {
                formData.append("bio", bio);
            }
            if (values.avatar) {
                formData.append("avatar", avatar);
            }
            if (values.cover_image) {
                formData.append("cover_image", cover_image);
            }
            updateProfileMutation.mutate(formData)
            closeModal()
        },  
    })      

    const [previewCoverImage, setPreviewCoverImage] = useState(user.cover_image);
    const handlePreviewCoverImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewCoverImage(reader.result);
            };
        }
    }

    const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewAvatar(reader.result);
            };
        }
    }

    return (
        <>
        {showModal && (
            <ModalEditProfile
            setShowModal={setShowModal}
            >   
                <div className="flex gap-5">
                    <button className="btn btn-sm btn-circle btn-ghost text-white" onClick={closeModal}>
                        ✕
                    </button>
                    <h2 className="text-2xl text-grey">Editar perfil</h2>
                </div>
                    <form onSubmit={formik.handleSubmit} className="mt-5">
                        <div className="inline-flex place-items-center justify-center">
                            <img className="bg-black h-[16rem] w-full" src={previewCoverImage} />
                            <label htmlFor="cover_image" className="btn glass opacity-70 btn-circle absolute">
                                <TbCameraUp/>
                            </label>
                            <input
                            type="file"
                            id="cover_image"
                            name="cover_image"
                            className="hidden"
                            onChange={(e) => {
                                handlePreviewCoverImage(e);
                                formik.setFieldValue("cover_image", e.currentTarget.files[0])}}
                        />
                        </div>
                        <div className="inline-flex place-items-center justify-center ml-7 -mt-16">
                            <div className="avatar">
                                <div className="w-28 bg-black rounded-full">
                                    <img src={previewAvatar} />
                                </div>
                            </div>
                            <label htmlFor="avatar" className="btn glass btn-xs opacity-70 btn-circle absolute">
                                <TbCameraUp/>
                            </label>
                            <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            className="hidden"
                            onChange={(e) => {
                                handlePreviewAvatar(e);
                                formik.setFieldValue("avatar", e.currentTarget.files[0]);
                            }}
                        />
                        </div>
                        <input
                            id="name"
                            name="name"
                            placeholder="Tú nombre"
                            onChange={formik.handleChange} value={formik.values.name}
                            className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800"
                        />
                        <input
                            id="bio"
                            name="bio"
                            placeholder="Sobre mí"
                            onChange={formik.handleChange} value={formik.values.bio}
                            className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800"
                        />
                        <button
                            type="submit"
                            className="btn btn-outline rounded-full font-bold w-full mt-5"
                            disabled={updateProfileMutation.isLoading}
                        >
                            {updateProfileMutation.isLoading ? 'Guardando cambios...' : 'Guardar cambios'}
                        </button>
                    </form>
            </ModalEditProfile>
        )}
        </>
    );
};

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
};
