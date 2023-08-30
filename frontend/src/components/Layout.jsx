import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Sidebar } from "./Sidebar";
import { Search } from "./Search";

export const Layout = () => {

    return (
        <>
            <Toaster/>
            <div className="flex justify-center min-h-screen">
                <div className="w-16 xl:w-[22rem]">
                    <Sidebar/>
                </div>
                <main className="flex-1 max-w-[600px] border-[1px] border-neutral-800">
                    <Outlet/>
                </main>
                <div className="hidden md:block lg:w-[28rem] ml-4">
                    <Search/>
                </div>
            </div>
        </>
    );
};
