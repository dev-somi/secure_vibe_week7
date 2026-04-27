'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { useAuthStore } from '@/src/application/store/useAuthStore'

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="relative">
      <button 
        aria-label="user profile" 
        className="p-2 hover:bg-gray-100 rounded-full bg-gray-50 border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5 text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <p className="font-bold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'user@securevibe.com'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left p-4 text-red-600 font-medium hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
