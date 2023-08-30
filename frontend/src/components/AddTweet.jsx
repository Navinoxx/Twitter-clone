import { PropTypes } from "prop-types";
import { addTweet } from "../api/tweets"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { BsImage } from "react-icons/bs";
import { useEffect, useState } from "react";
import { userProfile } from "../api/users";

export const AddTweet = () => {
    const queryClient = useQueryClient();
    const username = localStorage.getItem("username");
    
    const {
        data: user
    } = useQuery({
        queryKey: ["user", username],
        queryFn: () => userProfile(username),
    });

    const addTweetMutation = useMutation({
        mutationFn: addTweet,
        onSuccess: () => {
        queryClient.invalidateQueries("tweets");
        toast.success("Tweet añadido!");
        },
        onError: () => {
        toast.error("Algo a salido mal!");
        },
    });

    const iniV = {
        content: "",
        image: "",
    };

    const formik = useFormik({
        initialValues: iniV,
        onSubmit: (values, { resetForm }) => {
        const { content, image } = values;
        const formData = new FormData();

        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }
        addTweetMutation.mutate(formData);
        resetForm({ values: iniV });
        },
    });

    return (
        <div className="border-[1px] border-neutral-800">
            <form onSubmit={formik.handleSubmit}>
                <div
                className="flex gap-3 w-full py-6 ml-2">
                    <div className="avatar">
                        <div className="w-14 bg-black rounded-full">
                            <img src={user?.avatar} />
                        </div>
                    </div>
                    <textarea
                        type="text"
                        name="content"
                        onChange={formik.handleChange}
                        value={(formik.values.content)} 
                        className="bg-transparent grow outline-none resize-none scroll-none"
                        placeholder="¡¿Que está pasando?!"
                    />
                </div>
                <div className="flex justify-center items-center">
                    {formik.values.image && <SeeImage file={formik.values.image} onClose={() => formik.setFieldValue("image", "")}/>}
                </div>
                <div className="flex justify-between p-3 border-t-[1px] border-neutral-800 mx-12">
                    <div className="flex my-auto">
                        <label htmlFor="file-input" className="btn btn-circle btn-outline btn-sm border-none hover:bg-sky-500 hover:bg-opacity-10">
                        {!formik.values.image && (
                            <BsImage className="flex transition text-sky-500"/>
                        )}
                        </label>
                        <input
                        id="file-input"
                        className="hidden"
                        type="file"
                        name="image"
                        onChange={(event) =>
                            formik.setFieldValue("image", event.currentTarget.files[0])
                        }
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm rounded-full text-white"
                        disabled={!formik.values.content && !formik.values.image}
                    >
                        Postear
                    </button>
                </div>
            </form>
        </div>
    );
};

const SeeImage = ({ file, onClose }) => {
    const [preview, setPreview] = useState(null);

    const handleClose = () => {
        setPreview(null);
        onClose();
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result);
            };
        }
    }, [file]);

    return (
        <div className="flex justify-end">
            <div className="absolute">
                <button type="button" className="btn btn-ghost btn-xs rounded-full m-1" onClick={handleClose}>
                    x
                </button>
            </div>
            {
                preview && <img src={preview} className="max-w-[20rem] rounded-md" />
            }
        </div>
    );
};


SeeImage.propTypes = {
    file: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};