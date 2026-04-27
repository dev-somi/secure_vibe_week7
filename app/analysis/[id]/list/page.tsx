'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { use } from 'react'
import { dummyAnalysisData, Vulnerability } from '@/src/presentation/mock/dummyData'
import { AlertCircle, FileCode2, ArrowLeft, ChevronRight } from 'lucide-react'

export default function VulnerabilityListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  // Mock data usage
  const data = dummyAnalysisData

  const getSeverityStyles = (severity: Vulnerability['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700'
      case 'high':
        return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700'
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-700'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getSeverityBadge = (severity: Vulnerability['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="bg-red-100 text-red-800 border border-red-200 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">Critical</span>
      case 'high':
        return <span className="bg-orange-100 text-orange-800 border border-orange-200 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">High</span>
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">Medium</span>
      case 'low':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">Low</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 flex flex-col pt-12 max-w-5xl mx-auto w-full px-4 mb-20">
        
        {/* Header */}
        <div className="mb-8">
          <Link href={`/analysis/${id}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-obsidian-green mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            대시보드로 돌아가기
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">발견된 취약점 목록</h1>
              <p className="text-gray-500 mt-2">총 {data.vulnerabilities.length}개의 보안 위협이 확인되었습니다.</p>
            </div>
          </div>
        </div>

        {/* Vulnerability List */}
        <div className="space-y-4">
          {data.vulnerabilities.map((vuln) => (
            <div 
              key={vuln.vuln_id}
              onClick={() => router.push(`/analysis/${id}/${vuln.vuln_id}`)}
              className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer hover:shadow-md transition-all ${getSeverityStyles(vuln.severity)}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <AlertCircle className="w-6 h-6 opacity-80" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{vuln.content.title}</h3>
                    {getSeverityBadge(vuln.severity)}
                  </div>
                  <div className="flex items-center text-sm opacity-80 mt-2 font-mono">
                    <FileCode2 className="w-4 h-4 mr-1.5" />
                    <span>{vuln.content.file}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span>Line {vuln.line_number}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 opacity-50" />
            </div>
          ))}
          
          {data.vulnerabilities.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-lg">발견된 취약점이 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
