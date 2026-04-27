'use client'

import { useMemo, use } from 'react'
import Link from 'next/link'
import { dummyAnalysisData, Vulnerability } from '@/src/presentation/mock/dummyData'
import ReactDiffViewer from 'react-diff-viewer-continued'
import { ArrowLeft, ShieldAlert, Wrench, FileCode2, Info } from 'lucide-react'

export default function VulnerabilityDetailPage({ params }: { params: Promise<{ id: string; vulnId: string }> }) {
  const { id, vulnId } = use(params)
  // Find the exact vulnerability from the dummy data
  const vulnData = useMemo(() => {
    return dummyAnalysisData.vulnerabilities.find(
      (v) => v.vuln_id.toString() === vulnId
    )
  }, [vulnId])

  if (!vulnData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">해당 취약점을 찾을 수 없습니다.</h1>
        <Link href={`/analysis/${id}/list`} className="mt-4 text-obsidian-green hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const getSeverityBadge = (severity: Vulnerability['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="bg-red-100 text-red-800 border border-red-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">Critical</span>
      case 'high':
        return <span className="bg-orange-100 text-orange-800 border border-orange-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">High</span>
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">Medium</span>
      case 'low':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">Low</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 flex flex-col pt-12 max-w-6xl mx-auto w-full px-4 mb-20">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link href={`/analysis/${id}/list`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-obsidian-green transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            목록으로 돌아가기
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{vulnData.content.title}</h1>
            {getSeverityBadge(vulnData.severity)}
          </div>
          <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm w-fit">
            <FileCode2 className="w-4 h-4 mr-2" />
            {vulnData.content.file} 
            <span className="mx-3 text-gray-400">|</span> 
            Line: {vulnData.line_number}
            <span className="mx-3 text-gray-400">|</span>
            CWE-{vulnData.cwe_id}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Risk Scenario */}
          <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-8">
            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
              <ShieldAlert className="w-6 h-6 mr-2 text-red-600" />
              위험 시나리오
            </h2>
            <p className="text-red-800 leading-relaxed text-lg">
              {vulnData.content.risk_scenario}
            </p>
            <div className="mt-4 flex bg-white/50 p-3 rounded-lg border border-red-100 text-sm text-red-700 items-start">
               <Info className="w-5 h-5 mr-2 shrink-0 mt-0.5 opacity-70" />
               <p>이 설명은 비개발자(기획자, 관리자 등)도 쉽게 이해할 수 있도록 비즈니스 관점의 영향도를 함께 설명합니다.</p>
            </div>
          </div>

          {/* Fix Direction */}
          <div className="bg-green-50 rounded-2xl shadow-sm border border-green-100 p-8">
            <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center">
              <Wrench className="w-6 h-6 mr-2 text-green-600" />
              수정 권장 방향
            </h2>
            <p className="text-green-800 leading-relaxed text-lg">
              {vulnData.content.fix_direction}
            </p>
          </div>
        </div>

        {/* Diff Viewer Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">해결 방법 (코드 Diff)</h2>
            <p className="text-sm text-gray-500 mt-1">빨간색 코드를 제거하고 초록색 코드로 교체하세요.</p>
          </div>
          
          <div className="text-sm">
            <ReactDiffViewer
              oldValue={vulnData.content.code_before}
              newValue={vulnData.content.code_after}
              splitView={false} // Inline view is usually cleaner for small snippets
              hideLineNumbers={false}
              useDarkTheme={false} /* Consider making this configurable later */
            />
          </div>
        </div>

      </main>
    </div>
  )
}
