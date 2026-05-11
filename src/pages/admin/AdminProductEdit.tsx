import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

const parseSizes = (value: string) => {
  const sizes = value
    .split(',')
    .map((size) => size.trim())
    .filter(Boolean);
  return sizes.length ? sizes : null;
};

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    sizes: '',
    image_url: '',
    description: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'product', id],
    queryFn: async (): Promise<Product> => {
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!product) throw new Error('Product not found');
      return product;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;
    setFormState({
      name: data.name ?? '',
      category: data.category ?? '',
      price: String(data.price ?? ''),
      quantity: String(data.quantity ?? ''),
      sizes: data.sizes?.join(', ') ?? '',
      image_url: data.image_url ?? '',
      description: data.description ?? '',
    });
  }, [data]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!id) return;
    setIsSubmitting(true);

    const { error: updateError } = await supabase
      .from('products')
      .update({
        name: formState.name.trim(),
        category: formState.category.trim() || null,
        price: Number(formState.price),
        quantity: Number(formState.quantity),
        sizes: parseSizes(formState.sizes),
        image_url: formState.image_url.trim(),
        description: formState.description.trim() || null,
      })
      .eq('id', id);

    if (updateError) {
      toast.error(updateError.message);
      setIsSubmitting(false);
      return;
    }

    toast.success('Product updated.');
    navigate('/admin/products');
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading product...</p>;
  }

  if (error) {
    return <p className="text-sm text-destructive">Unable to load product.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl">Edit product</h3>
        <p className="text-sm text-muted-foreground">Update product details and inventory.</p>
      </div>

      <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-2xl border border-border/70 p-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input
              id="name"
              value={formState.name}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formState.category}
              onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formState.price}
                onChange={(event) => setFormState((prev) => ({ ...prev, price: event.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formState.quantity}
                onChange={(event) => setFormState((prev) => ({ ...prev, quantity: event.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sizes">Sizes (comma separated)</Label>
            <Input
              id="sizes"
              value={formState.sizes}
              onChange={(event) => setFormState((prev) => ({ ...prev, sizes: event.target.value }))}
              placeholder="XS, S, M, L"
            />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border/70 p-6">
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formState.image_url}
              onChange={(event) => setFormState((prev) => ({ ...prev, image_url: event.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formState.description}
              onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
              rows={6}
            />
          </div>
          <Button className="w-full rounded-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Update product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
