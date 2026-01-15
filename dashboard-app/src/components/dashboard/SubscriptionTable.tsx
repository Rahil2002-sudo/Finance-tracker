import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../ui/Card';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { AlertCircle, CheckCircle, Trash2 } from 'lucide-react'; // Import Trash icon

export const SubscriptionTable = () => {
    // Get deleteSubscription from context
    const { subscriptions, deleteSubscription } = useDashboard();

    return (
        <Card className="w-full overflow-hidden" delay={0.4}>
            {/* ... Header code remains same ... */}
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 border-b border-white/10">
                            <th className="py-3 px-4">Service</th>
                            <th className="py-3 px-4">Cost</th>
                            <th className="py-3 px-4">Last Payment</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Action</th> {/* Add Action Header */}
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    No subscriptions found.
                                </td>
                            </tr>
                        ) : (
                            subscriptions.map((sub) => (
                                <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 font-medium">{sub.name}</td>
                                    <td className="py-3 px-4">${sub.cost}</td>
                                    <td className="py-3 px-4 text-gray-300">
                                        {format(parseISO(sub.lastPaymentDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="py-3 px-4">
                                         {/* ... Status span code remains same ... */}
                                         <span
                                            className={clsx(
                                                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold",
                                                sub.status === 'forgotten'
                                                    ? "bg-red-500/20 text-red-300WQ border border-red-500/30"
                                                    : "bg-green-500/20 text-green-300 border border-green-500/30"
                                            )}
                                        >
                                            {sub.status === 'forgotten' ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                                            {sub.status === 'forgotten' ? 'Forgotten?' : 'Active'}
                                        </span>
                                    </td>
                                    {/* Add Delete Button Cell */}
                                    <td className="py-3 px-4">
                                        <button 
                                            onClick={() => deleteSubscription(sub.id)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                            title="Remove Subscription"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
