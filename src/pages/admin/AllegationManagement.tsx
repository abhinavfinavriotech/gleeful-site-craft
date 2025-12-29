import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { allegationTypes, AllegationType } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';

export default function AllegationManagement() {
  const [allegationList, setAllegationList] = useState<AllegationType[]>(allegationTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AllegationType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    severity: 'medium' as 'low' | 'medium' | 'high',
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: '', severity: 'medium' });
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editing) {
      setAllegationList(prev =>
        prev.map(a => a.id === editing.id ? { ...a, ...formData } : a)
      );
      toast({ title: 'Allegation type updated successfully' });
    } else {
      const newAllegation: AllegationType = {
        id: String(Date.now()),
        ...formData,
      };
      setAllegationList(prev => [...prev, newAllegation]);
      toast({ title: 'Allegation type added successfully' });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (allegation: AllegationType) => {
    setEditing(allegation);
    setFormData({
      name: allegation.name,
      severity: allegation.severity,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAllegationList(prev => prev.filter(a => a.id !== id));
    toast({ title: 'Allegation type deleted successfully' });
  };

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
    const variants = {
      low: 'default' as const,
      medium: 'secondary' as const,
      high: 'destructive' as const,
    };
    return <Badge variant={variants[severity]}>{severity}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Allegation Types</h1>
            <p className="text-muted-foreground">Manage allegation types for scoring</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Allegation Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Allegation Type' : 'Add New Allegation Type'}</DialogTitle>
                <DialogDescription>
                  Allegation types are used for risk scoring
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Fraud, Non-Payment"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value: 'low' | 'medium' | 'high') => 
                        setFormData({ ...formData, severity: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editing ? 'Update' : 'Add'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Allegation Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allegationList.map((allegation) => (
                  <TableRow key={allegation.id}>
                    <TableCell className="font-medium">{allegation.name}</TableCell>
                    <TableCell>{getSeverityBadge(allegation.severity)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(allegation)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(allegation.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
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
