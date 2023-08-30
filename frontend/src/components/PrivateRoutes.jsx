import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    const user = localStorage.getItem('user_id')

    return (
        user ? <Outlet/> : <Navigate to="/home" replace={true} />
    )
}
