'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Target, Map, BarChart3, Settings } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: 'خانه' },
    { href: '/lessons', icon: BookOpen, label: 'دروس' },
    { href: '/assessment', icon: Target, label: 'آزمون' },
    { href: '/study-plan', icon: Map, label: 'نقشه' },
    { href: '/dashboard', icon: BarChart3, label: 'داشبورد' },
    { href: '/settings', icon: Settings, label: 'تنظیمات' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
