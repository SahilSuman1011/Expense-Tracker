
import { Wallet, Mail, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                <Wallet className="h-3 w-3 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gradient">ExpenseTracker</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
              Track your expenses efficiently with powerful analytics and insights. 
              Manage your finances with ease and stay on top of your spending habits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#features" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#analytics" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="sahilsuman1202@gmail.com" 
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://github.com/SahilSuman1011" 
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Visit our GitHub"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a 
                href="https://x.com/SahilSuman1111" 
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2024 ExpenseTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
