import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RiskIndicatorProps {
  level: 'low' | 'medium' | 'high';
  score: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskIndicator({ level, score, showScore = true, size = 'md' }: RiskIndicatorProps) {
  const colorClasses = {
    low: 'bg-green-500/20 text-green-600 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    high: 'bg-red-500/20 text-red-600 border-red-500/30',
  };

  const dotColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  };

  return (
    <div className="flex items-center gap-3">
      {showScore && (
        <span className={cn('font-bold', {
          'text-lg': size === 'sm',
          'text-2xl': size === 'md',
          'text-4xl': size === 'lg',
        })}>
          {score}
        </span>
      )}
      <Badge
        variant="outline"
        className={cn(
          'flex items-center gap-1.5 font-medium border',
          colorClasses[level],
          sizeClasses[size]
        )}
      >
        <span className={cn('h-2 w-2 rounded-full animate-pulse', dotColors[level])} />
        {labels[level]}
      </Badge>
    </div>
  );
}
