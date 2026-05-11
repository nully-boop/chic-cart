export function CategoryFilterSkeleton() {
  const widths = ['w-16', 'w-24', 'w-20', 'w-28', 'w-20', 'w-24'];
  return (
    <div className="mb-12 flex justify-center">
      <div className="flex w-full max-w-full gap-2 overflow-hidden pb-2 md:w-auto md:flex-wrap md:justify-center md:gap-3 md:pb-0">
        {widths.map((w, i) => (
          <div
            key={i}
            className={`h-9 ${w} animate-pulse rounded-full bg-muted`}
          />
        ))}
      </div>
    </div>
  );
}
