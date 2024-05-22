import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addComment } from "../api/tweets";
import { Loader } from "./Loader";
import PropTypes from "prop-types";
import { Avatar } from "./Avatar";

export const AddComment = ({ tweet }) => {  
    const queryClient = useQueryClient()
    const avatar = localStorage.getItem('avatar')

    const addCommmentMutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries('comments')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const iniV = () => ({
        body: ''
    })

    const formik = useFormik({
        initialValues: iniV(),
        onSubmit: (values, { resetForm }) => {
        addCommmentMutation.mutate({ ...values, id: tweet.id })
        resetForm()
        }
    })

    if (addCommmentMutation.isLoading) return <Loader />

    return (
        <div className="border-b-[1px] border-neutral-800 p-5">
            <form onSubmit={formik.handleSubmit} >
                <div className="flex gap-3 w-full">
                    <Avatar src={avatar} />
                    <input 
                        type="text" name="body" onChange={formik.handleChange} value={formik.values.body} autoComplete="off"
                        className="bg-transparent grow outline-none" placeholder="Postea tu respuesta" />
                </div>
                <div className="flex justify-end mt-4">
                    <button type="submit" className="btn btn-primary btn-sm rounded-full text-white" disabled={!formik.values.body}>
                        Responder
                    </button>   
                </div>
            </form>
        </div>
    );
};

AddComment.propTypes = {
    tweet: PropTypes.object.isRequired
};