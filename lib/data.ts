import peptidesData from '../data/peptides.json'

export interface Peptide {
  slug: string
  name: string
  form: string
  category: string
  goal: string
  description: string
  detailedDescription: string
  recommendedDoseMcg: number
  vialVolumeMg: number
  priceUsd: number
  dosingLogic: string
}

export const peptides: Peptide[] = peptidesData as Peptide[]

export const goals = [
  'Skin Health',
  'Mental Sharpness', 
  'Physical Strength',
  'Weight Loss',
  'Sleep',
  'Recovery'
] as const

export const getPeptidesByGoal = (goal: string): Peptide[] => {
  return peptides.filter(peptide => peptide.goal === goal)
}

export const getPeptideBySlug = (slug: string): Peptide | undefined => {
  return peptides.find(peptide => peptide.slug === slug)
} 