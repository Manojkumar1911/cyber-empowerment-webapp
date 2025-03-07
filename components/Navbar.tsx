'use client';

//import { Button } from '@/components/ui/button';
//import { ModeToggle } from '@/components/ui/mode-toggle';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-600" />
          <span className="font-bold text-lg">Cyber Empowerment</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/awareness"
            className={`hover:text-purple-600 transition-colors ${
              pathname === '/awareness' ? 'text-purple-600' : ''
            }`}
          >
            Awareness
          </Link>
          <Link
            href="/training"
            className={`hover:text-purple-600 transition-colors ${
              pathname === '/training' ? 'text-purple-600' : ''
            }`}
          >
            Training
          </Link>
          <Link
            href="/report"
            className={`hover:text-purple-600 transition-colors ${
              pathname === '/report' ? 'text-purple-600' : ''
            }`}
          >
            Report
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
}