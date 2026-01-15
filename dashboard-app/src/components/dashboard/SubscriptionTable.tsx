import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../ui/Card';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const SubscriptionTable = () => {
    const { subscriptions } = useDashboard();

    return (
        <Card className="w-full overflow-hidden" delay={0.4}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Subscription Auditor</h3>
                <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {subscriptions.length} Active
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 border-b border-white/10">
                            <th className="py-3 px-4">Service</th>
                            <th className="py-3 px-4">Cost</th>
                            <th className="py-3 px-4">Last Payment</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-500">
                                    No subscriptions found.
                                </td>
                            </tr>
                        ) : (
                            subscriptions.map((sub, _idx) => (
                                <tr
                                    key={sub.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-3 px-4 font-medium">{sub.name}</td>
                                    <td className="py-3 px-4">${sub.cost}</td>
                                    <td className="py-3 px-4 text-gray-300">
                                        {format(parseISO(sub.lastPaymentDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={clsx(
                                                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold",
                                                sub.status === 'forgotten'
                                                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                                    : "bg-green-500/20 text-green-300 border border-green-500/30"
                                            )}
                                        >
                                            {sub.status === 'forgotten' ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                                            {sub.status === 'forgotten' ? 'Forgotten?' : 'Active'}
                                        </span>
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
