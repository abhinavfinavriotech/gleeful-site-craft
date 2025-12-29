import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { abusers, categories, allegationTypes, brokers, Abuser } from '@/lib/mock-data';
import { FileText, CheckCircle, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ComplaintsManagement() {
  const [complaintList, setComplaintList] = useState<Abuser[]>(abusers);
  const [selectedComplaint, setSelectedComplaint] = useState<Abuser | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { toast } = useToast();

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Unknown';
  const getAllegationName = (id: string) => allegationTypes.find(a => a.id === id)?.name || 'Unknown';
  const getBrokerName = (id: string) => brokers.find(b => b.id === id)?.name || 'Unknown';

  const handleStatusChange = (id: string, status: 'pending' | 'verified' | 'cleared') => {
    setComplaintList(prev =>
      prev.map(c => c.id === id ? { ...c, status, verified: status === 'verified' } : c)
    );
    toast({ title: `Complaint marked as ${status}` });
  };

  const handleView = (complaint: Abuser) => {
    setSelectedComplaint(complaint);
    setIsViewOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      verified: 'default',
      pending: 'secondary',
      cleared: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

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
          <h1 className="text-3xl font-bold text-foreground">Complaints Management</h1>
          <p className="text-muted-foreground">View and manage all abuser complaints</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              All Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Allegation</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaintList.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{getCategoryName(complaint.categoryId)}</TableCell>
                    <TableCell className="font-medium">{complaint.value}</TableCell>
                    <TableCell>{getAllegationName(complaint.allegationTypeId)}</TableCell>
                    <TableCell className="font-bold">{complaint.score}</TableCell>
                    <TableCell>{getRiskBadge(complaint.riskLevel)}</TableCell>
                    <TableCell>{getBrokerName(complaint.reportedBy)}</TableCell>
                    <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleView(complaint)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select
                          value={complaint.status}
                          onValueChange={(value: 'pending' | 'verified' | 'cleared') => 
                            handleStatusChange(complaint.id, value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="cleared">Cleared</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Complaint Details</DialogTitle>
            </DialogHeader>
            {selectedComplaint && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{getCategoryName(selectedComplaint.categoryId)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Value</p>
                    <p className="font-medium">{selectedComplaint.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Allegation Type</p>
                    <p className="font-medium">{getAllegationName(selectedComplaint.allegationTypeId)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-2xl font-bold">{selectedComplaint.score}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    {getRiskBadge(selectedComplaint.riskLevel)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(selectedComplaint.status)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reported By</p>
                    <p className="font-medium">{getBrokerName(selectedComplaint.reportedBy)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{selectedComplaint.createdAt}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1 rounded-lg bg-muted/50 p-3">{selectedComplaint.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
