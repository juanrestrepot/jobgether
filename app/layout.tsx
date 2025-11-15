import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jobgether - Job Search Made Better',
  description: 'Get matched with remote & hybrid jobs that truly fit your profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

