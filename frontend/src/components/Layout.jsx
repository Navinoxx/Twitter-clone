import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Sidebar } from "./Sidebar";
import { Search } from "./Search";

export const Layout = () => {

    return (
        <>
            <Toaster/>
            <>
                <header className="w-16 xl:w-[23rem]">
                    <Sidebar/>
                </header>
                <main className="flex-1 max-w-[38rem] border-[1px] border-neutral-800">
                    <Outlet/>
                </main>
                <aside className="hidden md:block lg:w-[28rem] ml-4">
                    <Search/>
                </aside>
            </>
        </>
    );
};
