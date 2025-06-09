
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Wallet, Sun, Moon, LogOut, Home } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogoClick();
              }
            }}
            aria-label="Go to home page"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center glow-effect">
              <Wallet className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-2xl font-bold text-gradient">ExpenseTracker</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
                aria-label="Toggle dark mode"
              />
              <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
            
            <Button
              onClick={handleHomeClick}
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex text-sm px-3 sm:px-4"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Home
            </Button>
            
            <Button
              onClick={handleHomeClick}
              variant="outline"
              size="sm"
              className="sm:hidden p-2"
              aria-label="Go home"
            >
              <Home className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive text-sm px-3 sm:px-4"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
