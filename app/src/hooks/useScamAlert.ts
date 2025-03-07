'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ScamReport {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
}

export function useScamAlert() {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ScamReport[]>([]);
  const { toast } = useToast();

  const verifyOTP = async (otp: string, serviceProvider: string, context?: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'verify',
          otp,
          serviceProvider,
          context,
        }),
      });

      const data = await response.json();

      if (data.warning) {
        toast({
          title: 'Potential Scam Detected',
          description: data.message,
          variant: 'destructive',
        });
      }

      return data;
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      toast({
        title: 'Verification Failed',
        description: 'Unable to verify OTP security.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const reportScam = async (type: string, description: string, evidence?: string[]) => {
    try {
      setLoading(true);
      const response = await fetch('/api/scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'report',
          scamType: type,
          description,
          evidence,
        }),
      });

      const data = await response.json();

      toast({
        title: 'Report Submitted',
        description: 'Thank you for helping keep our community safe.',
      });

      return data;
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast({
        title: 'Submission Failed',
        description: 'Unable to submit scam report.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/scam');
      const data = await response.json();
      setReports(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      toast({
        title: 'Fetch Failed',
        description: 'Unable to fetch your reports.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    reports,
    verifyOTP,
    reportScam,
    getUserReports,
  };
}