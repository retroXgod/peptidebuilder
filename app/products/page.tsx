'use client'

import Link from 'next/link'
import { peptides } from '@/lib/data'

export default function ProductsPage() {
  // Group peptides by category for better organization
  const categories = {
    'Regenerative & Recovery': peptides.filter(p => ['Regenerative', 'Recovery'].includes(p.category)),
    'Anti-Aging & Skin Health': peptides.filter(p => ['Anti-Aging'].includes(p.category)),
    'Cognitive Enhancement': peptides.filter(p => ['Cognitive'].includes(p.category)),
    'Performance & Strength': peptides.filter(p => ['SARM'].includes(p.category)),
    'Metabolic Health': peptides.filter(p => ['Weight Loss'].includes(p.category)),
    'Sleep & Wellness': peptides.filter(p => ['Sleep', 'Tanning'].includes(p.category)),
    'Growth Hormone': peptides.filter(p => ['Growth Hormone'].includes(p.category))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Regenerative & Recovery': return '🔄'
      case 'Anti-Aging & Skin Health': return '🧬'
      case 'Cognitive Enhancement': return '🧠'
      case 'Performance & Strength': return '💪'
      case 'Metabolic Health': return '🔥'
      case 'Sleep & Wellness': return '😴'
      case 'Growth Hormone': return '📈'
      default: return '🔬'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Regenerative & Recovery': return 'from-green-500 to-emerald-600'
      case 'Anti-Aging & Skin Health': return 'from-purple-500 to-pink-600'
      case 'Cognitive Enhancement': return 'from-blue-500 to-cyan-600'
      case 'Performance & Strength': return 'from-orange-500 to-red-600'
      case 'Metabolic Health': return 'from-red-500 to-pink-600'
      case 'Sleep & Wellness': return 'from-indigo-500 to-purple-600'
      case 'Growth Hormone': return 'from-emerald-500 to-teal-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="min-h-screen medical-bg">
      {/* Header Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-6">
              Research Compounds
            </h1>
            <p className="text-xl text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
              Comprehensive collection of research peptides and compounds organized by therapeutic focus. 
              Each compound includes detailed specifications, dosing protocols, and research applications.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(categories).map((categoryName) => (
              <a
                key={categoryName}
                href={`#${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                className="medical-button-secondary px-6 py-3 text-sm"
              >
                {getCategoryIcon(categoryName)} {categoryName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {Object.entries(categories).map(([categoryName, categoryPeptides]) => (
        <section
          key={categoryName}
          id={categoryName.toLowerCase().replace(/\s+/g, '-')}
          className="py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${getCategoryColor(categoryName)} flex items-center justify-center text-4xl mx-auto mb-6`}>
                {getCategoryIcon(categoryName)}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">
                {categoryName}
              </h2>
              <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
                {categoryPeptides.length} research compounds available for {categoryName.toLowerCase()} applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPeptides.map((peptide) => (
                <div
                  key={peptide.slug}
                  className="gradient-border p-1 group"
                >
                  <div className="bg-dark-card rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-dark-text mb-2">
                          {peptide.name}
                        </h3>
                        <span className={`category-badge category-${peptide.category.toLowerCase().replace(' ', '-')}`}>
                          {peptide.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-medical-accent">
                          ${peptide.priceUsd}
                        </div>
                        <div className="text-sm text-dark-text-secondary">
                          {peptide.form}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-dark-text-secondary text-sm mb-4 flex-grow">
                      {peptide.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-text-secondary">Recommended Dose:</span>
                        <span className="text-dark-text font-mono">{peptide.recommendedDoseMcg}mcg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-text-secondary">Vial Volume:</span>
                        <span className="text-dark-text font-mono">{peptide.vialVolumeMg}mg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-text-secondary">Research Goal:</span>
                        <span className="text-medical-accent">{peptide.goal}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="text-xs text-dark-text-secondary">
                        <strong>Research Applications:</strong>
                      </div>
                      <p className="text-xs text-dark-text leading-relaxed">
                        {peptide.detailedDescription}
                      </p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="text-xs text-dark-text-secondary">
                        <strong>Dosing Protocol:</strong>
                      </div>
                      <p className="text-xs text-dark-text leading-relaxed">
                        {peptide.dosingLogic}
                      </p>
                    </div>
                    
                    <Link
                      href={`/products/${peptide.slug}`}
                      className="medical-button w-full text-center group-hover:bg-medical-accent-hover transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Research Tools CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Ready to Plan Your Research?
            </h2>
            <p className="text-xl text-dark-text-secondary mb-8 max-w-3xl mx-auto">
              Use our advanced peptide builder to calculate precise dosing, optimize cycles, 
              and analyze costs for your research protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/builder"
                className="medical-button text-xl px-12 py-5"
              >
                Launch Research Builder
              </Link>
              <Link
                href="/"
                className="medical-button-secondary text-xl px-12 py-5"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 