'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

type Phase = 'landing' | 'form' | 'loading' | 'results';

interface JobMatch {
  title: string;
  match: number;
  reasoning: string;
  salary: string;
}

const loadingMessages = [
  'Analyzing global remote market...',
  'Matching your skills...',
  'Finding salary data...',
  'Identifying perfect roles...',
];

export default function PathfinderPage() {
  const [phase, setPhase] = useState<Phase>('landing');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [formData, setFormData] = useState({
    currentRole: '',
    skills: '',
    interests: '',
    incomeGoal: '',
  });
  const [results, setResults] = useState<JobMatch[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Rotate loading messages
  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleStart = () => {
    setPhase('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPhase('loading');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate matches');
      }

      const data = await response.json();
      setResults(data.jobs);
      setPhase('results');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setPhase('form');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getJobgetherUrl = (roleTitle: string) => {
    // Convert role title to slug format (lowercase, spaces to hyphens)
    const slug = roleTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
    
    return `https://jobgether.com/remote-jobs/${slug}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Phase 1: Landing View */}
      {phase === 'landing' && (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00C897] rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-4">
                Stop guessing. Find your perfect remote role in seconds.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
                Analyze your profile with AI and discover the high-paying remote
                jobs you are already qualified for.
              </p>
              <button
                onClick={handleStart}
                className="bg-[#00C897] hover:bg-[#00B085] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Form Input */}
      {phase === 'form' && (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#1F2937] mb-2">
                  Tell us about yourself
                </h2>
                <p className="text-gray-600">
                  We'll use AI to match you with perfect remote opportunities
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="currentRole"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Current Role/Background
                  </label>
                  <input
                    type="text"
                    id="currentRole"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    placeholder="e.g., Retail Store Manager"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00C897] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Top 3 Skills
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., Communication, Excel, Organization"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00C897] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="interests"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    What you enjoy doing
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="e.g., Helping people, solving logic puzzles"
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00C897] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="incomeGoal"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Income Goal (USD/Year)
                  </label>
                  <input
                    type="text"
                    id="incomeGoal"
                    name="incomeGoal"
                    value={formData.incomeGoal}
                    onChange={handleInputChange}
                    placeholder="e.g., 50000"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00C897] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setPhase('landing')}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#00C897] hover:bg-[#00B085] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Analyze My Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Loading State */}
      {phase === 'loading' && (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-[#00C897] animate-spin mb-6" />
                <h3 className="text-2xl font-bold text-[#1F2937] mb-4">
                  {loadingMessages[loadingMessageIndex]}
                </h3>
                <p className="text-gray-600">
                  This usually takes 10-15 seconds...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: Results */}
      {phase === 'results' && (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00C897] rounded-2xl mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
                Your Perfect Remote Roles
              </h2>
              <p className="text-lg text-gray-600">
                Based on your profile, here are 3 roles that match your skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((job, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#1F2937] flex-1">
                      {job.title}
                    </h3>
                    <div className="ml-4">
                      <div className="bg-[#00C897] text-white rounded-full px-3 py-1 text-sm font-bold">
                        {job.match}%
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {job.reasoning}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Estimated Remote Salary:
                    </p>
                    <p className="text-lg font-bold text-[#00C897]">
                      {job.salary}
                    </p>
                  </div>

                  <a
                    href={getJobgetherUrl(job.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00C897] hover:bg-[#00B085] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-auto"
                  >
                    View {job.title} jobs on Jobgether
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setPhase('landing');
                  setFormData({
                    currentRole: '',
                    skills: '',
                    interests: '',
                    incomeGoal: '',
                  });
                  setResults([]);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

