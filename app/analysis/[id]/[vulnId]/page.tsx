'use client'

import { useMemo, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useScanStore } from '@/src/application/store/scanStore'
import { ArrowLeft, PowerOff, Check } from 'lucide-react'

export default function VulnerabilityDetailPage({ params }: { params: Promise<{ id: string; vulnId: string }> }) {
  const { id, vulnId } = use(params)
  const router = useRouter()
  const results = useScanStore((state) => state.results)
  
  const currentIndex = parseInt(vulnId)
  const vulnData = useMemo(() => results[currentIndex] || null, [results, currentIndex])

  if (!vulnData) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">해당 취약점을 찾을 수 없습니다.</h1>
        <Link href={`/analysis/${id}/list`} className="mt-4 text-orange-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const getSeverityInfo = (severity: string) => {
    const sev = severity.toLowerCase()
    if (sev === 'error' || sev === 'critical') return { label: 'CRITICAL', color: 'bg-[#E35454]', text: 'text-white', border: 'border-[#E35454]' }
    if (sev === 'warning' || sev === 'high') return { label: 'HIGH', color: 'bg-[#F28B2A]', text: 'text-white', border: 'border-[#F28B2A]' }
    if (sev === 'medium') return { label: 'MEDIUM', color: 'bg-[#F2C94C]', text: 'text-black', border: 'border-[#F2C94C]' }
    return { label: 'LOW', color: 'bg-[#2D9CDB]', text: 'text-white', border: 'border-[#2D9CDB]' }
  }

  const title = vulnData.check_id.split('.').pop() || 'Unknown Issue'
  const cwe = vulnData.extra.metadata?.cwe?.[0] || 'CWE-Unknown'
  const severityInfo = getSeverityInfo(vulnData.extra.severity)

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] font-sans text-[#1A1A1A]">
      
      {/* Left Sidebar */}
      <aside className="w-[320px] bg-[#F4F4F4] border-r border-[#E5E5E5] flex flex-col h-screen sticky top-0 overflow-hidden">
        <div className="p-6 pb-4">
          <Link href={`/analysis/${id}/list`} className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-black mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            BACK TO LIST
          </Link>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
            ISSUES ({results.length})
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {results.map((vuln, index) => {
            const isActive = index === currentIndex
            const itemTitle = vuln.check_id.split('.').pop() || 'Unknown Issue'
            return (
              <button
                key={index}
                onClick={() => router.push(`/analysis/${id}/${index}`)}
                className={`w-full text-left px-6 py-4 border-b border-[#E5E5E5] transition-colors relative ${
                  isActive ? 'bg-white' : 'hover:bg-[#EBEBEB]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E35454]" />
                )}
                <div className={`font-semibold mb-1 truncate ${isActive ? 'text-black' : 'text-gray-700'}`}>
                  {itemTitle}
                </div>
                <div className="text-xs text-gray-500 font-mono truncate">
                  {vuln.path.split('/').pop()}:{vuln.start.line}
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      {/* Right Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        <div className="max-w-[800px] px-12 py-16 pb-32">
          
          {/* Header Rows */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider ${severityInfo.color} ${severityInfo.text} border-2 ${severityInfo.border}`}>
                ● {severityInfo.label}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border-2 border-gray-400 text-gray-700 bg-white">
                {title}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border-2 border-gray-400 text-gray-700 bg-white">
                {cwe.split(':')[0]}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border-2 border-gray-400 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                <PowerOff className="w-3.5 h-3.5" />
                ignore
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border-2 border-black text-white bg-[#1A1A1A] hover:bg-black transition-colors">
                <Check className="w-3.5 h-3.5" />
                mark fixed
              </button>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-[#1A1A1A] mb-3 tracking-tight">
            {title}
          </h1>
          <div className="text-sm text-gray-500 font-mono mb-10">
            {vulnData.path} · line {vulnData.start.line} · detected just now
          </div>

          {/* Card 1: Risk */}
          <div className="border-[2.5px] border-[#1A1A1A] rounded-xl bg-white p-8 mb-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#E35454] text-white flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <h2 className="text-xl font-bold italic">The risk – in plain words</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              {vulnData.extra.message}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#E35454] text-white border border-[#C53F3F]">
                data breach
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#E35454] text-white border border-[#C53F3F]">
                account takeover
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-400 text-gray-700 bg-white">
                exploitable: easy
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-400 text-gray-700 bg-white">
                public-facing
              </span>
            </div>
          </div>

          {/* Card 2: Fix */}
          <div className="border-[2.5px] border-[#1A1A1A] rounded-xl bg-white p-8 mb-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <h2 className="text-xl font-bold italic">How to fix it</h2>
            </div>
            <ol className="list-decimal list-outside ml-5 text-gray-700 leading-relaxed space-y-3 mb-6 font-medium">
              <li>Understand the specific vulnerability associated with <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{vulnData.check_id}</span>.</li>
              <li>Locate the affected code at line {vulnData.start.line} in <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{vulnData.path.split('/').pop()}</span>.</li>
              <li>Apply secure coding patterns (e.g., parameterized queries, input validation) to resolve the flaw.</li>
            </ol>
            <p className="text-sm text-gray-400 italic">
              ↳ same pattern may apply to similar issues in this repo
            </p>
          </div>

          {/* Card 3: Diff */}
          <div className="border-[2.5px] border-[#1A1A1A] rounded-xl bg-white p-8 mb-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </div>
                <h2 className="text-xl font-bold italic">Before / after</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-400 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                  copy
                </button>
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold border border-gray-400 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                  side-by-side
                </button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-red-200">
              <div className="bg-[#FFEAEA] px-4 py-3 font-mono text-sm text-[#D32F2F] flex items-start gap-4">
                <span className="opacity-50 select-none">-</span>
                <span>// Vulnerable code located at line {vulnData.start.line}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6 italic">
              references & CWE links below ↓
            </p>
          </div>

        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-10 right-10">
          <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3.5 rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all">
            Apply fix as PR →
          </button>
        </div>
      </main>

    </div>
  )
}
