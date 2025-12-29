import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { categories, Category } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, Tags } from 'lucide-react';

export default function CategoryManagement() {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    inputType: 'text',
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: '', description: '', inputType: 'text' });
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editing) {
      setCategoryList(prev =>
        prev.map(c => c.id === editing.id ? { ...c, ...formData } : c)
      );
      toast({ title: 'Category updated successfully' });
    } else {
      const newCategory: Category = {
        id: String(Date.now()),
        ...formData,
      };
      setCategoryList(prev => [...prev, newCategory]);
      toast({ title: 'Category added successfully' });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditing(category);
    setFormData({
      name: category.name,
      description: category.description,
      inputType: category.inputType,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryList(prev => prev.filter(c => c.id !== id));
    toast({ title: 'Category deleted successfully' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Category Management</h1>
            <p className="text-muted-foreground">Define categories for abuser records</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                <DialogDescription>
                  Categories are used for abuser complaint entries
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
                      placeholder="e.g., Email, Phone Number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe this category"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inputType">Input Type</Label>
                    <Input
                      id="inputType"
                      value={formData.inputType}
                      onChange={(e) => setFormData({ ...formData, inputType: e.target.value })}
                      placeholder="text, email, tel, etc."
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editing ? 'Update' : 'Add'} Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags className="h-5 w-5 text-primary" />
              Available Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Input Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryList.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="capitalize">{category.inputType}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(category.id)}>
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
