import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Shield, Users } from 'lucide-react';

export default function TrainingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Online Safety Training
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6">
          <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Basic Training</h2>
          <p className="text-muted-foreground mb-4">
            Learn the fundamentals of online safety and security.
          </p>
          <Button className="w-full">Start Course</Button>
        </Card>

        <Card className="p-6">
          <Shield className="w-12 h-12 text-pink-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Advanced Security</h2>
          <p className="text-muted-foreground mb-4">
            Master advanced security techniques and protocols.
          </p>
          <Button className="w-full">Enroll Now</Button>
        </Card>

        <Card className="p-6">
          <Users className="w-12 h-12 text-orange-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Community Support</h2>
          <p className="text-muted-foreground mb-4">
            Connect with peers and share experiences.
          </p>
          <Button className="w-full">Join Community</Button>
        </Card>
      </div>

      {/* Training Modules */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Training Modules</h2>
        <div className="space-y-4">
          {/* Add training modules */}
        </div>
      </section>
    </div>
  );
}