'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { OptionButtons } from '@/components/chat/option-buttons'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

export default function LearningProfilePage() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'نتایج پرسش‌نامه شما آمده است! بیایید آن را تحلیل کنیم. 📊',
      timestamp: new Date(),
    },
  ])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: '2',
          type: 'advisor' as const,
          content: 'بر اساس پاسخ‌های شما:',
          timestamp: new Date(),
        },
      ])
    }, 800)

    const timer2 = setTimeout(() => {
      setShowResults(true)
    }, 1600)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">پروفایل یادگیری</h1>
            <p className="text-sm text-muted-foreground">مرحله 2 از 3</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />

        {showResults && (
          <div className="px-4 py-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Cards */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="font-semibold mb-1">👁️ سبک یادگیری</div>
                <div className="text-sm opacity-90">بصری (Visual)</div>
                <div className="text-xs mt-2 opacity-75">شما بهتر از طریق نمودارها و تصاویر یاد می‌گیرید</div>
              </div>

              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="font-semibold mb-1">⏰ ساعات مطالعه</div>
                <div className="text-sm opacity-90">2-4 ساعت روزانه</div>
                <div className="text-xs mt-2 opacity-75">این مقدار برای موفقیت در کنکور مناسب است</div>
              </div>

              <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="font-semibold mb-1">📚 نقطه قوت</div>
                <div className="text-sm opacity-90">ریاضیات و منطق</div>
                <div className="text-xs mt-2 opacity-75">بر این موضوع تمرکز کنید و از آن برای یادگیری بیشتر استفاده کنید</div>
              </div>

              <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="font-semibold mb-1">🎯 اولویت</div>
                <div className="text-sm opacity-90">تقویت زبان و ادبیات</div>
                <div className="text-xs mt-2 opacity-75">این موضوع نیاز به توجه بیشتری دارد</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        {showResults && (
          <div className="space-y-3">
            <Link
              href="/assessment"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              شروع ارزیابی سطح دانش 📝
            </Link>
            <Link
              href="/dashboard"
              className="block w-full text-center px-6 py-3 bg-purple-400 hover:bg-purple-500 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              رفتن به داشبورد 📊
            </Link>
            <Link
              href="/"
              className="block w-full text-center px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-foreground rounded-xl font-semibold transition-all duration-200 active:scale-95"
            >
              بازگشت به خانه 🏠
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
