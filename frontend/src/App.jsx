import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Home } from "./pages/Home";
import { RegisterPage } from "./pages/RegisterPage";
import { Layout } from "./components/Layout";
import { Tweet } from "./pages/Tweets";
import { UserProfile } from "./pages/UserProfile";
import { Feed } from "./pages/Feed";
import { Notifications } from "./pages/Notifications";
import { Chat } from "./pages/Chat";
import { Contacts } from "./pages/Contacts";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Lists } from "./pages/Lists";
import { Bookmarked } from "./pages/Bookmarked";
import { Messages } from "./pages/Messages";
import { FollowingContacts } from "./components/FollowingContacts";
import { FollowersContacts } from "./components/FollowersContacts";

function App() {
    const isAutenticated = !!localStorage.getItem('access');
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAutenticated ? <Navigate to="/home" /> : <Home />} />
                <Route path="/" element={<Layout />}>
                    <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<Feed />} />
                    <Route path="/tweet/:id" element={<Tweet />} />
                    <Route path="/profile/:username" element={<UserProfile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/chat/:user" element={<Chat />} />
                    <Route path="/contacts" element={<Contacts />}>
                        <Route index element={<FollowersContacts />} />
                        <Route path="following" element={<FollowingContacts />} />
                        <Route path="followers" element={<FollowersContacts />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="/bookmarks" element={<Bookmarked />} />
                    </Route>
                </Route>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App