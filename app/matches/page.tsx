'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { storage } from '@/lib/storage';
import { mockJobs } from '@/lib/mockJobs';

export default function MatchesPage() {
  const router = useRouter();
  const [user, setUser] = useState(storage.getUser());
  const [profile, setProfile] = useState(storage.getProfile());

  useEffect(() => {
    // Redirect if user hasn't completed profile
    if (!user) {
      router.push('/signup');
      return;
    }
    if (!profile) {
      router.push('/setup-profile');
      return;
    }
  }, [router, user, profile]);

  if (!user || !profile) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <span className="text-2xl font-bold text-primary-green">J</span>
            <span className="text-2xl font-bold text-primary-blue">obgether</span>
          </Link>

          <div className="bg-gradient-to-r from-primary-green to-primary-blue rounded-xl p-6 mb-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Your profile is ready 🎉
            </h1>
            <p className="text-lg opacity-90">
              Here are your personalized job matches
            </p>
          </div>
        </div>

        {/* Premium CTA Banner */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Want deeper insights?
              </h3>
              <p className="text-gray-700">
                Unlock AI-powered optimization and personalized coaching with Premium.
              </p>
            </div>
            <Button variant="secondary" size="lg">
              Try Premium
            </Button>
          </div>
        </Card>

        {/* Job Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col h-full">
                {/* Match Percentage Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <div className="ml-4">
                    <div className="bg-primary-green text-white rounded-full px-3 py-1 text-sm font-bold">
                      {job.matchPercentage}%
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                {job.description && (
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {job.description}
                  </p>
                )}

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="md"
                  className="w-full mt-auto"
                  onClick={() => {
                    // Mock action - in real app would navigate to job details
                    alert(`Viewing details for ${job.title} at ${job.company}`);
                  }}
                >
                  See Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (shouldn't show, but just in case) */}
        {mockJobs.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-600">No matches found. Try updating your profile.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

