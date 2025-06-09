
# ExpenseTracker
A modern, full-featured expense tracking application built with React, TypeScript, and Supabase. Track your expenses, analyze spending patterns, and take control of your finances with beautiful analytics and intuitive design.

## 🌟 Features Overview

### 💰 Expense Management
- **Add Expenses** with comprehensive details:
  - **Amount** in Indian Rupees (₹)
  - **Category** selection: Rental, Groceries, Entertainment, Travel, Others
  - **Notes** - Add one line description for each expense
  - **Date** of expense with date picker
  - **Payment Mode**: UPI, Credit Card, Net Banking, Cash

### 📋 Expense Viewing & Filtering
- **View all expenses** in a clean, organized list with pagination
- **Advanced filtering system** with multiple filter options:
  - **Date filters**: This month, Last 30 days, Last 90 days, All time
  - **Category filters**: Multiple categories can be selected simultaneously
  - **Payment mode filters**: Multiple payment modes can be selected
  - **Remove all filters** option to reset all filters at once
- **Delete expenses** with confirmation dialog
- **Real-time updates** with optimistic UI

### 📊 Analytics Dashboard
- **Interactive stacked bar chart** showing:
  - Months on X-axis
  - Amount spent on Y-axis  
  - Different colors for each expense category
  - Responsive design that adapts to screen sizes
- **Category breakdown** with percentages and visual progress bars
- **Summary statistics** showing:
  - Total amount spent
  - Total number of transactions
  - Average amount per transaction

### 🎨 User Experience
- **Beautiful SaaS-style landing page** with feature highlights
- **Secure authentication** powered by Supabase Auth
- **Fully responsive design** that works perfectly on desktop, tablet, and mobile
- **Dark/Light theme** toggle with system preference detection
- **Accessible design** with proper ARIA labels and keyboard navigation
- **Loading states** and error handling throughout the app
- **Toast notifications** for user feedback

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL Database, Authentication, Real-time subscriptions)
- **Charts**: Recharts for analytics visualization
- **UI Components**: shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AddExpenseForm.tsx    # Form for adding new expenses
│   ├── Analytics.tsx         # Charts and analytics dashboard
│   ├── AuthModal.tsx         # Authentication modal
│   ├── DashboardNavbar.tsx   # Navigation for dashboard
│   ├── ExpenseList.tsx       # List of expenses with filters
│   ├── Footer.tsx           # Shared footer component
│   └── LandingNavbar.tsx    # Landing page navigation
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication hook
│   ├── useExpenses.ts   # Expense management hook
│   └── use-toast.ts     # Toast notification hook
├── pages/               # Page components
│   ├── Index.tsx        # Landing page
│   └── Dashboard.tsx    # Main application dashboard
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme management
├── integrations/        # External service integrations
│   └── supabase/        # Supabase client and types
├── types/               # TypeScript type definitions
│   └── expense.ts       # Expense-related types
└── lib/                 # Utility functions
    └── utils.ts         # Common utilities
```

## 📋 Requirements Fulfilled

### ✅ Add Expenses
- [x] Amount in Rupees with proper validation
- [x] Category selection (Rental, Groceries, Entertainment, Travel, Others)
- [x] Notes field for one-line descriptions
- [x] Date picker for expense date
- [x] Payment mode selection (UPI, Credit Card, Net Banking, Cash)

### ✅ View & Filter Expenses
- [x] Complete expense list with all details
- [x] Date filtering (This month, Last 30 days, Last 90 days, All time)
- [x] Multi-select category filtering
- [x] Multi-select payment mode filtering
- [x] Remove all filters functionality
- [x] Delete expense functionality with confirmation

### ✅ Analytics
- [x] Stacked bar chart with months on X-axis
- [x] Amount in Rupees on Y-axis
- [x] Category-based color coding
- [x] Interactive tooltips and legends
- [x] Responsive chart design

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key

4. **Database Setup**
   The expenses table is automatically created with the following schema:
   ```sql
   CREATE TABLE expenses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id),
     amount NUMERIC NOT NULL,
     category TEXT NOT NULL CHECK (category IN ('Rental', 'Groceries', 'Entertainment', 'Travel', 'Others')),
     notes TEXT,
     date DATE NOT NULL,
     payment_mode TEXT NOT NULL CHECK (payment_mode IN ('UPI', 'Credit Card', 'Net Banking', 'Cash')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
   );
   ```

5. **Enable Row Level Security (RLS)**
   RLS policies are automatically set up to ensure users can only access their own expenses.

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Navigate to `http://localhost:8080`
   - Create an account or sign in to start tracking expenses

## 🔐 Security Features

- **Row Level Security (RLS)** ensures users can only access their own data
- **Authentication** handled securely by Supabase Auth
- **Data validation** on both client and server side
- **Protected routes** prevent unauthorized access

## 🎯 Key Features Implementation

### Real-time Data Synchronization
- Uses Supabase real-time subscriptions
- Optimistic updates for better user experience
- Automatic data refresh on network reconnection

### Advanced Filtering System
- Multiple filter types can be applied simultaneously
- Filters persist during the session
- Easy reset with "Remove All Filters" button

### Responsive Analytics
- Charts automatically adapt to screen size
- Touch-friendly on mobile devices
- Accessible with keyboard navigation

### Theme System
- Consistent design system across light and dark themes
- Automatic system theme detection
- Smooth transitions between themes

## 🚀 Deployment

This app can be easily deployed to various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add your Supabase environment variables
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Other Platforms
The app builds to static files and can be deployed anywhere that serves static content.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend powered by [Supabase](https://supabase.com)
- Icons from [Lucide](https://lucide.dev)
- Charts from [Recharts](https://recharts.org)
