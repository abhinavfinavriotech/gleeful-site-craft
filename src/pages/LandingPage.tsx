import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Shield, 
  Search, 
  BarChart3, 
  Lock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Search traders across multiple categories with instant risk scoring',
  },
  {
    icon: BarChart3,
    title: 'Risk Scoring',
    description: 'Automated risk calculation based on complaint history and severity',
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description: 'Sensitive data is hidden from brokers - only risk levels are shown',
  },
  {
    icon: Users,
    title: 'Broker Network',
    description: 'Leverage collective intelligence from multiple trusted brokers',
  },
  {
    icon: AlertTriangle,
    title: 'Activity Types',
    description: 'Categorize records by fraud type for accurate risk assessment',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Get instant updates when new records are filed',
  },
];

const stats = [
  { value: '5,000+', label: 'Traders Checked' },
  { value: '150+', label: 'Registered Brokers' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-background" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Shield className="h-4 w-4" />
              <span>Trusted by 150+ brokers worldwide</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Protect Your Business from{' '}
              <span className="text-primary">Abusive Traders</span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              TraderCheck is a role-based platform that helps brokers identify high-risk traders 
              through a secure complaint and scoring system — without exposing sensitive personal information.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/login">
                <Button size="lg" className="min-w-[200px]">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Comprehensive Trader Risk Management
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our platform provides all the tools you need to identify, track, and manage 
              high-risk traders in your network.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Simple, secure, and effective trader verification in three easy steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Report Abusers', description: 'Brokers submit records with category and activity type' },
              { step: '02', title: 'Score Calculated', description: 'System automatically calculates risk score based on records' },
              { step: '03', title: 'Search & Verify', description: 'Check any trader to see their risk level before trading' },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="absolute right-0 top-8 hidden h-8 w-8 -translate-x-1/2 text-muted-foreground md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-secondary p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary-foreground md:text-4xl">
              Ready to Protect Your Business?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-secondary-foreground/80">
              Join hundreds of brokers who trust TraderCheck to verify traders and avoid high-risk individuals.
            </p>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-background">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">TraderCheck</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TraderCheck. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
