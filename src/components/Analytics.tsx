
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Expense } from "@/types/expense";

interface AnalyticsProps {
  expenses: Expense[];
}

const Analytics = ({ expenses }: AnalyticsProps) => {
  // Group expenses by month and category for stacked bar chart
  const getMonthlyData = () => {
    const monthlyData: { [key: string]: any } = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthName,
          Rental: 0,
          Groceries: 0,
          Entertainment: 0,
          Travel: 0,
          Others: 0,
          total: 0
        };
      }
      
      monthlyData[monthKey][expense.category] += expense.amount;
      monthlyData[monthKey].total += expense.amount;
    });

    return Object.values(monthlyData).sort((a: any, b: any) => 
      a.month.localeCompare(b.month)
    );
  };

  const chartData = getMonthlyData();

  // Category breakdown
  const getCategoryBreakdown = () => {
    const categoryTotals: { [key: string]: number } = {
      Rental: 0,
      Groceries: 0,
      Entertainment: 0,
      Travel: 0,
      Others: 0
    };

    expenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .filter(item => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  };

  const categoryBreakdown = getCategoryBreakdown();
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryColors = {
    Rental: '#8b5cf6',
    Groceries: '#10b981',
    Entertainment: '#f59e0b',
    Travel: '#3b82f6',
    Others: '#6b7280'
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Monthly Spending Chart */}
      <Card className="glass-card border-border/50">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl text-foreground">Monthly Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          {chartData.length > 0 ? (
            <div className="w-full">
              <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Rental" stackId="a" fill={categoryColors.Rental} />
                  <Bar dataKey="Groceries" stackId="a" fill={categoryColors.Groceries} />
                  <Bar dataKey="Entertainment" stackId="a" fill={categoryColors.Entertainment} />
                  <Bar dataKey="Travel" stackId="a" fill={categoryColors.Travel} />
                  <Bar dataKey="Others" stackId="a" fill={categoryColors.Others} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-48 md:h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-lg md:text-xl mb-2">No data available</div>
                <div className="text-sm">Add some expenses to see analytics</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="glass-card border-border/50">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl text-foreground">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          {categoryBreakdown.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {categoryBreakdown.map(({ category, amount }) => {
                const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground text-sm md:text-base">{category}</span>
                      <span className="text-foreground font-semibold text-sm md:text-base">
                        ₹{amount.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 md:h-3">
                      <div 
                        className="h-2 md:h-3 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: categoryColors[category as keyof typeof categoryColors]
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8 text-muted-foreground">
              <div className="text-base md:text-lg mb-2">No expenses to analyze</div>
              <div className="text-sm">Add some expenses to see category breakdown</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4 md:p-6 text-center">
            <div className="text-xl md:text-2xl font-bold text-foreground">₹{totalAmount.toLocaleString()}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-border/50">
          <CardContent className="p-4 md:p-6 text-center">
            <div className="text-xl md:text-2xl font-bold text-foreground">{expenses.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Transactions</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-border/50 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6 text-center">
            <div className="text-xl md:text-2xl font-bold text-foreground">
              ₹{expenses.length > 0 ? Math.round(totalAmount / expenses.length).toLocaleString() : 0}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Average per Transaction</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
