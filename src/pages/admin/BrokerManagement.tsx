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
import { brokers, Broker } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';

export default function BrokerManagement() {
  const [brokerList, setBrokerList] = useState<Broker[]>(brokers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBroker, setEditingBroker] = useState<Broker | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    status: 'active' as 'active' | 'inactive',
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: '', email: '', company: '', status: 'active' });
    setEditingBroker(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBroker) {
      setBrokerList(prev =>
        prev.map(b =>
          b.id === editingBroker.id
            ? { ...b, ...formData }
            : b
        )
      );
      toast({ title: 'Broker updated successfully' });
    } else {
      const newBroker: Broker = {
        id: String(Date.now()),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        complaintsSubmitted: 0,
      };
      setBrokerList(prev => [...prev, newBroker]);
      toast({ title: 'Broker added successfully' });
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (broker: Broker) => {
    setEditingBroker(broker);
    setFormData({
      name: broker.name,
      email: broker.email,
      company: broker.company,
      status: broker.status,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBrokerList(prev => prev.filter(b => b.id !== id));
    toast({ title: 'Broker deleted successfully' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Broker Management</h1>
            <p className="text-muted-foreground">Manage registered brokers in the system</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Broker
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBroker ? 'Edit Broker' : 'Add New Broker'}</DialogTitle>
                <DialogDescription>
                  {editingBroker ? 'Update broker information' : 'Enter the details for the new broker'}
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'active' | 'inactive') => 
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingBroker ? 'Update' : 'Add'} Broker</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Registered Brokers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Complaints</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brokerList.map((broker) => (
                  <TableRow key={broker.id}>
                    <TableCell className="font-medium">{broker.name}</TableCell>
                    <TableCell>{broker.email}</TableCell>
                    <TableCell>{broker.company}</TableCell>
                    <TableCell>
                      <Badge variant={broker.status === 'active' ? 'default' : 'secondary'}>
                        {broker.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{broker.complaintsSubmitted}</TableCell>
                    <TableCell>{broker.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(broker)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(broker.id)}>
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
