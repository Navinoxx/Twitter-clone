import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/users";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { Loader } from "../components/Loader";
import { CustomInputField } from "../components/CustomInputField";
import * as Yup from 'yup';
import { useState } from "react";

export const LoginPage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [errorMessage, setErrorMessage] = useState('');

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries("tweets")
            navigate("/home")
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.detail) {
                setErrorMessage('Email o contraseña incorrectos, por favor intenta de nuevo.');
            } else {
                setErrorMessage('Ha ocurrido un error durante el inicio de sesión.');
            }
        }
    })

    const validationSchema = Yup.object().shape({
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
    });

    if (loginMutation.isLoading) return (
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
                        Inicia sesión en Twitter  
                        </h2>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            setErrorMessage('');
                            loginMutation.mutate(values);
                        }}
                    >
                        <Form>
                            <CustomInputField id="email" name="email" placeholder="Correo electrónico"/>
                            <CustomInputField type="password" id="password" name="password" placeholder="Contraseña"/>
                            <button type="submit" className="btn btn-primary rounded-full w-full my-2 text-white">
                                Entrar
                            </button>
                        </Form>
                    </Formik>
                    {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                        ¿No tienes una cuenta? 
                            <Link to={"/register"}>
                                <span className="hover:text-sky-500 ml-2 transition-colors">
                                Regístrate
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
