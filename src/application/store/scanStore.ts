import { create } from 'zustand'
import { VulnerabilityResult } from '../../domain/entities/ScanResult'

interface ScanStore {
    results: VulnerabilityResult[]
    setResults: (results: VulnerabilityResult[]) => void
}

export const useScanStore = create<ScanStore>((set) => ({
    results: [],
    setResults: (results) => set({ results }),
}))