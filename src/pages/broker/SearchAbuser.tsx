import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskIndicator } from '@/components/ui/risk-indicator';
import { categories, abusers, getRiskLevel } from '@/lib/mock-data';
import { Search, ShieldCheck, ShieldAlert, ShieldX, AlertTriangle } from 'lucide-react';

interface SearchResult {
  found: boolean;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function SearchAbuser() {
  const [searchData, setSearchData] = useState({
    categoryId: '',
    value: '',
  });
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const selectedCategory = categories.find(c => c.id === searchData.categoryId);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if abuser exists in mock data
    const foundAbuser = abusers.find(
      a => a.categoryId === searchData.categoryId && 
           a.value.toLowerCase() === searchData.value.toLowerCase()
    );

    if (foundAbuser) {
      setResult({
        found: true,
        score: foundAbuser.score,
        riskLevel: foundAbuser.riskLevel,
      });
    } else {
      setResult({
        found: false,
        score: 0,
        riskLevel: 'low',
      });
    }

    setHasSearched(true);
    setIsSearching(false);
  };

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return <ShieldCheck className="h-16 w-16 text-green-500" />;
      case 'medium':
        return <ShieldAlert className="h-16 w-16 text-yellow-500" />;
      case 'high':
        return <ShieldX className="h-16 w-16 text-red-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Search Trader</h1>
          <p className="text-muted-foreground">Check a trader's risk score before doing business</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Abuser
            </CardTitle>
            <CardDescription>
              Enter trader details to check their risk level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={searchData.categoryId}
                  onValueChange={(value) => setSearchData({ ...searchData, categoryId: value })}
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  Search {selectedCategory ? selectedCategory.name : 'Value'}
                </Label>
                <Input
                  id="value"
                  type={selectedCategory?.inputType || 'text'}
                  value={searchData.value}
                  onChange={(e) => setSearchData({ ...searchData, value: e.target.value })}
                  placeholder={
                    selectedCategory 
                      ? `Enter ${selectedCategory.name.toLowerCase()} to search` 
                      : 'Select a category first'
                  }
                  disabled={!searchData.categoryId}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSearching || !searchData.categoryId}>
                {isSearching ? (
                  <>Searching...</>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Trader
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search Result */}
        {hasSearched && result && (
          <Card className={
            result.found
              ? result.riskLevel === 'high'
                ? 'border-red-500/50 bg-red-500/5'
                : result.riskLevel === 'medium'
                  ? 'border-yellow-500/50 bg-yellow-500/5'
                  : 'border-green-500/50 bg-green-500/5'
              : 'border-green-500/50 bg-green-500/5'
          }>
            <CardHeader>
              <CardTitle>Search Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result.found ? (
                <div className="flex flex-col items-center py-6 text-center">
                  {getRiskIcon(result.riskLevel)}
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    Trader Found in Database
                  </h3>
                  <div className="mt-4">
                    <RiskIndicator 
                      level={result.riskLevel} 
                      score={result.score}
                      size="lg"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground max-w-md">
                    {result.riskLevel === 'high' && 
                      'Warning: This trader has been flagged as high risk. Exercise extreme caution.'}
                    {result.riskLevel === 'medium' && 
                      'Caution: This trader has some complaints. Proceed with care.'}
                    {result.riskLevel === 'low' && 
                      'This trader has minimal complaints. Lower risk profile.'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6 text-center">
                  <ShieldCheck className="h-16 w-16 text-green-500" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    No Record Found
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    This trader has no complaints in our system.
                  </p>
                  <div className="mt-4">
                    <RiskIndicator level="low" score={0} size="lg" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Privacy Notice */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-start gap-4 pt-6">
            <AlertTriangle className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Privacy Protected Search</h3>
              <p className="text-sm text-muted-foreground">
                For security reasons, you can only see the trader's score and risk level. 
                Personal information such as name, email, phone numbers, and document details are not disclosed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
