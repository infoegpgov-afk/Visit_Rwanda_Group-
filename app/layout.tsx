import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rwanda Notice Board - Amakuru • Amatangazo • Amahirwe',
  description: 'Professional Rwanda information platform for news, announcements, jobs, opportunities, education, health, business, events, and tourism.',
  keywords: 'Rwanda, News, Announcements, Jobs, Opportunities, Education, Health, Business, Events, Tourism',
  authors: [{ name: 'Rwanda Notice Board' }],
  openGraph: {
    type: 'website',
    locale: 'rw_RW',
    url: 'https://rwandanoticeboard.rw',
    siteName: 'Rwanda Notice Board',
    title: 'Rwanda Notice Board - Amakuru • Amatangazo • Amahirwe',
    description: 'Professional Rwanda information platform',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rwanda Notice Board',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rwanda Notice Board',
    description: 'Professional Rwanda information platform',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-light text-dark">
        {children}
      </body>
    </html>
  )
}
