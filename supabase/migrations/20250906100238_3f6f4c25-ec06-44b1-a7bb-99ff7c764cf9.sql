-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product pricing table for different periods
CREATE TABLE public.product_pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  period TEXT NOT NULL, -- 'monthly', 'yearly', 'lifetime', 'custom'
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, period)
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_pricing ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (products are publicly viewable)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Product pricing is viewable by everyone" 
ON public.product_pricing 
FOR SELECT 
USING (is_active = true);

-- Admin policies (will need authentication later)
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage product pricing" 
ON public.product_pricing 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_pricing_updated_at
BEFORE UPDATE ON public.product_pricing
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, icon, features, display_order) VALUES
('License Manager Pro', 'Complete software licensing solution for enterprise applications', 'Shield', 
 ARRAY['Advanced encryption and security', 'Flexible licensing models', 'Real-time analytics', 'API integration', '24/7 support'], 1),
('Quick License', 'Streamlined licensing for small to medium applications', 'Zap',
 ARRAY['Instant license generation', 'Basic analytics', 'Email support', 'Standard encryption'], 2),
('Enterprise Suite', 'Full-scale licensing infrastructure for large organizations', 'Users',
 ARRAY['Multi-tenant architecture', 'Custom integrations', 'Advanced reporting', 'Dedicated support team', 'SLA guarantees'], 3);

-- Insert sample pricing
INSERT INTO public.product_pricing (product_id, period, price) VALUES
-- License Manager Pro
((SELECT id FROM public.products WHERE name = 'License Manager Pro'), 'monthly', 299.00),
((SELECT id FROM public.products WHERE name = 'License Manager Pro'), 'yearly', 2990.00),
-- Quick License
((SELECT id FROM public.products WHERE name = 'Quick License'), 'monthly', 99.00),
((SELECT id FROM public.products WHERE name = 'Quick License'), 'yearly', 990.00),
-- Enterprise Suite
((SELECT id FROM public.products WHERE name = 'Enterprise Suite'), 'custom', NULL);