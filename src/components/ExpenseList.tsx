
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Calendar, CreditCard, ChevronDown, ChevronUp, Trash2, X } from "lucide-react";
import { Expense } from "@/types/expense";
import { useExpenses } from "@/hooks/useExpenses";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const { deleteExpense, isDeleting } = useExpenses();
  const [dateFilter, setDateFilter] = useState<string>('All time');
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [paymentModeFilters, setPaymentModeFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Rental', 'Groceries', 'Entertainment', 'Travel', 'Others'];
  const paymentModes = ['UPI', 'Credit Card', 'Net Banking', 'Cash'];

  const getDateFilteredExpenses = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      
      switch (dateFilter) {
        case 'This month':
          return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
        case 'Last 30 days':
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return expenseDate >= thirtyDaysAgo;
        case 'Last 90 Days':
          const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          return expenseDate >= ninetyDaysAgo;
        default:
          return true;
      }
    });
  };

  const filteredExpenses = getDateFilteredExpenses().filter(expense => {
    const categoryMatch = categoryFilters.length === 0 || categoryFilters.includes(expense.category);
    const paymentMatch = paymentModeFilters.length === 0 || paymentModeFilters.includes(expense.payment_mode);
    return categoryMatch && paymentMatch;
  });

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const togglePaymentModeFilter = (paymentMode: string) => {
    setPaymentModeFilters(prev => 
      prev.includes(paymentMode) 
        ? prev.filter(p => p !== paymentMode)
        : [...prev, paymentMode]
    );
  };

  const clearAllFilters = () => {
    setDateFilter('All time');
    setCategoryFilters([]);
    setPaymentModeFilters([]);
  };

  const hasActiveFilters = dateFilter !== 'All time' || categoryFilters.length > 0 || paymentModeFilters.length > 0;

  const handleDeleteExpense = (expenseId: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(expenseId);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Rental': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Groceries': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      'Entertainment': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Travel': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Others': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filters */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-3 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base md:text-lg font-semibold text-foreground flex items-center">
              <Filter className="h-4 md:h-5 w-4 md:w-5 mr-2 text-primary" />
              Filters
              {hasActiveFilters && (
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  size="sm"
                  className="ml-4 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Remove All Filters
                </Button>
              )}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="ml-1 hidden sm:inline">{showFilters ? 'Hide' : 'Show'} Filters</span>
            </Button>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="pt-0 p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Date Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="bg-accent/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    <SelectItem value="This month">This month</SelectItem>
                    <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                    <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                    <SelectItem value="All time">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Categories</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-3">
                      <Checkbox
                        id={category}
                        checked={categoryFilters.includes(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                        className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label htmlFor={category} className="text-sm text-muted-foreground cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Mode Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Payment Modes</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {paymentModes.map(mode => (
                    <div key={mode} className="flex items-center space-x-3">
                      <Checkbox
                        id={mode}
                        checked={paymentModeFilters.includes(mode)}
                        onCheckedChange={() => togglePaymentModeFilter(mode)}
                        className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label htmlFor={mode} className="text-sm text-muted-foreground cursor-pointer">
                        {mode}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Expense List */}
      <div className="space-y-3 md:space-y-4">
        {filteredExpenses.length === 0 ? (
          <Card className="glass-card border-border/50">
            <CardContent className="py-8 md:py-12 text-center p-4 md:p-6">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-accent/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-6 md:h-8 w-6 md:w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-base md:text-lg">No expenses found matching your filters.</p>
              <p className="text-muted-foreground/70 text-sm mt-2">Try adjusting your filter criteria or add some expenses.</p>
            </CardContent>
          </Card>
        ) : (
          filteredExpenses.map(expense => (
            <Card key={expense.id} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-200 hover:glow-effect">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <span className="text-xl md:text-2xl font-bold text-foreground">
                        ₹{expense.amount.toLocaleString()}
                      </span>
                      <Badge className={`${getCategoryColor(expense.category)} border w-fit text-xs md:text-sm`}>
                        {expense.category}
                      </Badge>
                    </div>
                    {expense.notes && (
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{expense.notes}</p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{new Date(expense.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{expense.payment_mode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleDeleteExpense(expense.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
