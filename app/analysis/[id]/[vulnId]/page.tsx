'use client'

import { useMemo, use } from 'react'
import Link from 'next/link'
import { useScanStore } from '@/src/application/store/scanStore'
import { ArrowLeft, ShieldAlert, Wrench, FileCode2, Info } from 'lucide-react'

export default function VulnerabilityDetailPage({ params }: { params: Promise<{ id: string; vulnId: string }> }) {
  const { id, vulnId } = use(params)
  const results = useScanStore((state) => state.results)
  
  // Find the exact vulnerability from the results
  const vulnData = useMemo(() => {
    const index = parseInt(vulnId)
    return results[index] || null
  }, [results, vulnId])

  if (!vulnData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">해당 취약점을 찾을 수 없습니다.</h1>
        <Link href={`/analysis/${id}/list`} className="mt-4 text-orange-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const getSeverityBadge = (severity: string) => {
    const sev = severity.toLowerCase()
    if (sev === 'error' || sev === 'critical') {
      return <span className="bg-red-100 text-red-800 border border-red-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">Critical</span>
    }
    if (sev === 'warning' || sev === 'high') {
      return <span className="bg-orange-100 text-orange-800 border border-orange-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">High</span>
    }
    if (sev === 'medium') {
      return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">Medium</span>
    }
    return <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">Low</span>
  }

  const title = vulnData.check_id.split('.').pop() || 'Unknown Issue'
  const cwe = vulnData.extra.metadata.cwe?.[0] || 'Unknown'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 flex flex-col pt-12 max-w-6xl mx-auto w-full px-4 mb-20">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link href={`/analysis/${id}/list`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            목록으로 돌아가기
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
            {getSeverityBadge(vulnData.extra.severity)}
          </div>
          <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm w-fit">
            <FileCode2 className="w-4 h-4 mr-2" />
            {vulnData.path} 
            <span className="mx-3 text-gray-400">|</span> 
            Line: {vulnData.start.line}
            <span className="mx-3 text-gray-400">|</span>
            {cwe}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Risk Scenario */}
          <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-8">
            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
              <ShieldAlert className="w-6 h-6 mr-2 text-red-600" />
              탐지 메시지
            </h2>
            <p className="text-red-800 leading-relaxed text-lg">
              {vulnData.extra.message}
            </p>
            <div className="mt-4 flex bg-white/50 p-3 rounded-lg border border-red-100 text-sm text-red-700 items-start">
               <Info className="w-5 h-5 mr-2 shrink-0 mt-0.5 opacity-70" />
               <p>이 메시지는 스캐너가 탐지한 원본 메시지입니다. 상세한 위험 시나리오 분석 결과는 준비 중입니다.</p>
            </div>
          </div>

          {/* Fix Direction */}
          <div className="bg-green-50 rounded-2xl shadow-sm border border-green-100 p-8">
            <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center">
              <Wrench className="w-6 h-6 mr-2 text-green-600" />
              탐지 규칙 정보
            </h2>
            <p className="text-green-800 leading-relaxed text-lg">
              규칙 ID: {vulnData.check_id}
            </p>
            <p className="text-green-700 text-sm mt-2">
              이 취약점은 해당 규칙에 의해 탐지되었습니다. 코드 수정을 위해 규칙 정의를 참고하세요.
            </p>
          </div>
        </div>

        {/* Diff Viewer Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">해결 방법 (코드 Diff)</h2>
            <p className="text-sm text-gray-500 mt-1">빨간색 코드를 제거하고 초록색 코드로 교체하세요.</p>
          </div>
          
          <div className="text-sm p-8 bg-gray-50 text-gray-400 italic text-center">
            실시간 코드 Diff 기능은 현재 준비 중입니다. 원본 소스 코드의 {vulnData.start.line}번 라인을 확인해 주세요.
          </div>
        </div>

      </main>
    </div>
  )
}
