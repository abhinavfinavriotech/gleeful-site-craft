import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { categories, allegationTypes } from '@/lib/mock-data';
import { Plus, CheckCircle } from 'lucide-react';

export default function AddAbuser() {
  const [formData, setFormData] = useState({
    categoryId: '',
    value: '',
    allegationTypeId: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const selectedCategory = categories.find(c => c.id === formData.categoryId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Complaint Submitted',
      description: 'Your abuser report has been recorded and will be reviewed.',
    });

    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        categoryId: '',
        value: '',
        allegationTypeId: '',
        description: '',
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Report Abuser</h1>
          <p className="text-muted-foreground">Submit a complaint about an abusive trader</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              New Complaint
            </CardTitle>
            <CardDescription>
              Select a category and provide details about the trader
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-green-500/20 p-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Complaint Submitted!</h3>
                <p className="mt-2 text-muted-foreground">
                  Your report has been recorded and will be reviewed by our admin team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCategory && (
                    <p className="text-xs text-muted-foreground">{selectedCategory.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">
                    {selectedCategory ? selectedCategory.name : 'Value'} *
                  </Label>
                  <Input
                    id="value"
                    type={selectedCategory?.inputType || 'text'}
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder={
                      selectedCategory 
                        ? `Enter ${selectedCategory.name.toLowerCase()}` 
                        : 'Select a category first'
                    }
                    disabled={!formData.categoryId}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allegation">Activity Type *</Label>
                  <Select
                    value={formData.allegationTypeId}
                    onValueChange={(value) => setFormData({ ...formData, allegationTypeId: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {allegationTypes.map((allegation) => (
                        <SelectItem key={allegation.id} value={allegation.id}>
                          {allegation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the incident and provide any relevant details..."
                    rows={4}
                    required
                  />
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Your complaint will be reviewed by the admin team. 
                    The system will automatically calculate the abuser's risk score based on all records.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
