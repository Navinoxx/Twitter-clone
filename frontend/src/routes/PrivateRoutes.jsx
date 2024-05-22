import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    const userId = localStorage.getItem('user_id') || undefined;

    return userId ? <Outlet /> : <Navigate to="/home" replace />;
}
