export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string; // ISO string
}

export type SubscriptionStatus = 'active' | 'inactive' | 'forgotten';

export interface Subscription {
    id: string;
    name: string;
    cost: number;
    billingCycle: 'monthly' | 'yearly';
    lastPaymentDate: string; // ISO string
    status: SubscriptionStatus;
    category?: string;
}

export interface DashboardState {
    transactions: Transaction[];
    subscriptions: Subscription[];
}
