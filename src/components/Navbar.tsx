'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Preview PDF', href: '/preview' },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="text-xl font-bold text-blue-600">
          📄 PDF Generator
        </Link>

        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={
                  'text-gray-700 hover:text-blue-600 font-medium transition' +
                  (pathname === item.href ? ' text-blue-700 font-semibold' : '')
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
