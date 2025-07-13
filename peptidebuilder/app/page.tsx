import Link from 'next/link'
import { peptides } from '@/lib/data'

export default function HomePage() {
  const featuredPeptides = peptides.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-card to-dark-bg py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-dark-text mb-6">
            Research Peptide Builder
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate precise dosing, cycle lengths, and costs for research peptides. 
            Designed for research purposes only.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/builder"
              className="bg-dark-accent text-dark-bg px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              Start Building
            </Link>
            <Link
              href="/products"
              className="border border-dark-accent text-dark-accent px-8 py-3 rounded-lg font-semibold hover:bg-dark-accent hover:text-dark-bg transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
            Research Goals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Skin Health',
                description: 'Anti-aging peptides for collagen synthesis and skin regeneration',
                icon: '🧬',
                color: 'from-pink-500 to-purple-600'
              },
              {
                title: 'Mental Sharpness',
                description: 'Nootropic peptides for cognitive enhancement and memory',
                icon: '🧠',
                color: 'from-blue-500 to-cyan-600'
              },
              {
                title: 'Physical Strength',
                description: 'SARMs and peptides for muscle building and recovery',
                icon: '💪',
                color: 'from-green-500 to-emerald-600'
              },
              {
                title: 'Weight Loss',
                description: 'Fat-burning peptides for metabolic optimization',
                icon: '🔥',
                color: 'from-orange-500 to-red-600'
              },
              {
                title: 'Sleep',
                description: 'Sleep-inducing peptides for better rest and recovery',
                icon: '😴',
                color: 'from-indigo-500 to-purple-600'
              },
              {
                title: 'Recovery',
                description: 'Healing peptides for tissue repair and regeneration',
                icon: '🔄',
                color: 'from-teal-500 to-blue-600'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-dark-card rounded-lg p-6 border border-gray-800 hover:border-dark-accent transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
            Featured Research Peptides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPeptides.map((peptide) => (
              <div
                key={peptide.slug}
                className="bg-dark-bg rounded-lg p-6 border border-gray-800 hover:border-dark-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-dark-text">
                    {peptide.name}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {peptide.form}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {peptide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-dark-accent font-semibold">
                    ${peptide.priceUsd}
                  </span>
                  <Link
                    href={`/products/${peptide.slug}`}
                    className="text-dark-accent hover:text-purple-400 text-sm font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="bg-dark-accent text-dark-bg px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark-text mb-6">
            Ready to Start Your Research?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Use our peptide builder to calculate precise dosing, cycle lengths, and costs for your research protocols.
          </p>
          <Link
            href="/builder"
            className="bg-dark-accent text-dark-bg px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-600 transition-colors"
          >
            Launch Peptide Builder
          </Link>
        </div>
      </section>
    </div>
  )
} 