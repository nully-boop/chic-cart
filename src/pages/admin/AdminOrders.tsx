import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminOrders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      const { data: orders, error: fetchError } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, status, total, currency, created_at, order_items(id)')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return orders ?? [];
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading orders...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-destructive">Unable to load orders.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl">Orders</h3>
        <p className="text-sm text-muted-foreground">Track recent sales activity.</p>
      </div>

      <div className="rounded-2xl border border-border/70">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{order.customer_name ?? 'Guest'}</p>
                    <p className="text-xs text-muted-foreground">{order.customer_email ?? '-'}</p>
                  </div>
                </TableCell>
                <TableCell>{order.order_items?.length ?? 0}</TableCell>
                <TableCell>
                  {order.currency ?? 'USD'} {Number(order.total ?? 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
