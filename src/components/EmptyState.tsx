import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-4 text-center animate-in fade-in duration-500">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-2xl text-foreground md:text-3xl">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
        {secondaryActionLabel && onSecondaryAction ? (
          <Button
            onClick={onSecondaryAction}
            variant="secondary"
            className="rounded-full px-6 text-xs uppercase tracking-[0.2em]"
          >
            {secondaryActionLabel}
          </Button>
        ) : null}
        <Button
          onClick={onAction}
          variant="outline"
          className="rounded-full px-6 text-xs uppercase tracking-[0.2em]"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
