import React, { createContext, useContext, useEffect } from 'react';
import type { Transaction, Subscription } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DashboardContextType {
    transactions: Transaction[];
    subscriptions: Subscription[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    deleteTransaction: (id: string) => void;
    addSubscription: (subscription: Omit<Subscription, 'id' | 'status'>) => void;
    deleteSubscription: (id: string) => void;
    checkSubscriptionStatus: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
    const [subscriptions, setSubscriptions] = useLocalStorage<Subscription[]>('subscriptions', []);

    const addTransaction = (data: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...data,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const addSubscription = (data: Omit<Subscription, 'id' | 'status'>) => {
        const newSub: Subscription = {
            ...data,
            id: crypto.randomUUID(),
            status: 'active',
        };
        setSubscriptions((prev) => [...prev, newSub]);
    };

    const deleteSubscription = (id: string) => {
        setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    };

    // Logic to check for "forgotten" subscriptions (> 30 days inactive since last payment)
    // For simplicity, we assume 'lastPaymentDate' is when it was last paid.
    // In a real app, this might track recurring dates. 
    // Here we flag if current date - lastPaymentDate > 30 days.
    const checkSubscriptionStatus = () => {
        const now = new Date();
        setSubscriptions((prev) =>
            prev.map((sub) => {
                const lastDate = new Date(sub.lastPaymentDate);
                const diffTime = Math.abs(now.getTime() - lastDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays > 30 && sub.status !== 'forgotten') {
                    return { ...sub, status: 'forgotten' };
                }
                return sub;
            })
        );
    };

    useEffect(() => {
        checkSubscriptionStatus();
        // Optional: Set strict interval if needed, but on mount is checking "freshness"
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                transactions,
                subscriptions,
                addTransaction,
                deleteTransaction,
                addSubscription,
                deleteSubscription,
                checkSubscriptionStatus,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
