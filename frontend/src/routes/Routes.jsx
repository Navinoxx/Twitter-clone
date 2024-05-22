import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Home } from "../pages/Home";
import { RegisterPage } from "../pages/RegisterPage";
import { Layout } from "../layout/Layout";
import { Tweet } from "../pages/Tweets";
import { UserProfile } from "../pages/UserProfile";
import { Feed } from "../pages/Feed";
import { Notifications } from "../pages/Notifications";
import { Chat } from "../pages/Chat";
import { PrivateRoutes } from "./PrivateRoutes";
import { Lists } from "../pages/Lists";
import { Bookmarked } from "../pages/Bookmarked";
import { Messages } from "../pages/Messages";
import { Contacts } from "../pages/Contacts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: localStorage.getItem('access') ? <Navigate to="/home" /> : <Home />
    },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    {
        element: <Layout />,
        children: [
            {
                element: <PrivateRoutes />,
                children: [
                    { path: "/home", element: <Feed /> },
                    { path: "/tweet/:id", element: <Tweet /> },
                    { path: "/notifications", element: <Notifications /> },
                    { path: "/chat/:user", element: <Chat /> },
                    { path: "/:username", element: <UserProfile /> },
                    { path: "/:username/following", element: <Contacts /> },
                    { path: "/:username/followers", element: <Contacts /> },
                    { path: "/messages", element: <Messages /> },
                    { path: "/lists", element: <Lists /> },
                    { path: "/bookmarks", element: <Bookmarked /> }
                ]
            }
        ]
    }
]);
