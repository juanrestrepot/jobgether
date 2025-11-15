'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { storage } from '@/lib/storage';

export default function SetupProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    preferredRoles: '',
    location: '',
    linkedInUrl: '',
    resumeUploaded: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    // Redirect if user hasn't registered
    if (!user) {
      router.push('/signup');
      return;
    }

    // Load existing profile if available
    const existingProfile = storage.getProfile();
    if (existingProfile) {
      setFormData((prev) => ({
        ...prev,
        preferredRoles: existingProfile.preferredRoles || '',
        location: existingProfile.location || '',
        linkedInUrl: existingProfile.linkedInUrl || '',
        resumeUploaded: existingProfile.resumeUploaded || false,
      }));
    }
  }, [router, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock file upload - just mark as uploaded
      setFormData((prev) => ({ ...prev, resumeUploaded: true }));
      // Clear LinkedIn URL if resume is uploaded
      setFormData((prev) => ({ ...prev, linkedInUrl: '' }));
    }
  };

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, linkedInUrl: value, resumeUploaded: false }));
    if (errors.linkedInUrl) {
      setErrors((prev) => ({ ...prev, linkedInUrl: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredRoles.trim()) {
      newErrors.preferredRoles = 'Preferred role(s) is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Either LinkedIn URL or Resume must be provided
    if (!formData.linkedInUrl.trim() && !formData.resumeUploaded) {
      newErrors.linkedInUrl = 'Please provide either LinkedIn URL or upload your resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Save profile data to localStorage
      storage.saveProfile({
        preferredRoles: formData.preferredRoles,
        location: formData.location,
        linkedInUrl: formData.linkedInUrl || undefined,
        resumeUploaded: formData.resumeUploaded,
      });

      storage.markStepComplete('profile_setup');

      setIsLoading(false);
      router.push('/matches');
    }, 500);
  };

  const isFormValid = formData.preferredRoles.trim() && 
                      formData.location.trim() && 
                      (formData.linkedInUrl.trim() || formData.resumeUploaded);

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-primary-green">J</span>
            <span className="text-2xl font-bold text-primary-blue">obgether</span>
          </Link>
        </div>

        <ProgressBar currentStep={2} totalSteps={3} label="Profile Setup" />

        <Card className="mb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Help us understand your professional background so we can generate accurate matches.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Preferred role(s)"
              name="preferredRoles"
              type="text"
              value={formData.preferredRoles}
              onChange={handleChange}
              error={errors.preferredRoles}
              placeholder="e.g., Frontend Developer, Product Designer"
              required
            />

            <Input
              label="Location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="Enter your country or city"
              required
            />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <Input
                  name="linkedInUrl"
                  type="url"
                  value={formData.linkedInUrl}
                  onChange={handleLinkedInChange}
                  error={errors.linkedInUrl}
                  placeholder="https://linkedin.com/in/yourprofile"
                  disabled={formData.resumeUploaded}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume (optional)
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={!!formData.linkedInUrl}
                    />
                    <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-primary-blue transition-colors">
                      <span className="text-gray-500">
                        {formData.resumeUploaded ? 'Resume uploaded ✓' : 'Upload in .pdf format'}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                {formData.resumeUploaded && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ Resume uploaded successfully
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!isFormValid || isLoading}
                className="px-8"
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

