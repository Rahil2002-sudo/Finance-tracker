import { WalletForm } from './WalletForm';
import { ExpensesDoughnut } from './ExpensesDoughnut';
import { BurnRateBar } from './BurnRateBar';
import { SubscriptionTable } from './SubscriptionTable';

export const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Wallet Entry */}
            <div className="lg:col-span-1 space-y-6">
                <WalletForm />

                {/* Placeholder for Quick Transfer or Stats */}
                <div className="glass-card p-4 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Total Balance</p>
                        <h3 className="text-2xl font-bold">$12,450.00</h3>
                    </div>
                    <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition">+</button>
                </div>
            </div>

            {/* Middle/Right Column: Charts & Tables */}
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ExpensesDoughnut />
                    <BurnRateBar />
                </div>
                <SubscriptionTable />
            </div>
        </div>
    );
};
