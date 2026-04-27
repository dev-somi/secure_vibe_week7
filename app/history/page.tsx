'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/application/store/useAuthStore'
import { Clock, ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react'

// Dummy history data
const mockHistory = [
  { id: 101, project: 'secure-vibe-demo', date: '2026-04-27 10:42', status: 'completed', severity: 'critical', issues: 4 },
  { id: 102, project: 'auth-service', date: '2026-04-25 15:20', status: 'completed', severity: 'low', issues: 1 },
  { id: 103, project: 'payment-gateway', date: '2026-04-20 09:12', status: 'completed', severity: 'high', issues: 2 },
  { id: 104, project: 'legacy-core', date: '2026-04-18 11:30', status: 'completed', severity: 'safe', issues: 0 },
]

export default function HistoryPage() {
  const router = useRouter()
  // Hydration state check
  const [mounted, setMounted] = useState(false)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-md w-full">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인 필요</h2>
          <p className="text-gray-500 mb-6">분석 기록을 조회하려면 로그인이 필요합니다.</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-[#0f172a] text-white py-3 rounded-lg font-bold hover:bg-obsidian-green transition-colors"
          >
            로그인 하러가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-12 mb-20">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
               <Clock className="w-8 h-8 mr-3 text-obsidian-green" />
               분석 기록
            </h1>
            <p className="text-gray-500 mt-2">과거에 진행했던 스캔 내역과 배포 가능 여부를 확인하세요.</p>
          </div>
          <Link href="/" className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            새 스캔 시작
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">프로젝트 / 대상</th>
                  <th className="px-6 py-4">분석 일시</th>
                  <th className="px-6 py-4">배포 가능 여부</th>
                  <th className="px-6 py-4 text-center">발견된 이슈</th>
                  <th className="px-6 py-4 text-right">상세</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 font-medium text-gray-900 flex items-center gap-2">
                       {item.project}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-5">
                      {item.severity === 'critical' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200"><ShieldAlert className="w-3.5 h-3.5"/> 위험 (불가)</span>}
                      {item.severity === 'high' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200"><AlertTriangle className="w-3.5 h-3.5"/> 주의</span>}
                      {(item.severity === 'low' || item.severity === 'safe') && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold border border-green-200"><ShieldCheck className="w-3.5 h-3.5"/> 안전 (가능)</span>}
                    </td>
                    <td className="px-6 py-5 text-center font-bold">
                       {item.issues}개
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => router.push(`/analysis/${item.id}`)}
                        className="p-2 text-gray-400 hover:text-obsidian-green bg-white border border-gray-200 hover:border-obsidian-green rounded-lg transition-all"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}
