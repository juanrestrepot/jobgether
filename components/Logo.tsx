import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

export default function Logo({ size = 'md', className = '', href = '/' }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const LogoContent = () => (
    <div className={`flex items-center ${sizes[size]}`}>
      <span className="font-bold text-primary-green">J</span>
      <span className="font-bold text-primary-blue">obgether</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        <LogoContent />
      </Link>
    );
  }

  return (
    <div className={className}>
      <LogoContent />
    </div>
  );
}

