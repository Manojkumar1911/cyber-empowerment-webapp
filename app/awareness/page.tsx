import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Bell } from 'lucide-react';

export default function AwarenessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Digital Rights Awareness
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-600" />
            Privacy Protection
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Learn about data privacy rights</li>
            <li>• Understand digital footprints</li>
            <li>• Control your online presence</li>
          </ul>
          <Button className="mt-4">Learn More</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-pink-600" />
            Security Measures
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Secure password practices</li>
            <li>• Two-factor authentication</li>
            <li>• Safe browsing habits</li>
          </ul>
          <Button className="mt-4">Explore</Button>
        </Card>
      </div>

      <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Real-time Protection Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-muted-foreground">
              Get notified about potential security threats
            </p>
          </div>
          {/* Add more features */}
        </div>
      </section>
    </div>
  );
}