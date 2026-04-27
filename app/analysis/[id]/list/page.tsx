'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { use, useState, useMemo } from 'react'
import { dummyAnalysisData, Vulnerability } from '@/src/presentation/mock/dummyData'
import { Search, ChevronDown, ListFilter, ArrowLeft, ChevronRight } from 'lucide-react'

export default function VulnerabilityListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  
  // Mock data
  const data = dummyAnalysisData

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState<Vulnerability['severity'] | 'all'>('all')

  // Calculate counts for sidebar
  const severityCounts = useMemo(() => {
    const counts = { all: data.vulnerabilities.length, critical: 0, high: 0, medium: 0, low: 0 }
    data.vulnerabilities.forEach(v => {
      counts[v.severity]++
    })
    return counts
  }, [data])

  // Filter logic
  const filteredVulnerabilities = useMemo(() => {
    return data.vulnerabilities.filter(v => {
      const matchesSeverity = selectedSeverity === 'all' || v.severity === selectedSeverity
      const matchesSearch = 
        v.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.content.file.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesSeverity && matchesSearch
    })
  }, [data, selectedSeverity, searchQuery])

  // Helpers for styling
  const getSeverityBadgeColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-600 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getSeverityDotColor = (severity: string | 'all') => {
    switch(severity) {
      case 'all': return 'bg-gray-800'
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-300'
    }
  }

  const getSeverityLabel = (severity: string | 'all') => {
    switch(severity) {
      case 'all': return '전체'
      case 'critical': return '치명적'
      case 'high': return '고위험'
      case 'medium': return '보통'
      case 'low': return '저위험'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex justify-center">
      <main className="w-full max-w-[1200px] flex flex-col md:flex-row gap-8 px-6 py-8">
        
        {/* Left Sidebar (Filters) */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="mb-6">
            <Link href={`/analysis/${id}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              대시보드로 돌아가기
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-8">
            <h2 className="text-xs font-bold text-gray-400 mb-4 tracking-wider">위험도 (SEVERITY)</h2>
            <ul className="space-y-1">
              {(['all', 'critical', 'high', 'medium', 'low'] as const).map((sev) => {
                const isActive = selectedSeverity === sev;
                return (
                  <li key={sev}>
                    <button
                      onClick={() => setSelectedSeverity(sev)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? 'bg-gray-100 font-bold text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${getSeverityDotColor(sev)} ring-2 ring-white`}></span>
                        <span>{getSeverityLabel(sev)}</span>
                      </div>
                      <span className={`text-xs ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {severityCounts[sev]}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        {/* Right Content Area */}
        <section className="flex-1 flex flex-col min-w-0">
          
          {/* Top Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="파일, 유형 또는 내용으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <ListFilter className="w-4 h-4 text-gray-500" />
                위험도순
                <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                그룹: 파일
                <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
              </button>
            </div>
          </div>

          {/* Vulnerability List */}
          <div className="space-y-4">
            {filteredVulnerabilities.map(vuln => (
              <div 
                key={vuln.vuln_id}
                onClick={() => router.push(`/analysis/${id}/${vuln.vuln_id}`)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col relative"
              >
                <div className="p-5 flex flex-col">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${getSeverityBadgeColor(vuln.severity)}`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span>
                        {vuln.severity}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-600 text-[10px] font-semibold bg-gray-50">
                        {vuln.content.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Title & Path */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{vuln.content.title}</h3>
                  <p className="text-xs text-gray-500 font-mono mb-4">
                    {vuln.content.file} · L{vuln.line_number}
                  </p>

                  {/* Code Snippet */}
                  <div className="bg-gray-50 border border-gray-100 rounded-md p-3 font-mono text-sm text-gray-600 overflow-hidden">
                    <div className="truncate opacity-80">
                      {vuln.content.code_before.split('\n')[0]} 
                      {vuln.content.code_before.includes('\n') && ' ...'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredVulnerabilities.length === 0 && (
              <div className="p-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
                <p className="text-gray-500 font-medium">검색 결과가 없습니다.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedSeverity('all'); }}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}
