'use client'

import { useMemo, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { dummyAnalysisData } from '@/src/presentation/mock/dummyData'
import { useAuthStore } from '@/src/application/store/useAuthStore'
import { AlertTriangle, CheckCircle, XCircle, ShieldAlert, FileSearch, Clock } from 'lucide-react'

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

  const deploymentStatus = useMemo(() => {
    if (severityCounts.critical > 0) {
      return {
        label: '위험 (Danger)',
        message: '배포 불가! 치명적인(Critical) 취약점이 존재합니다.',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: <XCircle className="w-12 h-12 text-red-600 mb-2" />
      }
    } else if (severityCounts.high > 0) {
      return {
        label: '주의 (Warning)',
        message: '배포 주의! 고위험(High) 취약점을 수정하는 것을 권장합니다.',
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: <AlertTriangle className="w-12 h-12 text-orange-500 mb-2" />
      }
    } else {
      return {
        label: '안전 (Safe)',
        message: '배포 가능! 치명적/고위험 취약점이 발견되지 않았습니다.',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: <CheckCircle className="w-12 h-12 text-green-600 mb-2" />
      }
    }
  }, [severityCounts])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-[Arial,Helvetica,sans-serif]">
      {/* TODO: Add common NavBar here once implemented across layout */}
      <main className="flex-1 flex flex-col pt-12 max-w-5xl mx-auto w-full px-4 mb-20">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Security Summary</h1>
            <p className="text-gray-500 mt-2">Analysis Task ID: {id}</p>
          </div>
          <div className="text-right">
             <Link href="/" className="text-obsidian-green hover:underline text-sm font-medium">
               ← 새로운 스캔 시작하기
             </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          {/* Deployment Status Section */}
          <div className={`p-8 rounded-xl border flex flex-col items-center justify-center text-center mb-8 ${deploymentStatus.bg} ${deploymentStatus.border}`}>
            {deploymentStatus.icon}
            <h2 className={`text-2xl font-bold ${deploymentStatus.color} mb-2`}>
              {deploymentStatus.label}
            </h2>
            <p className="text-gray-700 font-medium">{deploymentStatus.message}</p>
          </div>

          <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
             <ShieldAlert className="w-6 h-6 mr-2 text-gray-600" />
             위험도별 요약
          </h3>

          {/* Counts Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col items-center justify-center hover:shadow-md transition">
              <span className="text-red-700 font-bold mb-1">CRITICAL</span>
              <span className="text-3xl font-black text-red-600">{severityCounts.critical}</span>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex flex-col items-center justify-center hover:shadow-md transition">
              <span className="text-orange-700 font-bold mb-1">HIGH</span>
              <span className="text-3xl font-black text-orange-500">{severityCounts.high}</span>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 flex flex-col items-center justify-center hover:shadow-md transition">
              <span className="text-yellow-700 font-bold mb-1">MEDIUM</span>
              <span className="text-3xl font-black text-yellow-600">{severityCounts.medium}</span>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col items-center justify-center hover:shadow-md transition">
              <span className="text-blue-700 font-bold mb-1">LOW</span>
              <span className="text-3xl font-black text-blue-500">{severityCounts.low}</span>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-gray-100 pt-8 mt-4">
            <button
              onClick={() => router.push(`/analysis/${id}/list`)}
              className="flex items-center justify-center px-8 py-3 bg-[#0f172a] hover:bg-obsidian-green hover:text-[#0f172a] text-white rounded-lg font-bold transition-colors"
            >
              <FileSearch className="w-5 h-5 mr-2" />
              취약점 상세 보기
            </button>

            {isLoggedIn && (
              <button
                onClick={() => router.push('/history')}
                className="flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-lg font-bold transition-colors"
              >
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                이전 기록 보기
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
