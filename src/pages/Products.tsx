import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, BarChart, Lock, RefreshCw, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Icon mapping for dynamic icons
const iconMap = {
  Shield,
  Zap,
  Users,
  BarChart,
  Lock,
  RefreshCw
};

type Product = {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  is_active: boolean;
  display_order: number;
  pricing: Array<{
    period: string;
    price: number | null;
    currency: string;
  }>;
};

const Products = () => {
  // Fetch products and their pricing
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (productsError) throw productsError;

      // Fetch pricing for each product
      const productsWithPricing = await Promise.all(
        products.map(async (product) => {
          const { data: pricing, error: pricingError } = await supabase
            .from('product_pricing')
            .select('period, price, currency')
            .eq('product_id', product.id)
            .eq('is_active', true);

          if (pricingError) throw pricingError;

          return {
            ...product,
            pricing: pricing || []
          };
        })
      );

      return productsWithPricing as Product[];
    }
  });

  const formatPrice = (pricing: Product['pricing']) => {
    if (!pricing || pricing.length === 0) return 'Contact us';
    
    const monthly = pricing.find(p => p.period === 'monthly');
    const yearly = pricing.find(p => p.period === 'yearly');
    const custom = pricing.find(p => p.period === 'custom');
    
    if (custom) return 'Custom pricing';
    if (monthly) return `$${monthly.price}/month`;
    if (yearly) return `$${yearly.price}/year`;
    
    return 'Contact us';
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Shield;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-12 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-6 bg-muted rounded w-96 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Products
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose the perfect licensing solution for your software needs
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const IconComponent = getIcon(product.icon);
                return (
                  <Card key={product.id} className="border-border hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <CardDescription className="text-base">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-primary">
                          {formatPrice(product.pricing)}
                        </div>
                        <ul className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-primary" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-6">Get Started</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;