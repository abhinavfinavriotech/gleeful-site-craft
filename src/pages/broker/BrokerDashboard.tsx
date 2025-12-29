import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { abusers } from '@/lib/mock-data';

export default function BrokerDashboard() {
  const { user } = useAuth();
  
  // Filter complaints submitted by this broker (using mock broker id '2')
  const myComplaints = abusers.filter(a => a.reportedBy === '2');
  const pendingCount = myComplaints.filter(a => a.status === 'pending').length;
  const verifiedCount = myComplaints.filter(a => a.status === 'verified').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Broker Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Complaints"
            value={myComplaints.length}
            icon={<FileText className="h-5 w-5" />}
            description="Submitted by you"
          />
          <StatCard
            title="Pending Review"
            value={pendingCount}
            icon={<AlertTriangle className="h-5 w-5" />}
            description="Awaiting verification"
          />
          <StatCard
            title="Verified"
            value={verifiedCount}
            icon={<TrendingUp className="h-5 w-5" />}
            description="Confirmed abusers"
          />
          <StatCard
            title="Searches Today"
            value={5}
            icon={<Search className="h-5 w-5" />}
            description="Trader checks"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for brokers</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <a 
                href="/broker/add-abuser" 
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
              >
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Report Abuser</h3>
                  <p className="text-sm text-muted-foreground">Submit a new complaint</p>
                </div>
              </a>
              <a 
                href="/broker/search" 
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
              >
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Search Trader</h3>
                  <p className="text-sm text-muted-foreground">Check trader risk score</p>
                </div>
              </a>
            </CardContent>
          </Card>

          {/* My Recent Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                My Recent Complaints
              </CardTitle>
              <CardDescription>Latest abuser reports you submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myComplaints.length > 0 ? (
                  myComplaints.slice(0, 3).map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium text-foreground">{complaint.description}</p>
                        <p className="text-sm text-muted-foreground">{complaint.createdAt}</p>
                      </div>
                      <Badge variant={complaint.status === 'verified' ? 'default' : 'secondary'}>
                        {complaint.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No complaints submitted yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-start gap-4 pt-6">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Privacy Notice</h3>
              <p className="text-sm text-muted-foreground">
                For privacy and security reasons, you can only see the risk score and risk level when searching for traders. 
                Personal details such as name, email, phone, and documents are hidden from broker view.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
