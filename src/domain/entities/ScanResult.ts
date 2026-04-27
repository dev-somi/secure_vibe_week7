// domain/entities/ScanResult.ts
export interface VulnerabilityResult {
  check_id: string
  path: string
  start: { line: number; col: number }
  end: { line: number; col: number }
  extra: {
    message: string
    severity: string
    metadata: {
      cwe?: string[]
    }
  }
}