-- Add inventory and sizing details to products
ALTER TABLE public.products
ADD COLUMN quantity INTEGER NOT NULL DEFAULT 0,
ADD COLUMN sizes TEXT[];

-- Backfill sample data for existing products
UPDATE public.products
SET quantity = 18,
    sizes = ARRAY['XS', 'S', 'M', 'L']
WHERE category IN ('Knitwear', 'Dresses', 'Tops', 'Bottoms', 'Outerwear');

UPDATE public.products
SET quantity = 10,
    sizes = NULL
WHERE category = 'Accessories';
