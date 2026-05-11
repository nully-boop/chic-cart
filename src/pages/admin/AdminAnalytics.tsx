import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formatDay = (isoDate: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(isoDate));

export default function AdminAnalytics() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: async () => {
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('created_at,total')
        .order('created_at', { ascending: false })
        .limit(50);

      if (ordersError) throw ordersError;

      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('quantity, price, products(name)')
        .limit(50);

      if (itemsError) throw itemsError;

      return {
        orders: orders ?? [],
        items: items ?? [],
      };
    },
  });

  const revenueSeries = useMemo(() => {
    if (!data) return [];
    const byDay = new Map<string, number>();

    data.orders.forEach((order) => {
      const dayKey = new Date(order.created_at).toISOString().slice(0, 10);
      const current = byDay.get(dayKey) ?? 0;
      byDay.set(dayKey, current + Number(order.total ?? 0));
    });

    return Array.from(byDay.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7)
      .map(([date, revenue]) => ({
        date,
        label: formatDay(date),
        revenue,
      }));
  }, [data]);

  const topProducts = useMemo(() => {
    if (!data) return [];
    const totals = new Map<string, { name: string; revenue: number }>();

    data.items.forEach((item) => {
      const name = (item as { products?: { name?: string } }).products?.name ?? 'Unknown';
      const revenue = Number(item.price ?? 0) * Number(item.quantity ?? 0);
      const current = totals.get(name) ?? { name, revenue: 0 };
      totals.set(name, { name, revenue: current.revenue + revenue });
    });

    return Array.from(totals.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [data]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading analytics...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-destructive">Unable to load analytics.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl">Analytics</h3>
        <p className="text-sm text-muted-foreground">Daily revenue and top-performing products.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Revenue (last 7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueSeries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                revenueSeries.map((entry) => (
                  <div key={entry.date} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{entry.label}</span>
                    <span className="font-medium">${entry.revenue.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sales recorded.</p>
              ) : (
                topProducts.map((product) => (
                  <div key={product.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{product.name}</span>
                    <span className="font-medium">${product.revenue.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
