'use client'

import { useState, useEffect } from 'react'
import { peptides, goals, getPeptidesByGoal, type Peptide } from '@/lib/data'

interface CalculationResult {
  dailyDoseMcg: number
  vialsNeeded: number
  totalCost: number
  cycleDuration: number
}

export default function BuilderPage() {
  const [selectedGoal, setSelectedGoal] = useState<string>('')
  const [selectedPeptide, setSelectedPeptide] = useState<string>('')
  const [bodyWeight, setBodyWeight] = useState<number>(70)
  const [cycleLength, setCycleLength] = useState<number>(8)
  const [calculation, setCalculation] = useState<CalculationResult | null>(null)
  const [availablePeptides, setAvailablePeptides] = useState<Peptide[]>([])

  useEffect(() => {
    if (selectedGoal) {
      const filteredPeptides = getPeptidesByGoal(selectedGoal)
      setAvailablePeptides(filteredPeptides)
      setSelectedPeptide('')
    } else {
      setAvailablePeptides([])
      setSelectedPeptide('')
    }
  }, [selectedGoal])

  const calculateResults = () => {
    if (!selectedPeptide) return

    const peptide = peptides.find(p => p.slug === selectedPeptide)
    if (!peptide) return

    const dailyDoseMcg = peptide.recommendedDoseMcg
    const totalDoseMcg = dailyDoseMcg * cycleLength * 7 // Convert weeks to days
    const vialsNeeded = Math.ceil(totalDoseMcg / (peptide.vialVolumeMg * 1000)) // Convert mg to mcg
    const totalCost = vialsNeeded * peptide.priceUsd

    setCalculation({
      dailyDoseMcg,
      vialsNeeded,
      totalCost,
      cycleDuration: cycleLength
    })
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-text mb-4">
            Peptide Builder
          </h1>
          <p className="text-xl text-gray-300">
            Calculate dosing, cycle length, and costs for your research protocol
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-dark-text mb-6">
              Research Parameters
            </h2>

            <div className="space-y-6">
              {/* Goal Selection */}
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">
                  Research Goal
                </label>
                <select
                  id="goal"
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-dark-text focus:border-dark-accent focus:outline-none"
                  aria-label="Select research goal"
                >
                  <option value="">Select a goal...</option>
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Peptide Selection */}
              <div>
                <label htmlFor="peptide" className="block text-sm font-medium text-gray-300 mb-2">
                  Peptide
                </label>
                <select
                  id="peptide"
                  value={selectedPeptide}
                  onChange={(e) => setSelectedPeptide(e.target.value)}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-dark-text focus:border-dark-accent focus:outline-none"
                  disabled={!selectedGoal}
                  aria-label="Select peptide"
                >
                  <option value="">Select a peptide...</option>
                  {availablePeptides.map((peptide) => (
                    <option key={peptide.slug} value={peptide.slug}>
                      {peptide.name} - {peptide.form}
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Weight */}
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                  Body Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(Number(e.target.value))}
                  min="30"
                  max="200"
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-dark-text focus:border-dark-accent focus:outline-none"
                  aria-label="Enter body weight in kilograms"
                />
              </div>

              {/* Cycle Length */}
              <div>
                <label htmlFor="cycle" className="block text-sm font-medium text-gray-300 mb-2">
                  Cycle Length: {cycleLength} weeks
                </label>
                <input
                  type="range"
                  id="cycle"
                  min="4"
                  max="16"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  aria-label="Select cycle length in weeks"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>4 weeks</span>
                  <span>16 weeks</span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateResults}
                disabled={!selectedPeptide}
                className="w-full bg-dark-accent text-dark-bg py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Calculate peptide requirements"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
            <h2 className="text-2xl font-semibold text-dark-text mb-6">
              Research Results
            </h2>

            {calculation ? (
              <div className="space-y-6">
                <div className="bg-dark-bg rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-dark-text mb-4">
                    Dosing Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily Dose:</span>
                      <span className="text-dark-text font-semibold">
                        {calculation.dailyDoseMcg} mcg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cycle Duration:</span>
                      <span className="text-dark-text font-semibold">
                        {calculation.cycleDuration} weeks
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vials Needed:</span>
                      <span className="text-dark-text font-semibold">
                        {calculation.vialsNeeded}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-400">Total Cost:</span>
                      <span className="text-dark-accent font-bold">
                        ${calculation.totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">⚠️ Important Notes</h4>
                  <ul className="text-yellow-300 text-sm space-y-1">
                    <li>• These calculations are for research purposes only</li>
                    <li>• Consult with your research supervisor before starting</li>
                    <li>• Follow proper laboratory safety protocols</li>
                    <li>• Store peptides according to manufacturer guidelines</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <div className="text-6xl mb-4">🧬</div>
                <p>Select your research parameters and click Calculate to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 