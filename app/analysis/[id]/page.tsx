'use client'

import { useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { dummyAnalysisData } from '@/src/presentation/mock/dummyData'
import { useAuthStore } from '@/src/application/store/useAuthStore'
import { AlertTriangle, Check, X, RefreshCw, MessageCircle } from 'lucide-react'

export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  // Ensure the hook is called safely
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  // Use dummy data regardless of the id for mockup purposes
  const data = dummyAnalysisData

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 }
    data.vulnerabilities.forEach((vuln) => {
      counts[vuln.severity] += 1
    })
    return counts
  }, [data])

  const issueTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    data.vulnerabilities.forEach(v => {
      counts[v.content.title] = (counts[v.content.title] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const fileIssueCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    data.vulnerabilities.forEach(v => {
      counts[v.content.file] = (counts[v.content.file] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const totalIssues = data.vulnerabilities.length;

  // Colors for severity
  const severityColors = {
    critical: '#dc2626', // red-600
    high: '#ea580c', // orange-600
    medium: '#ca8a04', // yellow-600
    low: '#3b82f6', // blue-500
  };

  const getSeverityColor = (title: string) => {
    // Determine a color for the issue type bar based on its most severe finding
    const matchingVuln = data.vulnerabilities.find(v => v.content.title === title);
    return matchingVuln ? severityColors[matchingVuln.severity] : '#6b7280';
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans text-gray-800 selection:bg-orange-200">
      <main className="flex-1 flex flex-col pt-8 max-w-[1200px] mx-auto w-full px-6 mb-24">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold italic tracking-wide">스캔 완료</h1>
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-1.5 border-[1.5px] border-gray-900 rounded-full hover:bg-gray-100 transition-colors text-sm font-semibold"
          >
            <RefreshCw className="w-4 h-4" />
            재스캔
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Panel: Caution Status */}
          <div className="flex-[1.2] bg-[#FFF9F2] border-[1.5px] border-gray-900 rounded-xl p-8 flex flex-col items-center justify-center relative min-h-[500px]">
            <div className="flex flex-col items-center text-center max-w-sm">
              <span className="text-gray-500 mb-4 italic font-medium">배포해도 될까요?</span>
              
              <div className="mb-6 relative">
                {/* Simulated 3D Triangle */}
                <div className="w-32 h-32 relative flex justify-center items-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    <polygon points="50,10 10,85 90,85" fill="#FBBF24" />
                    <polygon points="50,15 15,80 85,80" fill="#F59E0B" />
                    <rect x="46" y="35" width="8" height="25" rx="4" fill="#1F2937" />
                    <circle cx="50" cy="70" r="4.5" fill="#1F2937" />
                  </svg>
                </div>
              </div>

              <h2 className="text-6xl font-bold text-orange-500 mb-4 tracking-tighter italic">
                주의 요망
              </h2>
              
              <p className="text-gray-500 text-sm mb-10 italic font-medium">
                배포 전 고위험군 취약점을 수정하세요.<br />치명적 오류는 반드시 해결해야 합니다.
              </p>

              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-500 bg-white">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  안전
                </div>
                <div className="flex items-center gap-1.5 px-4 py-1.5 border-[1.5px] border-orange-600 rounded-full text-xs font-bold text-white bg-orange-500 shadow-sm">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  주의
                </div>
                <div className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-500 bg-white">
                  <X className="w-3.5 h-3.5 text-red-400" />
                  위험
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Statistics */}
          <div className="flex-1 flex flex-col gap-5">
            
            {/* By Severity */}
            <div>
              <h3 className="text-sm font-bold mb-2 italic text-gray-700">위험도별 요약</h3>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-[#FAFAFA] border-[1.5px] border-gray-900 rounded-lg flex flex-col items-center justify-center py-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600 border-b-[1.5px] border-gray-900"></div>
                  <span className="text-3xl font-bold text-red-600 mt-2">{severityCounts.critical}</span>
                  <span className="text-xs text-gray-600 mt-1 font-medium">치명적</span>
                </div>
                <div className="bg-[#FAFAFA] border-[1.5px] border-gray-900 rounded-lg flex flex-col items-center justify-center py-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-500 border-b-[1.5px] border-gray-900"></div>
                  <span className="text-3xl font-bold text-orange-500 mt-2">{severityCounts.high}</span>
                  <span className="text-xs text-gray-600 mt-1 font-medium">고위험</span>
                </div>
                <div className="bg-[#FAFAFA] border-[1.5px] border-gray-900 rounded-lg flex flex-col items-center justify-center py-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500 border-b-[1.5px] border-gray-900"></div>
                  <span className="text-3xl font-bold text-yellow-600 mt-2">{severityCounts.medium}</span>
                  <span className="text-xs text-gray-600 mt-1 font-medium">보통</span>
                </div>
                <div className="bg-[#FAFAFA] border-[1.5px] border-gray-900 rounded-lg flex flex-col items-center justify-center py-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-400 border-b-[1.5px] border-gray-900"></div>
                  <span className="text-3xl font-bold text-blue-500 mt-2">{severityCounts.low}</span>
                  <span className="text-xs text-gray-600 mt-1 font-medium">저위험</span>
                </div>
              </div>
            </div>

            {/* Top Issue Types */}
            <div className="bg-[#FAFAFA] border-[1.5px] border-gray-900 rounded-lg p-5">
              <h3 className="text-sm font-bold mb-4 italic text-gray-700">주요 문제 유형</h3>
              <div className="space-y-4">
                {issueTypeCounts.slice(0, 5).map(([title, count]) => (
                  <div key={title} className="flex items-center text-sm">
                    <span className="w-32 truncate text-gray-700 font-medium pr-2 text-xs">{title}</span>
                    <div className="flex-1 h-3.5 bg-[#E5E7EB] border border-gray-400 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full border-r border-gray-900 transition-all duration-500" 
                        style={{ 
                          width: `${Math.min((count / Math.max(...issueTypeCounts.map(i => i[1]))) * 100, 100)}%`,
                          backgroundColor: getSeverityColor(title)
                        }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-xs text-gray-500 font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Affected Files */}
            <div className="bg-[#FAFAFA] border-[1.5px] border-gray-900 rounded-lg p-5 flex-1">
              <h3 className="text-sm font-bold mb-4 italic text-gray-700">가장 많이 발견된 파일</h3>
              <div className="space-y-3">
                {fileIssueCounts.slice(0, 4).map(([file, count]) => (
                  <div key={file} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-mono text-xs truncate max-w-[250px]">{file}</span>
                    <span className="border border-gray-400 rounded-full px-3 py-0.5 text-xs text-gray-500 font-medium bg-white">
                      {count} 이슈
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="border-[1.5px] border-gray-900 bg-white hover:bg-gray-50 rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none">
              리포트 내보내기
            </button>
            <button 
              onClick={() => router.push(`/analysis/${id}/list`)}
              className="border-[1.5px] border-gray-900 bg-[#1A1A1A] hover:bg-black text-white rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
            >
              모든 {totalIssues}개 이슈 보기 →
            </button>
          </div>
        </div>

      </main>

    </div>
  )
}
