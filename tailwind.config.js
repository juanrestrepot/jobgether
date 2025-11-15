/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E40AF',
          'blue-light': '#3B82F6',
          green: '#10B981',
          'green-light': '#34D399',
        },
        accent: {
          blue: '#2563EB',
          green: '#059669',
        },
      },
    },
  },
  plugins: [],
}

