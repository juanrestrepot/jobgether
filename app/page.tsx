'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Nav from '@/components/Nav';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image Grid Placeholder */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-xl"></div>
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-xl"></div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square bg-gradient-to-br from-blue-200 to-green-200 rounded-xl"></div>
              <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-200 rounded-xl"></div>
            </div>
            <div className="col-span-2">
              <div className="aspect-video bg-gradient-to-br from-blue-100 via-green-100 to-blue-100 rounded-xl"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Job search is{' '}
                <span className="text-primary-blue">broken</span>. You deserve{' '}
                <span className="text-primary-blue">better</span>.
              </h1>
              <p className="text-xl text-gray-600">
                We match you, guide you, and get you noticed.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-green flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Get matched with remote & hybrid jobs that truly{' '}
                  <strong>fit your skills</strong>
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-green flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Receive a{' '}
                  <strong>personalized skills and career assessment</strong>
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-green flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Optimize your CV and LinkedIn with{' '}
                  <strong>guided AI recommendations</strong>
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-green flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Get pushed directly to{' '}
                  <strong>hiring managers when you match</strong>
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8"
              >
                Start My Match
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-gray-600 text-sm">
                Used by <strong>8,791,606</strong> professionals to land remote and hybrid jobs faster.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

