import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    yearlyPrice: "$290",
    yearlyPeriod: "/year",
    discount: "17% off",
    description: "Perfect for individual developers and small projects",
    features: [
      "Up to 100 licenses",
      "Basic analytics",
      "Email support",
      "Standard security",
      "License key generation",
      "Basic API access"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month", 
    yearlyPrice: "$790",
    yearlyPeriod: "/year",
    discount: "17% off",
    description: "Ideal for growing businesses and development teams",
    features: [
      "Up to 1,000 licenses",
      "Advanced analytics",
      "Priority support",
      "Enhanced security",
      "Custom license templates",
      "Full API access",
      "Multi-user management",
      "Webhook integrations"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    yearlyPrice: "$1990",
    yearlyPeriod: "/year", 
    discount: "17% off",
    description: "For large organizations with complex requirements",
    features: [
      "Unlimited licenses",
      "Real-time analytics",
      "24/7 phone support",
      "Enterprise security",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label options",
      "Advanced reporting",
      "Custom workflows"
    ],
    popular: false
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-border ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="line-through">{plan.yearlyPrice}{plan.yearlyPeriod}</span>
                    <span className="ml-2 text-accent font-medium">{plan.discount}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  Start Free Trial
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? Contact us for enterprise pricing.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};