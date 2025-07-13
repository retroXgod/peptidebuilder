import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import DisclaimerBanner from '@/components/DisclaimerBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Research Peptide Builder',
  description: 'Calculate dosing and costs for research peptides. Research use only.',
  keywords: 'peptides, research, dosing, calculator, BPC-157, TB-500, GHK-Cu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-bg text-dark-text min-h-screen`}>
        <DisclaimerBanner />
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-dark-card mt-20 py-8 px-4">
          <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
            <p className="mb-4">
              These products are for research purposes only and are not intended for human consumption. 
              This peptide builder is not a replacement for medical advice. Always consult your personal 
              practitioner before making any medical decision.
            </p>
            <p>&copy; 2024 Research Peptide Builder. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 