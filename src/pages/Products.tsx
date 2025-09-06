import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, BarChart, Lock, RefreshCw, Check } from "lucide-react";
import { useEffect, useState } from "react";
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

type ProductPricing = {
  id: string;
  period: string;
  price: number | null;
  currency: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  is_active: boolean;
  display_order: number;
  pricing: ProductPricing[];
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products with their pricing
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (productsError) throw productsError;

      // Fetch pricing for all products
      const { data: pricingData, error: pricingError } = await supabase
        .from('product_pricing')
        .select('*')
        .eq('is_active', true);

      if (pricingError) throw pricingError;

      // Combine products with their pricing
      const productsWithPricing = productsData?.map(product => ({
        ...product,
        pricing: pricingData?.filter(pricing => pricing.product_id === product.id) || []
      })) || [];

      setProducts(productsWithPricing);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (pricing: ProductPricing[]) => {
    if (pricing.length === 0) return "Contact Sales";
    
    const monthlyPrice = pricing.find(p => p.period === 'monthly');
    const yearlyPrice = pricing.find(p => p.period === 'yearly');
    const customPrice = pricing.find(p => p.period === 'custom');
    
    if (customPrice) return "Custom Pricing";
    if (monthlyPrice && monthlyPrice.price) {
      return `$${monthlyPrice.price}/month`;
    }
    return "Contact Sales";
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Shield;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-xl">Loading products...</div>
            </div>
          </div>
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
            {products.length === 0 ? (
              <div className="text-center">
                <p className="text-muted-foreground">No products available at the moment.</p>
              </div>
            ) : (
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
                          
                          {/* Show available pricing periods */}
                          {product.pricing.length > 1 && (
                            <div className="flex flex-wrap gap-2">
                              {product.pricing.map((pricing) => (
                                <Badge key={pricing.id} variant="secondary" className="text-xs">
                                  {pricing.period === 'custom' ? 'Custom' : 
                                   pricing.price ? `${pricing.period}: $${pricing.price}` : pricing.period}
                                </Badge>
                              ))}
                            </div>
                          )}

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
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;