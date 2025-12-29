import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  Shield,
  LayoutDashboard,
  Users,
  Tags,
  AlertTriangle,
  FileText,
  Search,
  Plus,
  LogOut,
  History,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/brokers', label: 'Broker Management', icon: Users },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/allegations', label: 'Activity Types', icon: AlertTriangle },
  { href: '/admin/complaints', label: 'Records', icon: FileText },
  { href: '/admin/search-logs', label: 'Search Logs', icon: History },
];

const brokerNavItems = [
  { href: '/broker', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/broker/add-abuser', label: 'Report Abuser', icon: Plus },
  { href: '/broker/search', label: 'Search Abuser', icon: Search },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = user?.role === 'admin' ? adminNavItems : brokerNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">TraderCheck</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
