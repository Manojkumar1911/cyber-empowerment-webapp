'use client';

import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ScamAlert {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

interface ScamContextType {
  alerts: ScamAlert[];
  addAlert: (alert: Omit<ScamAlert, 'id' | 'timestamp'>) => void;
  clearAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

const ScamContext = createContext<ScamContextType | undefined>(undefined);

export function ScamProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<ScamAlert[]>([]);
  const { toast } = useToast();

  const addAlert = (alert: Omit<ScamAlert, 'id' | 'timestamp'>) => {
    const newAlert: ScamAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    setAlerts((prev) => [...prev, newAlert]);

    // Show toast notification for high severity alerts
    if (alert.severity === 'high') {
      toast({
        title: 'High Security Alert',
        description: alert.message,
        variant: 'destructive',
      });
    }
  };

  const clearAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  return (
    <ScamContext.Provider
      value={{
        alerts,
        addAlert,
        clearAlert,
        clearAllAlerts,
      }}
    >
      {children}
    </ScamContext.Provider>
  );
}

export function useScam() {
  const context = useContext(ScamContext);
  if (context === undefined) {
    throw new Error('useScam must be used within a ScamProvider');
  }
  return context;
}