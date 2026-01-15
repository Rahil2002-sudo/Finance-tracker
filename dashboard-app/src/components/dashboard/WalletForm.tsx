import { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Card } from '../ui/Card';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WalletForm = () => {
    const { addTransaction } = useDashboard();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !category || !title) return;

        addTransaction({
            amount: parseFloat(amount),
            category,
            title,
            type,
        });

        setAmount('');
        setCategory('');
        setTitle('');
    };

    return (
        <Card className="w-full" delay={0.1}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Quick Wallet</h3>
                <div className="flex bg-black/20 rounded-lg p-1">
                    <button
                        onClick={() => setType('income')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${type === 'income' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Income
                    </button>
                    <button
                        onClick={() => setType('expense')}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${type === 'expense' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Expense
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400 mb-1 block">Title</label>
                    <input
                        type="text"
                        className="w-full glass-input"
                        placeholder="e.g. Salary, Groceries"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Amount ($)</label>
                        <input
                            type="number"
                            className="w-full glass-input"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Category</label>
                        <input
                            type="text"
                            className="w-full glass-input"
                            placeholder="Food, Rent"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full glass-button mt-4 flex items-center justify-center gap-2 ${type === 'income' ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'
                        }`}
                >
                    {type === 'income' ? <PlusCircle size={18} /> : <MinusCircle size={18} />}
                    Add {type === 'income' ? 'Income' : 'Expense'}
                </motion.button>
            </form>
        </Card>
    );
};
