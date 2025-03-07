import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-lg">Cyber Empowerment</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering women in remote areas with digital security and awareness.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/awareness" className="text-sm text-muted-foreground hover:text-purple-600">
                  Digital Rights
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-muted-foreground hover:text-purple-600">
                  Safety Training
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-sm text-muted-foreground hover:text-purple-600">
                  Report Scam
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-purple-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-purple-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-purple-600">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                support@cyberempowerment.org
              </li>
              <li className="text-sm text-muted-foreground">
                Emergency Helpline: +1 (800) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cyber Empowerment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}