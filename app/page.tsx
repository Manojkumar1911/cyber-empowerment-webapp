import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Camera, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Empowering Women in the Digital World
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Secure your digital presence with our comprehensive platform designed for
          women in remote areas. Stay protected, informed, and connected.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/awareness">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/training">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6">
          <Shield className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Digital Rights</h2>
          <p className="text-muted-foreground">
            Learn about your digital rights and how to protect your online privacy
            with our comprehensive guides.
          </p>
        </Card>

        <Card className="p-6">
          <Camera className="w-12 h-12 text-pink-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Camera Security</h2>
          <p className="text-muted-foreground">
            Control and monitor camera access with our advanced security features
            and real-time alerts.
          </p>
        </Card>

        <Card className="p-6">
          <AlertTriangle className="w-12 h-12 text-orange-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Scam Protection</h2>
          <p className="text-muted-foreground">
            Stay safe from online scams with our OTP verification system and
            real-time threat detection.
          </p>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
        <p className="text-lg mb-6 text-muted-foreground">
          Join our community of empowered women and learn how to protect yourself
          online.
        </p>
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
          Start Your Journey
        </Button>
      </section>
    </div>
  );
}