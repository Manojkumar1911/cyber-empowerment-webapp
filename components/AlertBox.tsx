'use client';

import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface AlertBoxProps {
  title?: string;
  message: string;
  type?: 'warning' | 'danger' | 'info';
  onClose?: () => void;
}

export default function AlertBox({
  title,
  message,
  type = 'warning',
  onClose,
}: AlertBoxProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const alertStyles = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-800 dark:text-yellow-200',
    danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-800 dark:text-red-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-800 dark:text-blue-200',
  };

  return (
    <Card className={`border-2 ${alertStyles[type]} p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5" />
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm opacity-90">{message}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 -mt-1 -mr-2"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}