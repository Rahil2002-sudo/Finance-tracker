import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../ui/Card';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export const ExpensesDoughnut = () => {
    const { transactions } = useDashboard();

    const expenses = transactions.filter(t => t.type === 'expense');

    const dataMap = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.keys(dataMap).map(key => ({
        name: key,
        value: dataMap[key],
    }));

    if (data.length === 0) {
        return (
            <Card className="h-96 flex items-center justify-center">
                <p className="text-gray-400">No expense data to display</p>
            </Card>
        );
    }

    return (
        <Card className="h-96 w-full" delay={0.2}>
            <h3 className="text-lg font-bold mb-4">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};
