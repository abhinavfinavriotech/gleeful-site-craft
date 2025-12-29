import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Lock, Building } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('broker');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast({
          title: 'Login successful',
          description: `Welcome back! Redirecting to your dashboard...`,
        });
        navigate(selectedRole === 'admin' ? '/admin' : '/broker');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email, password, or role. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to TraderCheck</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your role and enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRole || 'broker'} onValueChange={(v) => setSelectedRole(v as UserRole)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="broker" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Broker
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="broker" className="mt-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Brokers can report and search abusers with restricted visibility.
                </p>
              </TabsContent>
              <TabsContent value="admin" className="mt-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Admins have full access to system data and management modules.
                </p>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Admin:</strong> admin@tradercheck.com / admin123</p>
                <p><strong>Broker:</strong> broker@tradercheck.com / broker123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
