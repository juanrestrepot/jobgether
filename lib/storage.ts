// localStorage utilities for managing user data and state

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface Profile {
  preferredRoles: string;
  location: string;
  linkedInUrl?: string;
  resumeUploaded?: boolean;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  matchPercentage: number;
  tags: string[];
  description?: string;
}

const STORAGE_KEYS = {
  USER: 'jobgether_user',
  PROFILE: 'jobgether_profile',
  COMPLETED_STEPS: 'jobgether_completed_steps',
};

export const storage = {
  // User data
  saveUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Profile data
  saveProfile: (profile: Profile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }
  },

  getProfile: (): Profile | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Step completion tracking
  markStepComplete: (step: string) => {
    if (typeof window !== 'undefined') {
      const completed = storage.getCompletedSteps();
      if (!completed.includes(step)) {
        completed.push(step);
        localStorage.setItem(STORAGE_KEYS.COMPLETED_STEPS, JSON.stringify(completed));
      }
    }
  },

  getCompletedSteps: (): string[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS);
      return data ? JSON.parse(data) : [];
    }
    return [];
  },

  // Clear all data (for testing/reset)
  clearAll: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_STEPS);
    }
  },
};

