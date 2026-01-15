import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../ui/Card';
import { format, parseISO } from 'date-fns';

export const BurnRateBar = () => {
    const { transactions } = useDashboard();

    // Group by Month
    const monthlyData = transactions.reduce((acc, curr) => {
        const month = format(parseISO(curr.date), 'MMM');
        if (!acc[month]) acc[month] = { name: month, income: 0, expense: 0 };
        if (curr.type === 'income') acc[month].income += curr.amount;
        else acc[month].expense += curr.amount;
        return acc;
    }, {} as Record<string, { name: string; income: number; expense: number }>);

    const data = Object.values(monthlyData);

    if (data.length === 0) {
        return (
            <Card className="h-96 flex items-center justify-center">
                <p className="text-gray-400">No transaction data to display</p>
            </Card>
        );
    }

    return (
        <Card className="h-96 w-full" delay={0.3}>
            <h3 className="text-lg font-bold mb-4">Monthly Income vs Burn Rate</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#A0AEC0" />
                    <YAxis stroke="#A0AEC0" />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                    />
                    <Bar dataKey="income" fill="#4B5563" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="expense" fill="#F87171" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
