'use client'

import { useState } from 'react'
import { X, User, Lock, Mail, Key, ArrowRight, Loader2 } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Form states
  const [sid, setSid] = useState('')
  const [sname, setSname] = useState('')
  const [spassword, setSpassword] = useState('')
  const [sapikey, setSapikey] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const endpoint = isLogin ? '/login' : '/signup'
      const formData = new URLSearchParams()
      formData.append('sid', sid)
      formData.append('spassword', spassword)
      
      if (!isLogin) {
        formData.append('sname', sname)
        formData.append('sapikey', sapikey)
      }

      // 실제 백엔드 주소로 변경 필요 (예: http://localhost:8000/signup)
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      })

      const data = await response.json()
      setMessage(data.message || (response.ok ? (isLogin ? '로그인 성공' : '회원가입 성공') : '오류가 발생했습니다.'))
      
      if (response.ok) {
        setTimeout(() => {
          onClose()
          setIsLoading(false)
        }, 1500)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Auth error:', error)
      setMessage('서버에 연결할 수 없습니다.')
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative border border-gray-100">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              {isLogin ? '다시 오신 것을 환영합니다' : '새로운 여정을 시작하세요'}
            </h2>
            <p className="text-gray-500 text-sm mt-2 italic">
              {isLogin ? '계정에 접속하여 분석을 이어가세요' : '보안 분석을 위한 계정을 생성하세요'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ID Field */}
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
              <input
                type="text"
                placeholder="아이디"
                required
                value={sid}
                onChange={(e) => setSid(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:border-gray-900 transition-all text-sm"
              />
            </div>

            {!isLogin && (
              /* Name Field (Signup only) */
              <div className="relative group animate-in slide-in-from-top-2 duration-300">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  placeholder="이름"
                  required
                  value={sname}
                  onChange={(e) => setSname(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:border-gray-900 transition-all text-sm"
                />
              </div>
            )}

            {/* Password Field */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
              <input
                type="password"
                placeholder="비밀번호"
                required
                value={spassword}
                onChange={(e) => setSpassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:border-gray-900 transition-all text-sm"
              />
            </div>

            {!isLogin && (
              /* API Key Field (Signup only) */
              <div className="relative group animate-in slide-in-from-top-2 duration-300">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  placeholder="API Key"
                  required
                  value={sapikey}
                  onChange={(e) => setSapikey(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:border-gray-900 transition-all text-sm"
                />
              </div>
            )}

            {message && (
              <p className={`text-xs text-center font-medium ${message.includes('성공') ? 'text-green-600' : 'text-red-500'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? '로그인' : '회원가입'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setMessage('')
              }}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors italic"
            >
              {isLogin ? '아직 계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
