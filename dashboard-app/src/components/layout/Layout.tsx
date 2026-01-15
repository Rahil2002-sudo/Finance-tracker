import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen w-full text-white relative flex">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                {/* Top Header Placeholder */}
                <header className="flex justify-between items-center mb-8 glass-card p-4 md:bg-transparent md:glass-card-none md:p-0 md:border-none md:shadow-none">
                    <div>
                        <h2 className="text-2xl font-bold">Hello, User</h2>
                        <p className="text-gray-400 text-sm">Welcome back to your wallet</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-white/20">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
};
