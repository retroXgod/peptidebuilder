import Link from 'next/link'
import { peptides } from '@/lib/data'

export default function HomePage() {
  const featuredPeptides = peptides.slice(0, 6)
  
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
      {/* Hero Section with Glass Morphism */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/20 via-medical-secondary/10 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="glass rounded-2xl p-12 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-dark-text mb-6 bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              Research Peptide Builder
            </h1>
            <p className="text-xl md:text-2xl text-dark-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced research peptide calculator with precise dosing, cycle optimization, and cost analysis. 
              Designed for professional research applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/builder"
                className="medical-button text-lg px-10 py-4"
              >
                Launch Builder
              </Link>
              <Link
                href="/products"
                className="medical-button-secondary text-lg px-10 py-4"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Research Categories
            </h2>
            <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
              Comprehensive collection of research compounds organized by therapeutic focus and application
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(categories).map(([categoryName, categoryPeptides]) => (
              <div
                key={categoryName}
                className="medical-card group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getCategoryColor(categoryName)} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {getCategoryIcon(categoryName)}
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-3">
                  {categoryName}
                </h3>
                <p className="text-dark-text-secondary mb-4 text-sm leading-relaxed">
                  {categoryPeptides.length} research compounds available
                </p>
                <div className="space-y-2">
                  {categoryPeptides.slice(0, 3).map((peptide) => (
                    <div key={peptide.slug} className="flex items-center justify-between text-sm">
                      <span className="text-dark-text">{peptide.name}</span>
                      <span className="text-medical-accent font-mono">${peptide.priceUsd}</span>
                    </div>
                  ))}
                  {categoryPeptides.length > 3 && (
                    <div className="text-medical-accent text-sm font-medium">
                      +{categoryPeptides.length - 3} more compounds
                    </div>
                  )}
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center text-medical-accent hover:text-medical-accent-hover mt-4 text-sm font-medium group-hover:translate-x-1 transition-transform"
                >
                  View All →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Enhanced Cards */}
      <section className="py-16 px-4 bg-dark-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Featured Research Compounds
            </h2>
            <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
              Premium selection of research peptides with detailed specifications and dosing protocols
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPeptides.map((peptide) => (
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
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="medical-button text-lg px-8 py-4"
            >
              Explore All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Research Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Advanced Research Tools
            </h2>
            <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
              Professional-grade calculators and analysis tools for comprehensive research planning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Dose Calculator',
                description: 'Precise dosing calculations based on body weight, research goals, and compound specifications',
                icon: '🧮',
                color: 'from-blue-500 to-cyan-600'
              },
              {
                title: 'Cycle Planner',
                description: 'Optimize research cycles with advanced scheduling and protocol management',
                icon: '📅',
                color: 'from-green-500 to-emerald-600'
              },
              {
                title: 'Cost Analysis',
                description: 'Comprehensive cost breakdown including supplies, equipment, and compound costs',
                icon: '💰',
                color: 'from-purple-500 to-pink-600'
              },
              {
                title: 'Protocol Builder',
                description: 'Create custom research protocols with detailed documentation and safety guidelines',
                icon: '📋',
                color: 'from-orange-500 to-red-600'
              },
              {
                title: 'Progress Tracker',
                description: 'Monitor research progress with data visualization and milestone tracking',
                icon: '📊',
                color: 'from-indigo-500 to-purple-600'
              },
              {
                title: 'Safety Monitor',
                description: 'Comprehensive safety monitoring and adverse event tracking system',
                icon: '🛡️',
                color: 'from-red-500 to-pink-600'
              }
            ].map((tool, index) => (
              <div
                key={index}
                className="medical-card group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-3">
                  {tool.title}
                </h3>
                <p className="text-dark-text-secondary text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Ready to Begin Your Research?
            </h2>
            <p className="text-xl text-dark-text-secondary mb-8 max-w-3xl mx-auto">
              Access our comprehensive peptide builder with advanced dosing algorithms, 
              cycle optimization, and professional research protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/builder"
                className="medical-button text-xl px-12 py-5"
              >
                Launch Research Builder
              </Link>
              <Link
                href="/products"
                className="medical-button-secondary text-xl px-12 py-5"
              >
                Browse Compounds
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 