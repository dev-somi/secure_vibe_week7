'use client'

import { ShieldCheck, ServerCrash, KeyRound, Lock, SearchCode } from 'lucide-react'

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-20">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-12">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">SecureVibe 활용 가이드</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            비개발자(기획자, 프로젝트 관리자)도 쉽게 이해할 수 있는 주요 보안 취약점 해설과 해결 방향을 제시합니다.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* SQL Injection */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-xl text-red-600 shrink-0">
                <SearchCode className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">1. SQL 인젝션 (SQL Injection, CWE-89)</h2>
                <div className="flex gap-2 mb-4">
                  <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded border border-red-100">위험도: Critical</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded border border-gray-200">데이터 유출</span>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">이게 뭔가요?</strong><br/>
                    사용자가 입력창(예: 로그인 아이디)에 악의적인 데이터베이스 명령어를 몰래 끼워넣어, 서버가 원래 의도하지 않은 데이터를 빼가거나 데이터를 삭제하게 만드는 해킹 기법입니다.
                  </p>
                  <p>
                    <strong className="text-gray-800">비즈니스 영향도:</strong><br/>
                    공격자가 관리자 권한을 탈취하거나 전체 회원의 개인정보(비밀번호 등)를 통째로 다운로드할 수 있어 기업에 막대한 신뢰도 하락과 법적 책임을 초래합니다.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                    <strong className="text-blue-900">어떻게 고치나요?</strong>
                    <p className="text-blue-800 mt-1 text-sm">개발팀은 사용자 입력값을 데이터베이스 명령어와 분리하여 처리하는 'Preared Statement'를 적용해야 합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* XSS */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                <ServerCrash className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">2. 크로스 사이트 스크립팅 (XSS, CWE-79)</h2>
                <div className="flex gap-2 mb-4">
                  <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2 py-1 rounded border border-orange-100">위험도: High</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded border border-gray-200">계정 탈취</span>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">이게 뭔가요?</strong><br/>
                    게시판 등 사용자가 글을 쓸 수 있는 공간에 악의적인 코드를 심어두고, 다른 정상 사용자가 그 글을 읽을 때 그 코드가 실행되도록 만드는 공격입니다.
                  </p>
                  <p>
                    <strong className="text-gray-800">비즈니스 영향도:</strong><br/>
                    정상 사용자의 로그인 유지 정보(쿠키/세션)를 빼앗아 해커가 피해자의 계정으로 활동할 수 있습니다. 피해자는 자신의 계정으로 이상한 글이 올라가거나 결제가 일어나는 피해를 입을 수 있습니다.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                    <strong className="text-blue-900">어떻게 고치나요?</strong>
                    <p className="text-blue-800 mt-1 text-sm">사용자가 작성한 내용을 화면에 표시할 때, 코드로 해석되지 않고 단순 문자로만 보이게 하는 'HTML 치환(인코딩)' 작업이 필요합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Broken Authentication */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600 shrink-0">
                <KeyRound className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">3. 취약한 암호화 알고리즘 (CWE-311)</h2>
                <div className="flex gap-2 mb-4">
                  <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-2 py-1 rounded border border-yellow-100">위험도: Medium</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded border border-gray-200">정보 유출</span>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">이게 뭔가요?</strong><br/>
                    MD5나 SHA-1 같이 현재는 쉽게 해독될 수 있는 구형 암호화 방식을 사용하여 중요한 정보(비밀번호 등)를 저장하는 문제입니다.
                  </p>
                  <p>
                    <strong className="text-gray-800">비즈니스 영향도:</strong><br/>
                    설령 DB가 유출되더라도 암호화가 강력하면 안심할 수 있지만, 약한 암호를 사용하면 해커가 길어야 며칠 안에 모든 고객의 비밀번호 평문을 획득할 수 있습니다.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                    <strong className="text-blue-900">어떻게 고치나요?</strong>
                    <p className="text-blue-800 mt-1 text-sm">비밀번호는 해독 자체가 불가능한 안전한 일방향 해시(bcrypt, Argon2 등)를 사용하고, 중요 문서는 최신 AES 방식으로 암호화하도록 수정해야 합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center mt-12 bg-gray-100 rounded-2xl p-8 border border-gray-200">
            <ShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">보안 점검 생활화</h3>
            <p className="text-gray-500">배포 전 SecureVibe를 통해 한 번 더 점검하는 습관이 안전한 서비스를 만듭니다.</p>
          </div>

        </div>
      </main>
    </div>
  )
}
