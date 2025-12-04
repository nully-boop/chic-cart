import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
