import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, BarChart, Lock, RefreshCw } from "lucide-react";

// Force cache refresh

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Advanced encryption, secure key generation, and comprehensive audit trails to protect your software assets."
  },
  {
    icon: Zap,
    title: "Instant License Generation",
    description: "Generate and distribute software licenses in seconds with our automated licensing system."
  },
  {
    icon: Users,
    title: "Multi-Tier Licensing",
    description: "Support for individual, team, and enterprise licensing models with flexible pricing tiers."
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description: "Real-time insights into license usage, revenue tracking, and customer behavior patterns."
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Granular permissions and role-based access control for administrators and end users."
  },
  {
    icon: RefreshCw,
    title: "Automated Renewals",
    description: "Seamless subscription management with automated billing and license renewals."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Software Licensing
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive features designed to streamline your software distribution 
            and license management processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};