import { ScanMode } from '../../domain/entities/ScanType'
import { VulnerabilityResult } from '../../domain/entities/ScanResult'

export interface ScanPayload {
  mode: ScanMode
  files: File[]
  code: string
  language: string
  githubUrl?: string
}

export async function executeScan(payload: ScanPayload): Promise<VulnerabilityResult[]> {
  if (payload.mode === 'UPLOAD_FILES' && payload.files.length === 0) {
    throw new Error('No content provided for scanning')
  }
  if (payload.mode === 'DIRECT_CODE' && !payload.code.trim()) {
    throw new Error('No content provided for scanning')
  }
  if (payload.mode === 'GITHUB_URL' && !payload.githubUrl?.trim()) {
    throw new Error('GitHub URL is required')
  }

  const formData = new FormData()

  if (payload.mode === 'UPLOAD_FILES') {
    formData.append('code_file', payload.files[0])
  } else if (payload.mode === 'DIRECT_CODE') {
    formData.append('code_text', payload.code)
    formData.append('language', payload.language)
  } else if (payload.mode === 'GITHUB_URL') {
    formData.append('codeurl', payload.githubUrl!)
  }

  const response = await fetch('http://localhost:8000/scan', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Scan failed')
  }

  return data as VulnerabilityResult[]
}
