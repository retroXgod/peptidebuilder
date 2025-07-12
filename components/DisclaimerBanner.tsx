'use client'

import { useState } from 'react'

export default function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-900 border-b border-red-700 text-white px-4 py-3 relative">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p className="font-medium">
          ⚠️ RESEARCH USE ONLY - These products are for research purposes only and are not intended for human consumption. 
          This peptide builder is not a replacement for medical advice. Always consult your personal practitioner before making any medical decision.
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close disclaimer"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
} 