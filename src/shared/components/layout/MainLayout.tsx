import { Outlet } from 'react-router-dom';
import { NavBar } from '../molecular/NavBar';
import { Toaster } from 'sonner';


export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">
                <Outlet />
                <Toaster position="top-right" richColors /> 
            </main>
        </div>
    );
}