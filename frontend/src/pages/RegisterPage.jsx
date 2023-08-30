import { useMutation } from "@tanstack/react-query";
import { register } from "../api/users";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { Loader } from "../components/Loader";
import * as Yup from 'yup';
import { CustomInputField } from "../components/CustomInputField";
import { useState } from "react";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate("/login");
            console.log("loginMutation success");
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.detail) {
                setErrorMessage(error.response.data.detail);
            }
        }
    });

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Campo requerido')
            .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
            .max(20, 'El nombre de usuario no puede tener más de 20 caracteres')
            .matches(/^[a-zA-Z0-9]+$/, 'El nombre de usuario solo puede contener letras y números'),
        email: Yup.string()
            .required('Campo requerido')
            .email('Correo electrónico inválido'),
        password: Yup.string()
            .required('Campo requerido')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(20, 'La contraseña no puede tener más de 20 caracteres')
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
                'La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un caracter especial'
            ),
        confirm_password: Yup.string()
            .required('Campo requerido')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    });

    if (registerMutation.isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader />
        </div>
    );    

    return (
        <main className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="m-5 p-10 bg-grey-3">
                <div className="w-[300px] max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
                    <div >
                        <BsTwitter
                        className="mx-auto text-sky-500 h-12 w-12"
                        />
                        <h2 className="mt-6 text-center text-3xl">
                        Regístrate en Twitter  
                        </h2>
                    </div>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirm_password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            registerMutation.mutate(values);
                        }}
                    >
                        <Form>
                            <CustomInputField id="username" name="username" placeholder="Nombre de usuario"/>
                            <CustomInputField id="email" name="email" placeholder="Correo electrónico"/>
                            <CustomInputField
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                            />
                            <CustomInputField
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirmar contraseña"
                            />
                            <button type="submit" className="btn btn-primary rounded-full w-full my-2 text-white">
                                Registrarse
                            </button>
                        </Form>
                    </Formik>
                    {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                        ¿Ya tienes una cuenta?
                            <Link to={"/login"}>
                                <span className="hover:text-sky-500 ml-2 transition-colors">
                                Inicia sesión!
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};


