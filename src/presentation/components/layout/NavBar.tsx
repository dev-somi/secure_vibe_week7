'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/application/store/useAuthStore'
import NotificationDropdown from '../features/NotificationDropdown'
import UserProfileDropdown from '../features/UserProfileDropdown'

export default function NavBar() {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-white relative z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-xl font-extrabold text-obsidian-green tracking-tight">SecureVibe</Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-black font-medium">Scan</Link>
          <Link href="/guide" className="text-gray-600 hover:text-black font-medium">Guide</Link>
          {isLoggedIn && <Link href="/history" className="text-gray-600 hover:text-black font-medium">History</Link>}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <NotificationDropdown />
            <UserProfileDropdown />
          </>
        ) : (
          <button 
            onClick={() => router.push('/login')}
            className="px-5 py-2 bg-[#0f172a] text-white text-sm font-bold rounded-lg hover:bg-obsidian-green hover:text-[#0f172a] transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}
