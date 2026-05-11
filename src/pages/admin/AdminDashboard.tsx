import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      const [productRes, orderRes, revenueRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id', { count: 'exact' }),
        supabase.from('orders').select('total'),
      ]);

      if (productRes.error) throw productRes.error;
      if (orderRes.error) throw orderRes.error;
      if (revenueRes.error) throw revenueRes.error;

      const totalRevenue = (revenueRes.data ?? []).reduce(
        (sum, order) => sum + Number(order.total ?? 0),
        0
      );

      return {
        totalProducts: productRes.count ?? 0,
        totalOrders: orderRes.count ?? 0,
        totalRevenue,
      };
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading overview...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-destructive">Unable to load dashboard.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl">Overview</h3>
        <p className="text-sm text-muted-foreground">Track sales performance and store activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-3xl">${data.totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-3xl">{data.totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-serif text-3xl">{data.totalProducts}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
