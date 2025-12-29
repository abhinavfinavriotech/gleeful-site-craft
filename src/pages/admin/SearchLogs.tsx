import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchLogs } from '@/lib/mock-data';
import { History } from 'lucide-react';

export default function SearchLogs() {
  const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      low: 'default',
      medium: 'secondary',
      high: 'destructive',
    };
    return <Badge variant={variants[level]}>{level.toUpperCase()}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Search Logs</h1>
          <p className="text-muted-foreground">Monitor broker search activity</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Broker</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Search Value</TableHead>
                  <TableHead>Result Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.brokerName}</TableCell>
                    <TableCell>{log.category}</TableCell>
                    <TableCell>{log.searchValue}</TableCell>
                    <TableCell className="font-bold">{log.resultScore}</TableCell>
                    <TableCell>{getRiskBadge(log.riskLevel)}</TableCell>
                    <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
