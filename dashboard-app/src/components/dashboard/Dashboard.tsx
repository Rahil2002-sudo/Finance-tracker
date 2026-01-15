import { useDashboard } from '../../context/DashboardContext'; // Import context
import { WalletForm } from './WalletForm';
import { ExpensesDoughnut } from './ExpensesDoughnut';
import { BurnRateBar } from './BurnRateBar';
import { SubscriptionTable } from './SubscriptionTable';

export const Dashboard = () => {
    const { transactions } = useDashboard(); // Get data

    // Calculate Balance
    const totalBalance = transactions.reduce((acc, curr) => {
        return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <WalletForm />

                {/* Dynamic Balance Card */}
                <div className="glass-card p-4 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Total Balance</p>
                        <h3 className="text-2xl font-bold">
                            ${totalBalance.toFixed(2)}
                        </h3>
                    </div>
                    {/* Make this button focus the input for Income */}
                    <button 
                        onClick={() => document.querySelector('input')?.focus()} 
                        className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition"
                        title="Add Transaction"
                    >
                        +
                    </button>
                </div>
            </div>

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
