'use client'

import { useState } from 'react'
import Link from 'next/link'
import { peptides, goals, type Peptide } from '@/lib/data'

export default function ProductsPage() {
  const [selectedGoal, setSelectedGoal] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = Array.from(new Set(peptides.map(p => p.category)))

  const filteredPeptides = peptides.filter(peptide => {
    const goalMatch = !selectedGoal || peptide.goal === selectedGoal
    const categoryMatch = !selectedCategory || peptide.category === selectedCategory
    return goalMatch && categoryMatch
  })

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-text mb-4">
            Research Peptides
          </h1>
          <p className="text-xl text-gray-300">
            Browse our comprehensive catalog of research peptides
          </p>
        </div>

        {/* Filters */}
        <div className="bg-dark-card rounded-lg p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold text-dark-text mb-4">Filters</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="goal-filter" className="block text-sm font-medium text-gray-300 mb-2">
                Research Goal
              </label>
              <select
                id="goal-filter"
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-dark-text focus:border-dark-accent focus:outline-none"
              >
                <option value="">All Goals</option>
                {goals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-dark-text focus:border-dark-accent focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeptides.map((peptide) => (
            <div
              key={peptide.slug}
              className="bg-dark-card rounded-lg border border-gray-800 hover:border-dark-accent transition-colors overflow-hidden"
            >
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <div className="text-4xl">🧬</div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-dark-text">
                    {peptide.name}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {peptide.form}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-dark-accent/20 text-dark-accent text-xs rounded-full">
                    {peptide.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                    {peptide.goal}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {peptide.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-dark-accent font-bold text-lg">
                    ${peptide.priceUsd}
                  </span>
                  <Link
                    href={`/products/${peptide.slug}`}
                    className="bg-dark-accent text-dark-bg px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPeptides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No peptides found matching your filters</p>
            <button
              onClick={() => {
                setSelectedGoal('')
                setSelectedCategory('')
              }}
              className="mt-4 bg-dark-accent text-dark-bg px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 