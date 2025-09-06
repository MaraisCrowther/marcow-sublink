/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, required)
      - `icon` (text, optional)
      - `features` (text array, optional)
      - `is_active` (boolean, default true)
      - `display_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to active products
    - Add policy for authenticated users to manage products

  3. Triggers
    - Add trigger to automatically update `updated_at` timestamp
*/

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text,
  features text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO public
  USING (auth.uid() IS NOT NULL);

-- Create function to update updated_at timestamp if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();