# Jobgether Prototype

A frontend-only prototype of Jobgether's core funnel (Landing → Registration → Profile Setup → Matches) built with Next.js, React, and TailwindCSS.

## Features

- **Landing Page**: Modern hero section with clear value proposition and single CTA
- **Registration**: Simplified signup flow with social login options
- **Profile Setup**: Single-step profile completion with progress indicator
- **Matches Screen**: Personalized job matches with mock data

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **localStorage** for state management (no backend)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /page.tsx              # Landing page
  /signup/page.tsx       # Registration step
  /setup-profile/page.tsx # Profile setup
  /matches/page.tsx      # Matches screen
/components
  Button.tsx             # Reusable button component
  Card.tsx               # Card container component
  Input.tsx              # Form input component
  Nav.tsx                # Navigation component
  ProgressBar.tsx        # Progress indicator
/lib
  storage.ts             # localStorage utilities
  mockJobs.ts            # Mock job data
```

## Flow

1. **Landing** (`/`) → Click "Start My Match"
2. **Registration** (`/signup`) → Fill form or use social login
3. **Profile Setup** (`/setup-profile`) → Complete profile information
4. **Matches** (`/matches`) → View personalized job matches

All data is stored in localStorage and persists across page refreshes.

## Design

- Modern, clean UI with rounded corners and soft shadows
- Blue/green gradient color scheme inspired by Jobgether
- Fully responsive layout
- Consistent component system

