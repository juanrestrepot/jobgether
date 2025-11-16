import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Nav() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-blue transition">
              FOR TALENT
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary-blue transition">
              FOR COMPANIES
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary-blue transition">
              BLOG
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary-blue transition">
              ABOUT US
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/signup"
              className="text-gray-700 hover:text-primary-blue transition font-medium"
            >
              SIGN IN
            </Link>
            <Link
              href="/signup"
              className="bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-accent-green transition font-medium"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

