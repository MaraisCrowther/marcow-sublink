import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize our customers' success and build solutions that truly solve their problems."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate to stay ahead of the curve in software licensing technology."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from product development to customer support."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We aim to make software licensing accessible and secure for businesses worldwide."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Marcrow IT
              </h1>
              <p className="text-xl text-muted-foreground">
                Empowering software companies with secure, scalable licensing solutions
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2020, Marcrow IT emerged from a simple observation: software companies 
                    were struggling with complex, unreliable licensing systems that hindered their growth 
                    and frustrated their customers.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our founders, with decades of combined experience in software development and 
                    cybersecurity, set out to create a licensing platform that would be both powerful 
                    for developers and seamless for end users.
                  </p>
                  <p className="text-muted-foreground">
                    Today, we serve hundreds of software companies worldwide, protecting millions of 
                    software licenses and enabling businesses to focus on what they do best: creating 
                    amazing software.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">By the Numbers</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">Companies Trust Us</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">10M+</div>
                      <div className="text-sm text-muted-foreground">Licenses Managed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-border text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
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

export default About;