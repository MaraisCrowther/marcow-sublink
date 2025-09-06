import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, BarChart, Lock, RefreshCw, Check } from "lucide-react";

const products = [
  {
    name: "License Manager Pro",
    description: "Complete software licensing solution for enterprise applications",
    icon: Shield,
    features: [
      "Advanced encryption and security",
      "Flexible licensing models",
      "Real-time analytics",
      "API integration",
      "24/7 support"
    ],
    price: "$299/month"
  },
  {
    name: "Quick License",
    description: "Streamlined licensing for small to medium applications",
    icon: Zap,
    features: [
      "Instant license generation",
      "Basic analytics",
      "Email support",
      "Standard encryption"
    ],
    price: "$99/month"
  },
  {
    name: "Enterprise Suite",
    description: "Full-scale licensing infrastructure for large organizations",
    icon: Users,
    features: [
      "Multi-tenant architecture",
      "Custom integrations",
      "Advanced reporting",
      "Dedicated support team",
      "SLA guarantees"
    ],
    price: "Custom pricing"
  }
];

const Products = () => {
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
              {products.map((product, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <product.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <CardDescription className="text-base">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-primary">{product.price}</div>
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
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;