import { PropTypes } from "prop-types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { updateProfile } from "../api/users";
import toast from "react-hot-toast";
import { ModalEditProfile } from './ModalEditProfile';
import { TbCameraUp } from "react-icons/tb";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../utils/UploadToCloudinary";

export const EditProfile = ({ user, showModal, setShowModal }) => {
    const [previewCoverImage, setPreviewCoverImage] = useState(user.cover_image);
    const [previewAvatar, setPreviewAvatar] = useState(user.avatar);

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
            avatar: '',
            cover_image: '',
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

                if (values.avatar && values.avatar !== previewAvatar) {
                    const { secure_url, public_id } = await uploadToCloudinary(
                        avatar,
                        'users',
                        user.username,
                    );
                    formData.append('avatar', secure_url);
                    formData.append('avatar_public_id', public_id);
                    localStorage.setItem('avatar', secure_url);
                }

                if (values.cover_image && values.cover_image !== previewCoverImage) {
                    const { secure_url, public_id } = await uploadToCloudinary(
                        cover_image,
                        'users',
                        user.username,                                     
                    );
                    formData.append('cover_image', secure_url);
                    formData.append('cover_image_public_id', public_id);
                }

                updateProfileMutation.mutate(formData);
                closeModal();
            } catch (error) {
                console.error(error);
                toast.error('Error al actualizar el perfil');
            }
        },
    });
    
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

    useEffect(() => {
        setPreviewAvatar(user.avatar);
    }, [user.avatar]);

    useEffect(() => {
        setPreviewCoverImage(user.cover_image);
    }, [user.cover_image]);

    return (
        showModal && (
            <ModalEditProfile setShowModal={setShowModal}>
                <div className="flex gap-5">
                    <button
                    className="btn btn-sm btn-circle btn-ghost text-white"
                    onClick={closeModal}
                    >
                    ✕
                    </button>
                    <h2 className="text-2xl text-grey">Editar perfil</h2>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-5">
                    <div className="inline-flex place-items-center justify-center w-full">
                        <img
                            className="bg-black h-[16rem] w-full object-cover"
                            src={previewCoverImage}
                        />
                        <label
                            htmlFor="cover_image"
                            className="btn glass opacity-70 btn-circle absolute"
                        >
                            <TbCameraUp />
                        </label>
                        <input
                            type="file"
                            id="cover_image"
                            name="cover_image"
                            className="hidden"
                            onChange={(e) => {
                                handlePreviewCoverImage(e);
                                formik.setFieldValue("cover_image", e.currentTarget.files[0]);
                            }}
                        />
                    </div>
                    <div className="inline-flex place-items-center justify-center ml-7 -mt-16">
                        <div className="avatar">
                            <div className="w-28 bg-black rounded-full ring ring-black">
                                <img src={previewAvatar} />
                            </div>
                        </div>
                        <label
                            htmlFor="avatar"
                            className="btn glass btn-xs opacity-70 btn-circle absolute"
                        >
                            <TbCameraUp />
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
                    <div className="bg-black py-4 rounded-lg">
                        <div className="relative bg-inherit">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-1 px-2 ring-neutral-800 focus:ring-sky-600 focus:outline-none"
                                maxLength={25}
                                autoComplete="off"
                            />
                            <label
                                htmlFor="username"
                                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                            >
                                Nombre
                            </label>
                        </div>
                    </div>
                    <div className="bg-black py-4 rounded-lg">
                        <div className="relative bg-inherit">
                            <textarea
                            id="bio"
                            name="bio"
                            placeholder="Biografía"
                            onChange={formik.handleChange}
                            value={formik.values.bio}
                            className="peer bg-transparent w-full rounded-lg text-gray-200 placeholder-transparent ring-1 px-2 pt-2 ring-neutral-800 focus:ring-sky-600 focus:outline-none resize-none"
                            maxLength={250}
                            autoComplete="off"
                            rows={5}
                            />
                            <label
                                htmlFor="bio"
                                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                            >
                                Biografía
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-white text-black hover:bg-slate-300 rounded-full font-bold float-end mt-2 px-4 py-2 cursor-pointer disabled:bg-opacity-50"
                        disabled={
                            formik.isSubmitting || formik.initialValues === formik.values
                        }
                    >
                    {formik.isSubmitting ? (
                        <>
                            <span className="loading loading-spinner">Guardando</span>
                            <span className="pl-2">Guardando</span>
                        </>
                    ) : (
                        "Guardar"   
                    )}
                    </button>
                </form>
            </ModalEditProfile>
        )
    );
};

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
};
