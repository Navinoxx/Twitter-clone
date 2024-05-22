import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Sidebar } from "../components/Sidebar";
import { Search } from "../components/Search";

export const Layout = () => {

    return (
        <>
            <Toaster/>
            <header className="hidden sm:block w-16 xl:w-[23rem]">
                <Sidebar/>
            </header>
            <main className="flex-1 max-w-[38rem] sm:border-[1px] border-neutral-800 overflow-x-hidden">
                <Outlet/>
            </main>
            <aside className="hidden lg:block lg:w-[28rem] ml-4">
                <Search/>
            </aside>
            <footer className="sm:hidden fixed bottom-0 w-full h-16 bg-black border-t-[1px] border-neutral-800">
                <Sidebar />
            </footer>
        </>
    );
};
