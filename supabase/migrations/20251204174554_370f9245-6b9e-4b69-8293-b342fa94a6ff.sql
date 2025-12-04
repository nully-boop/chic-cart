-- Create products table for e-commerce
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (products are public)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Insert sample products
INSERT INTO public.products (name, price, image_url, description, category) VALUES
('Cashmere Crewneck Sweater', 245, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'Luxuriously soft cashmere sweater in a timeless crewneck silhouette. Perfect for layering or worn alone.', 'Knitwear'),
('Tailored Wool Blazer', 495, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'Impeccably crafted wool blazer with a modern slim fit. Features notched lapels and flap pockets.', 'Outerwear'),
('Silk Midi Dress', 375, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'Elegant silk midi dress with a fluid drape. Features a flattering V-neckline and side slit.', 'Dresses'),
('Premium Cotton Tee', 85, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'Essential heavyweight cotton t-shirt. Relaxed fit with a ribbed crew neck.', 'Tops'),
('High-Rise Trousers', 195, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', 'Refined high-rise trousers in stretch wool. Features a straight leg and pressed creases.', 'Bottoms'),
('Leather Tote Bag', 425, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', 'Spacious leather tote in premium pebbled leather. Interior zip pocket and magnetic closure.', 'Accessories'),
('Merino Wool Cardigan', 285, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800', 'Lightweight merino wool cardigan with mother-of-pearl buttons. Perfect transitional piece.', 'Knitwear'),
('Pleated Midi Skirt', 165, 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj47?w=800', 'Graceful pleated midi skirt in flowing fabric. Elasticated waistband for comfort.', 'Bottoms');