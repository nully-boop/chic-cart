import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  variant?: 'hero' | 'compact';
  className?: string;
}

export function SearchBar({ value, onChange, placeholder, variant = 'hero', className }: SearchBarProps) {
  const isHero = variant === 'hero';
  return (
    <div
      className={cn(
        'relative flex items-center',
        isHero ? 'w-full max-w-md' : 'w-full max-w-xs',
        className,
      )}
    >
      <Search
        className={cn(
          'pointer-events-none absolute left-4 text-muted-foreground',
          isHero ? 'h-4 w-4' : 'h-4 w-4',
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full border bg-transparent pl-11 pr-10 text-sm tracking-wide outline-none transition-all duration-300',
          'placeholder:text-muted-foreground/70 focus:border-foreground',
          isHero
            ? 'h-12 rounded-full border-border'
            : 'h-9 rounded-full border-border',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
