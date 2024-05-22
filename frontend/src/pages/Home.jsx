import { ResponsiveImage } from "../components/ResponsiveImage";
import { Link } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";

export const Home = () => {

    return (
        <main className="md:flex md:flex-row-reverse items-center md:justify-start h-screen">
            <div className="py-20 md:py-40 px-5">
                <div className="pb-20">
                    <BsTwitter className="text-sky-500 h-12 w-12"/>
                </div>
                <p className="text-3xl md:text-6xl font-bold">Lo que está pasando ahora</p>
                <p className="font-bold my-5">Únete a Twitter hoy mismo.</p>
                <div className="inline-flex flex-col">
                    <Link to="/register">
                        <button className="btn btn-primary rounded-full w-full my-2 text-white">
                            Crear cuenta
                        </button>
                    </Link>
                    <p className="font-bold mt-20 my-5">¿Ya tienes una cuenta?</p>
                    <Link to="/login">
                        <button className="btn btn-primary rounded-full w-full my-2 text-white">
                            Iniciar sesión
                        </button>
                    </Link>
                </div>
            </div>
            <div className="relative object-cover md:h-screen">
                <ResponsiveImage />
                <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full">
                    <BsTwitter className="h-60 w-60"/>
                </div>
            </div>
        </main>
    );
};
