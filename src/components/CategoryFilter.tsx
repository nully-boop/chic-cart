import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  allLabel: string;
}

export function CategoryFilter({ categories, selected, onSelect, allLabel }: CategoryFilterProps) {
  const items = ['all', ...categories];

  return (
    <div className="mb-12 flex justify-center">
      <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-2 md:w-auto md:flex-wrap md:justify-center md:gap-3 md:overflow-visible md:pb-0">
        {items.map((cat) => {
          const isActive = selected === cat;
          const label = cat === 'all' ? allLabel : cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={cn(
                'whitespace-nowrap rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300',
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
