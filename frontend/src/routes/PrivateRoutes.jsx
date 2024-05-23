import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    const token = localStorage.getItem('access') || undefined;

    return token ? <Outlet /> : <Navigate to="/" replace />;
}
