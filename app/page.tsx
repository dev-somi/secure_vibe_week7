'use client'

import { useState, useRef, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, GitBranch, ArrowRight, Lock } from 'lucide-react'
import { executeScan } from '../src/application/usecases/ExecuteScanUseCase'
import { useScanStore } from '../src/application/store/scanStore'

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const setResults = useScanStore((state) => state.setResults)

  const handleScan = async () => {
    if (!githubUrl.trim()) return
    setIsScanning(true)

    try {
      const results = await executeScan({
        mode: 'GITHUB_URL',
        files: [],
        code: '',
        language: '',
        githubUrl: githubUrl,
      })

      setResults(results)
      router.push('/analysis/1')
    } catch (error) {
      console.error('Scan failed:', error)
      alert('분석 중 오류가 발생했습니다.')
    } finally {
      setIsScanning(false)
    }
  }

  const handleFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return

    setIsScanning(true)

    try {
      const results = await executeScan({
        mode: 'UPLOAD_FILES',
        files: Array.from(files),
        code: '',
        language: '',
      })

      setResults(results)
      router.push('/analysis/1')
    } catch (error) {
      console.error('Error scanning files:', error)
      alert('분석 중 오류가 발생했습니다.')
    } finally {
      setIsScanning(false)
    }
  }

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 md:p-8 text-[#1A1A1A]">

      <div className="max-w-4xl w-full flex flex-col items-center py-10">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            코드를 점검해보세요.
          </h1>
          <p className="text-gray-500 text-sm md:text-base italic">
            레포지토리를 붙여넣거나 파일을 드래그하세요 — 취약점을 찾아드립니다.
          </p>
        </div>

        {/* 메인 인터페이스 카드 섹션 */}
        <div className="flex flex-col md:flex-row w-full items-stretch justify-center gap-10 md:gap-16 relative mb-12">

          {/* 왼쪽: 파일 업로드 영역 */}
          <div
            className={`flex-1 border-[1.5px] border-dashed border-gray-600 rounded-lg p-10 flex flex-col items-center justify-center transition-all bg-transparent relative ${isDragging ? 'bg-white border-gray-900 shadow-md scale-[1.02]' : ''
              } ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}
            onDragOver={(e) => {
              if (isScanning) return;
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
          >
            <div className="mb-6 text-gray-600">
              <ArrowUp className="w-12 h-12 stroke-[2.5]" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>코드를 드래그하세요</h2>
            <p className="text-gray-400 text-xs mb-6 italic">.zip · 폴더 · 단일 파일</p>

            <div className="flex gap-2 mb-8 justify-center">
              {['js', 'py', 'ts', 'go', '+more'].map(ext => (
                <span key={ext} className="border border-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-xs text-gray-600 bg-transparent">
                  {ext}
                </span>
              ))}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
              className="bg-transparent border-[2.5px] border-gray-900 rounded-full px-8 py-2.5 font-bold text-gray-900 hover:bg-gray-100 transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? '업로드 중...' : '파일 탐색'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  handleFileUpload(e.target.files)
                }
              }}
            />
          </div>

          {/* 중앙 구분선 및 '또는' (데스크탑용) */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
            <div className="h-full w-[1px] bg-gray-300"></div>
            <span className="bg-[#FAFAFA] px-3 py-2 text-gray-600 text-sm font-semibold italic absolute uppercase tracking-widest">
              또는
            </span>
          </div>

          {/* 중앙 '또는' (모바일용) */}
          <div className="md:hidden flex items-center justify-center py-4 relative w-full overflow-hidden">
            <div className="h-[1px] w-full bg-gray-300"></div>
            <span className="bg-[#FAFAFA] px-4 py-1 text-gray-500 font-semibold italic text-sm absolute uppercase">
              또는
            </span>
          </div>

          {/* 오른쪽: GitHub 입력 영역 */}
          <div className="flex-1 border-[1.5px] border-solid border-gray-900 rounded-lg p-10 flex flex-col justify-center bg-[#FAFAFA] relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="border border-gray-900 rounded-full p-2 flex-shrink-0">
                <GitBranch className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>GitHub 레포지토리에서 가져오기</span>
            </div>

            <div className="w-full relative mb-6">
              <input
                type="text"
                placeholder="https://github.com/your-org/repo"
                className="w-full border border-gray-400 rounded p-3 text-sm focus:outline-none focus:border-gray-900 placeholder:text-gray-300 font-mono"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>

            <button
              onClick={handleScan}
              disabled={isScanning || !githubUrl.trim()}
              className="w-full bg-[#1A1A1A] text-white rounded-full py-3.5 flex items-center justify-center gap-2 font-bold text-sm hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isScanning ? '분석 중...' : '분석 시작'}
              {!isScanning && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>

            <p className="mt-8 text-gray-400 text-xs text-center italic tracking-wide">
              공개 레포지토리는 즉시 가능하며 · 비공개는 GitHub 연결이 필요합니다
            </p>
          </div>
        </div>

        {/* 하단 푸터 정보 */}
        <div className="text-gray-500 text-xs flex flex-row items-center justify-center gap-1 font-medium mt-4 italic">
          <Lock className="w-3 h-3 text-yellow-500" />
          <span>코드는 안전한 샌드박스 내부에서만 유지됩니다 · 분석은 보통 30-60초 정도 소요됩니다</span>
        </div>
      </div>
    </main >
  )
}



