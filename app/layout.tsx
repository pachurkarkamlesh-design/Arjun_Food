import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/providers/SessionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arjun FoodLink - Your Campus Food Discovery Platform',
  description: 'Discover the best campus mess near you. Find daily menus, compare prices, read reviews, and never miss a good meal again.',
  keywords: ['mess', 'food', 'campus', 'Pune', 'students', 'meal', 'tiffin', 'canteen'],
  authors: [{ name: 'Arjun FoodLink' }],
  openGraph: {
    title: 'Arjun FoodLink - Your Campus Food Discovery Platform',
    description: 'Discover the best campus mess near you. Find daily menus, compare prices, and read reviews.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#E23744" />
      </head>
      <body className="min-h-screen bg-dark-50">
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1C1C1C',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 20px',
            },
            success: {
              iconTheme: {
                primary: '#48C479',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#E23744',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
