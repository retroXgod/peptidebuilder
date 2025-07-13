import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptideBySlug } from '@/lib/data'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const peptide = getPeptideBySlug(params.slug)

  if (!peptide) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/products" className="text-dark-accent hover:text-purple-400">
            ← Back to Products
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-dark-card rounded-lg border border-gray-800 overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
              <div className="text-8xl">🧬</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-dark-text mb-2">
                {peptide.name}
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                {peptide.form}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-dark-accent/20 text-dark-accent text-sm rounded-full">
                  {peptide.category}
                </span>
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                  {peptide.goal}
                </span>
              </div>
            </div>

            <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-dark-text mb-4">
                Product Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Recommended Dose:</span>
                  <span className="text-dark-text font-semibold">
                    {peptide.recommendedDoseMcg} mcg/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vial Volume:</span>
                  <span className="text-dark-text font-semibold">
                    {peptide.vialVolumeMg} mg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-dark-accent font-bold text-xl">
                    ${peptide.priceUsd}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-dark-text mb-4">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {peptide.detailedDescription}
              </p>
            </div>

            <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-dark-text mb-4">
                Dosing Logic
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {peptide.dosingLogic}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/builder"
                className="flex-1 bg-dark-accent text-dark-bg py-3 rounded-lg font-semibold text-center hover:bg-purple-600 transition-colors"
              >
                Add to Builder
              </Link>
              <Link
                href="/products"
                className="flex-1 border border-dark-accent text-dark-accent py-3 rounded-lg font-semibold text-center hover:bg-dark-accent hover:text-dark-bg transition-colors"
              >
                Browse More
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-red-900/20 border border-red-700 rounded-lg p-6">
          <h3 className="text-red-400 font-semibold mb-3">⚠️ Important Disclaimer</h3>
          <p className="text-red-300 text-sm leading-relaxed">
            Research Use Only. Not intended for human consumption. This peptide builder is not a replacement 
            for medical advice. Always consult your personal practitioner before making any medical decisions. 
            These products are for laboratory research purposes only and should be handled according to proper 
            laboratory safety protocols.
          </p>
        </div>
      </div>
    </div>
  )
} 