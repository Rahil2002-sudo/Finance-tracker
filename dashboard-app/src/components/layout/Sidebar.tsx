import { Home, Wallet, CreditCard, PiggyBank, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Wallet, label: 'My Wallet', active: false },
    { icon: PiggyBank, label: 'Transfers', active: false },
    { icon: CreditCard, label: 'Bill', active: false },
    // Additional placeholders as per design inspiration
    { icon: Settings, label: 'Settings', active: false },
];

export const Sidebar = () => {
    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-card m-4 rounded-2xl border-r-0 z-50">
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    $
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                    FinDash
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className={clsx(
                            "flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-300 group",
                            item.active
                                ? "bg-gradient-to-r from-emerald-500/80 to-green-600/80 text-white shadow-lg shadow-emerald-500/20"
                                : "text-emerald-100/60 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className={clsx("w-5 h-5", item.active ? "text-white" : "text-emerald-200/60 group-hover:text-white")} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4">
                <button className="flex items-center gap-4 w-full p-4 rounded-xl text-emerald-200/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
