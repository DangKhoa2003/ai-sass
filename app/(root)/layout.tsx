import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Siderbar';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="root">
            <Sidebar />
            <MobileNav />
            <aside className="h-screen w-72 p-5"></aside>

            <div className="root-container">
                <div className="wrapper">{children}</div>
            </div>

            <Toaster />
        </main>
    );
};

export default Layout;
