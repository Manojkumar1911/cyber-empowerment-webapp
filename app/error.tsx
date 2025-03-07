'use client';

import { Button } from "../components/ui/button";
import { AlertOctagon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <AlertOctagon className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">
        An error occurred while processing your request.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}