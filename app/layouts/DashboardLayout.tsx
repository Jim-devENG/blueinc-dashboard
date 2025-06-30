import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
  LayoutDashboard,
  Users,
  ListChecks,
  FolderKanban,
  CalendarCheck2,
  Bot,
  Mail,
  LifeBuoy,
  Search,
  UserCircle,
  LogOut,
  Settings,
  Moon,
  Sun,
  Home,
  FolderOpen,
  CheckSquare,
  Calendar,
  ShoppingCart,
  Globe,
  CreditCard,
  Building2,
  Zap,
  Clock,
  Target,
  TrendingUp,
  Database,
  Shield,
  Cloud,
  Smartphone,
  BarChart3,
  Star
} from 'lucide-react';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Staff', href: '/staff', icon: Users },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Timesheets & Leave', href: '/timesheets', icon: Calendar },
  { name: 'Mail', href: '/mail', icon: Mail },
  { name: 'Bot Console', href: '/bot-console', icon: Bot },
  { name: 'Email Marketing', href: '/email-marketing', icon: Target },
  { name: 'Customer Management', href: '/customer-management', icon: UserCircle },
  { name: 'Sales Pipeline', href: '/sales-pipeline', icon: TrendingUp },
  { name: 'Invoice & Billing', href: '/invoice-billing', icon: CreditCard },
  { name: 'Reports & Analytics', href: '/reports-analytics', icon: BarChart3 },
  { name: 'Features Overview', href: '/features-overview', icon: Star },
  { name: 'Advanced Analytics', href: '/analytics', icon: BarChart3, comingSoon: true },
  { name: 'E-commerce', href: '/ecommerce', icon: ShoppingCart, comingSoon: true },
  { name: 'Website Builder', href: '/website-builder', icon: Globe, comingSoon: true },
  { name: 'Advanced CRM', href: '/advanced-crm', icon: Building2, comingSoon: true },
  { name: 'Workflow Automation', href: '/workflow', icon: Zap, comingSoon: true },
  { name: 'Mobile App', href: '/mobile-app', icon: Smartphone, comingSoon: true },
  { name: 'Enterprise Security', href: '/security', icon: Shield, comingSoon: true },
  { name: 'Cloud Integration', href: '/cloud', icon: Cloud, comingSoon: true },
  { name: 'Advanced Analytics', href: '/advanced-analytics', icon: TrendingUp, comingSoon: true },
  { name: 'Data Warehouse', href: '/data-warehouse', icon: Database, comingSoon: true },
  { name: 'Payment Processing', href: '/payments', icon: CreditCard, comingSoon: true },
  { name: 'Real-time Monitoring', href: '/monitoring', icon: Clock, comingSoon: true }
];

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-full hover:bg-blueinc/10 transition mr-2"
      aria-label="Toggle dark mode"
      type="button"
    >
      {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-blueinc" />}
    </button>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check if we're in development mode without Clerk
  const isDevelopment = import.meta.env.DEV;
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isValidClerkKey = clerkKey && 
    clerkKey !== 'pk_test_YOUR_PUBLISHABLE_KEY' &&
    clerkKey !== 'pk_test_Y291cmFnZW91cy1jb3lvdGUtODQuY2xlcmsuYWNjb3VudHMuZGV2JA';

  // Only use Clerk hooks if we have a valid key
  let user: any = null;
  let signOut: any = null;

  if (isValidClerkKey) {
    try {
      const clerkUser = useUser();
      const clerk = useClerk();
      user = clerkUser.user;
      signOut = clerk.signOut;
    } catch (error) {
      // Fallback to development mode
      console.log('Clerk not available, using development mode');
    }
  }

  const handleSignOut = () => {
    if (signOut) {
      signOut();
    } else {
      console.log('Sign out not available in development mode');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-blueinc-dark dark:to-gray-900 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-blueinc text-white dark:bg-blueinc-dark dark:text-white border-r border-blueinc/30 dark:border-blueinc-dark/60 flex flex-col transition-transform duration-200 ease-in-out hidden md:flex shadow-soft">
        <div className="flex items-center h-16 px-6 border-b border-blueinc/20 dark:border-blueinc-dark/40">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blueinc to-magenta bg-clip-text text-transparent">
            Blueinc
          </span>
        </div>
        <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto sidebar-scrollbar relative">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.comingSoon ? '#' : item.href}
                onClick={item.comingSoon ? (e) => e.preventDefault() : undefined}
                className={`group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ease-in-out sidebar-link
                  ${active
                    ? 'bg-magenta text-white shadow-soft'
                    : 'hover:bg-blueinc/80 hover:text-white text-white/80 dark:text-white/80'}
                `}
              >
                <Icon className={`mr-3 h-5 w-5 transition-transform duration-200 ${active ? 'scale-110 text-white' : 'group-hover:scale-110 text-white/80 dark:text-white/80'}`} />
                {item.name}
                {item.comingSoon && (
                  <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
          {/* Gradient fade indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blueinc to-transparent pointer-events-none"></div>
        </nav>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 topbar-gradient border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-4 sm:px-6 lg:px-8 shadow-soft">
          <div className="flex-1 flex items-center">
            <form className="w-full max-w-md">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 focus-ring"
                />
              </div>
            </form>
          </div>
          {/* Theme toggle button */}
          <ThemeToggle />
          <div className="ml-4 flex items-center relative">
            {/* User menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 hover:scale-105 btn-hover p-2"
              >
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || 'User'} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-8 w-8 text-gray-400 hover:text-indigo-500 transition-colors duration-200" />
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.fullName || user?.firstName || 'Demo User'}
                </span>
              </button>
              
              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 card-gradient rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.fullName || user?.firstName || 'Demo User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.primaryEmailAddress?.emailAddress || 'demo@blueinc.com'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Handle settings
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
} 