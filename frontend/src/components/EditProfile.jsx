import { PropTypes } from "prop-types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { updateProfile } from "../api/users";
import toast from "react-hot-toast";
import { ModalEditProfile } from './ModalEditProfile';
import { TbCameraUp } from "react-icons/tb";
import { useState } from "react";

const uploadToCloudinary = async (file, folder) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); 

        formData.append('folder', `users/${folder}`);

        const response = await fetch('https://api.cloudinary.com/v1_1/dk1wzv0od/image/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorMessage = `Error al subir la imagen a Cloudinary: ${response.status} - ${await response.text()}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        return { secure_url: data.secure_url, public_id: data.public_id };
    } catch (error) {
        console.error('Error en uploadToCloudinary:', error);
        throw error;
    }
    
};

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
            avatar: user.avatar,
            cover_image: user.cover_image,   
        },
        onSubmit: async (values) => {
            try {
                const { name, bio, avatar, cover_image } = values;
                const formData = new FormData();

                if (values.name) {
                    formData.append('name', name);
                }
                if (values.bio) {
                    formData.append('bio', bio);
                }

                if (values.avatar) {
                    const { secure_url, public_id } = await uploadToCloudinary(
                        avatar,
                        user.username,
                    );
                    formData.append('avatar', secure_url);
                    formData.append('avatar_public_id', public_id);
                    localStorage.setItem('avatar', secure_url);
                }

                if (values.cover_image) {
                    const { secure_url, public_id } = await uploadToCloudinary(
                        cover_image,
                        user.username,                                     
                    );
                    formData.append('cover_image', secure_url);
                    formData.append('cover_image_public_id', public_id);
                }

                updateProfileMutation.mutate(formData);
                closeModal();
            } catch (error) {
                console.error(error);
                toast.error('Error al cargar la imagen');
            }
        },
    });

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
    };

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
    };

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
                        <div className="inline-flex place-items-center justify-center w-full">
                            <img className="bg-black h-[16rem] w-full object-cover" src={previewCoverImage} />
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
