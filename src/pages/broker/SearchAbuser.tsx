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
import { abusers } from '@/lib/mock-data';
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

type SearchMode = 'basic' | 'advanced' | 'additional';
type SearchField =
  | 'name'
  | 'email'
  | 'contact'
  | 'address'
  | 'ip'
  | 'document'
  | 'ai';

interface SearchResult {
  found: boolean;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function SearchAbuser() {
  const [mode, setMode] = useState<SearchMode>('basic');
  const [field, setField] = useState<SearchField>('name');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 700));

    // 🔎 Mock search logic
    const found = abusers.find((a) =>
      a.value.toLowerCase().includes(value.toLowerCase())
    );

    if (found) {
      setResult({
        found: true,
        score: found.score,
        riskLevel: found.riskLevel,
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
        return <ShieldCheck className="h-14 w-14 text-green-500" />;
      case 'medium':
        return <ShieldAlert className="h-14 w-14 text-yellow-500" />;
      case 'high':
        return <ShieldX className="h-14 w-14 text-red-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Search Trader</h1>
          <p className="text-muted-foreground">
            Search traders based on abuse activity & risk profile
          </p>
        </div>

        {/* Search Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" /> Search Abuser
            </CardTitle>
            <CardDescription>
              Select search type and provide details
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search Mode */}
              <div className="space-y-2">
                <Label>Search Mode</Label>
                <Select value={mode} onValueChange={(v) => setMode(v as SearchMode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Search</SelectItem>
                    <SelectItem value="advanced">Advanced Search</SelectItem>
                    <SelectItem value="additional">Additional Search</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Field */}
              <div className="space-y-2">
                <Label>Search Field</Label>
                <Select value={field} onValueChange={(v) => setField(v as SearchField)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {/* BASIC */}
                    {mode === 'basic' && (
                      <>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </>
                    )}

                    {/* ADVANCED */}
                    {mode === 'advanced' && (
                      <>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="contact">Contact Details</SelectItem>
                        <SelectItem value="address">Address</SelectItem>
                      </>
                    )}

                    {/* ADDITIONAL */}
                    {mode === 'additional' && (
                      <>
                        <SelectItem value="ip">IP Address</SelectItem>
                        <SelectItem value="document">Document ID</SelectItem>
                        <SelectItem value="ai">
                          <span className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" /> AI Similar Search
                          </span>
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <Label>Search Value</Label>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value to search"
                  required
                />
              </div>

              <Button className="w-full" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        {hasSearched && result && (
          <Card>
            <CardContent className="py-8 text-center space-y-4">
              {result.found ? (
                <>
                  {getRiskIcon(result.riskLevel)}
                  <h3 className="text-xl font-semibold">Trader Found</h3>
                  <RiskIndicator
                    level={result.riskLevel}
                    score={result.score}
                    size="lg"
                  />
                </>
              ) : (
                <>
                  <ShieldCheck className="h-14 w-14 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold">No Record Found</h3>
                  <RiskIndicator level="low" score={0} size="lg" />
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Privacy */}
        <Card className="bg-primary/5 border-primary/30">
          <CardContent className="flex gap-4 pt-6">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              Only risk score & level are visible. Personal information remains protected.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
