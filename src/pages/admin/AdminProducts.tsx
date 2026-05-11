import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '@/types/product';

export default function AdminProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: async (): Promise<Product[]> => {
      const { data: products, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return products ?? [];
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading products...</p>;
  }

  if (error || !data) {
    return <p className="text-sm text-destructive">Unable to load products.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-serif text-2xl">Products</h3>
          <p className="text-sm text-muted-foreground">Manage catalog inventory and pricing.</p>
        </div>
        <Button asChild className="rounded-full">
          <Link to="/admin/products/new">Create product</Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/70">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category ?? '-'}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.sizes?.join(', ') ?? '-'}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
