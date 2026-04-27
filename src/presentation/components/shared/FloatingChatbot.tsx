'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '안녕하세요! SecureVibe 보안 AI 챗봇입니다. 코드나 분석 결과에 대해 궁금한 점을 편하게 물어보세요.' }
  ])
  const [inputValue, setInputValue] = useState('')
  const pathname = usePathname()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue }
    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')

    // Mock Response
    setTimeout(() => {
      let responseContent = '네, 해당 내용에 대해 더 자세히 알려드릴 수 있습니다.'
      
      // Context aware mock response
      if (pathname.includes('/analysis')) {
        if (newUserMsg.content.includes('취약점') || newUserMsg.content.includes('분석')) {
          responseContent = '현재 분석 결과에 따르면 **가장 위험도가 높은 것은 SQL Injection (Critical, 줄 42)** 입니다. 사용자 입력값을 매개변수화하여 쿼리를 작성하는 방향으로 신속히 수정해야 합니다.'
        } else if (newUserMsg.content.includes('XSS')) {
          responseContent = '분석된 Cross-Site Scripting (XSS) 취약점은 위험도 High입니다. dangerouslySetInnerHTML 사용을 최대한 피하고 React의 기본 렌더링을 사용하세요.'
        } else {
          responseContent = '분석중인 코드에 대해 문의하셨군요. 이 프로젝트는 현재 위험(Danger) 상태이므로 배포를 중단하고 Critical 및 High 취약점을 먼저 조치하시길 권장합니다.'
        }
      } else {
        if (newUserMsg.content.includes('안녕')) {
          responseContent = '안녕하세요! 소스코드를 업로드하거나 GitHub URL을 입력하면 제가 보안 취약점을 꼼꼼히 분석해 드릴게요.'
        } else {
          responseContent = '분석 전이시군요. 취약점 점검을 원하시면 파일을 업로드해 주세요!'
        }
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: responseContent }])
    }, 1000)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-[#0f172a] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-obsidian-green hover:text-[#0f172a] transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100 hover:-translate-y-1'}`}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 h-[500px]' : 'scale-0 opacity-0 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-obsidian-green" />
            <span className="font-bold">Secure AI Chat</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-obsidian-green/20 text-[#0f172a]' : 'bg-[#0f172a] text-obsidian-green'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-obsidian-green text-[#0f172a] rounded-tr-sm' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="무엇이든 물어보세요..."
              className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-obsidian-green outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center disabled:opacity-50 disabled:bg-gray-300 hover:bg-obsidian-green hover:text-[#0f172a] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
