'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReportPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add report submission logic here
      toast({
        title: 'Report Submitted',
        description: 'Thank you for helping keep our community safe.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit report. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Report a Scam</h1>

      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Type of Scam
            </label>
            <Input
              required
              placeholder="e.g., OTP Scam, Courier Scam"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              required
              placeholder="Please provide details about the scam..."
              className="w-full min-h-[150px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Evidence (Optional)
            </label>
            <Input type="file" multiple className="w-full" />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </form>
      </Card>

      <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Important Notice</span>
        </div>
        <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
          Your report helps us protect our community. All reports are kept
          confidential and reviewed by our security team.
        </p>
      </div>
    </div>
  );
}