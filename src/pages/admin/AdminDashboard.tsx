import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  AlertTriangle, 
  FileText, 
  Search,
  TrendingUp,
} from 'lucide-react';
import { brokers, abusers, searchLogs, getRiskLevel } from '@/lib/mock-data';

export default function AdminDashboard() {
  const highRiskCount = abusers.filter(a => a.riskLevel === 'high').length;
  const pendingCount = abusers.filter(a => a.status === 'pending').length;
  const activeBrokers = brokers.filter(b => b.status === 'active').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your TraderCheck system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Brokers"
            value={brokers.length}
            icon={<Users className="h-5 w-5" />}
            description={`${activeBrokers} active`}
          />
          <StatCard
            title="Total Abusers"
            value={abusers.length}
            icon={<AlertTriangle className="h-5 w-5" />}
            description={`${highRiskCount} high risk`}
          />
          <StatCard
            title="Total Complaints"
            value={abusers.length}
            icon={<FileText className="h-5 w-5" />}
            description={`${pendingCount} pending`}
          />
          <StatCard
            title="Recent Searches"
            value={searchLogs.length}
            icon={<Search className="h-5 w-5" />}
            description="Last 24 hours"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Complaints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Complaints
              </CardTitle>
              <CardDescription>Latest abuser reports from brokers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {abusers.slice(0, 4).map((abuser) => (
                  <div key={abuser.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium text-foreground">{abuser.value}</p>
                      <p className="text-sm text-muted-foreground">{abuser.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        abuser.riskLevel === 'high' ? 'destructive' : 
                        abuser.riskLevel === 'medium' ? 'secondary' : 'default'
                      }>
                        Score: {abuser.score}
                      </Badge>
                      <Badge variant={abuser.status === 'verified' ? 'default' : 'outline'}>
                        {abuser.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Search Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Recent Search Logs
              </CardTitle>
              <CardDescription>Broker search activity monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium text-foreground">{log.brokerName}</p>
                      <p className="text-sm text-muted-foreground">
                        Searched: {log.searchValue} ({log.category})
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        log.riskLevel === 'high' ? 'destructive' : 
                        log.riskLevel === 'medium' ? 'secondary' : 'default'
                      }>
                        {log.riskLevel.toUpperCase()}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Overview of abuser risk levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-green-500/10 p-4 text-center">
                <p className="text-3xl font-bold text-green-600">
                  {abusers.filter(a => a.riskLevel === 'low').length}
                </p>
                <p className="text-sm text-green-600">Low Risk (0-5)</p>
              </div>
              <div className="rounded-lg bg-yellow-500/10 p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">
                  {abusers.filter(a => a.riskLevel === 'medium').length}
                </p>
                <p className="text-sm text-yellow-600">Medium Risk (6-15)</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-4 text-center">
                <p className="text-3xl font-bold text-red-600">
                  {abusers.filter(a => a.riskLevel === 'high').length}
                </p>
                <p className="text-sm text-red-600">High Risk (16+)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
