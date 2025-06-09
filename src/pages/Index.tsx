
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "@/components/LandingNavbar";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Shield, Smartphone, Zap, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights into your spending patterns with beautiful charts and graphs."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is encrypted and protected with bank-level security."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your expenses anywhere with our responsive design."
    },
    {
      icon: Zap,
      title: "Quick Entry",
      description: "Add expenses in seconds with our streamlined interface."
    },
    {
      icon: TrendingUp,
      title: "Smart Categorization",
      description: "Organize expenses with intelligent categories and filters."
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Share and collaborate on expense tracking with your team."
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <LandingNavbar onAuthClick={() => setShowAuthModal(true)} />
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Track Your Expenses
            <span className="block text-gradient mt-2">Like Never Before</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with our powerful expense tracking platform. 
            Get insights, set budgets, and achieve your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow-effect px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Everything You Need
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make expense tracking simple and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-200 h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Powerful Analytics
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12">
            Visualize your spending patterns with comprehensive charts and insights.
          </p>
          <div className="bg-card/50 rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-border">
            <div className="relative w-full">
              <img 
                src="/lovable-uploads/8409e0c2-fd2c-4caa-8979-501df98eadc7.png" 
                alt="Monthly Spending Analytics - Stacked bar chart showing expense categories by month"
                className="w-full h-auto rounded-lg shadow-lg dark:brightness-90 dark:contrast-110 light:brightness-100 light:contrast-100 max-w-4xl mx-auto"
                style={{
                  filter: 'var(--analytics-image-filter, none)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent rounded-lg pointer-events-none"></div>
            </div>
            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Interactive Expense Analytics
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Track your monthly spending across different categories with our intuitive stacked bar charts. 
                Get instant insights into your financial patterns and make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Join thousands of users who are already tracking their expenses smarter.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
          >
            {user ? "Go to Dashboard" : "Start Tracking Today"}
          </Button>
        </div>
      </section>

      <Footer />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Index;
