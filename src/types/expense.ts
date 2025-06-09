
export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: 'Rental' | 'Groceries' | 'Entertainment' | 'Travel' | 'Others';
  notes: string | null;
  date: string;
  payment_mode: 'UPI' | 'Credit Card' | 'Net Banking' | 'Cash';
  created_at: string;
  updated_at: string;
}

export interface ExpenseFilters {
  dateRange: 'This month' | 'Last 30 days' | 'Last 90 Days' | 'All time';
  categories: string[];
  paymentModes: string[];
}

export interface CreateExpenseData {
  amount: number;
  category: Expense['category'];
  notes?: string;
  date: string;
  payment_mode: Expense['payment_mode'];
}
