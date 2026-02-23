'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { OptionButtons } from '@/components/chat/option-buttons'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

const studyPlan = [
  { subject: 'ریاضی', mastery: 85, priority: 'high', weeks: 8, color: 'from-blue-400 to-blue-600' },
  { subject: 'فارسی', mastery: 60, priority: 'critical', weeks: 12, color: 'from-pink-400 to-pink-600' },
  { subject: 'علوم', mastery: 72, priority: 'medium', weeks: 6, color: 'from-green-400 to-green-600' },
  { subject: 'عربی', mastery: 55, priority: 'high', weeks: 10, color: 'from-orange-400 to-orange-600' },
  { subject: 'انگلیسی', mastery: 65, priority: 'medium', weeks: 7, color: 'from-purple-400 to-purple-600' },
]

export default function StudyPlanPage() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'براساس نتایج ارزیابی شما، یک نقشه مطالعاتی شخصی‌سازی‌شده تهیه کردم! 📚',
      timestamp: new Date(),
    },
  ])
  const [showPlan, setShowPlan] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: '2',
          type: 'advisor' as const,
          content: 'این نقشه برای 12 هفته آینده طراحی شده است. بیایید شروع کنیم! 🎯',
          timestamp: new Date(),
        },
      ])
    }, 800)

    const timer2 = setTimeout(() => {
      setShowPlan(true)
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
            <h1 className="text-lg font-bold text-foreground">نقشه مطالعاتی</h1>
            <p className="text-sm text-muted-foreground">12 هفته برنامه‌ریزی شده</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />

        {showPlan && (
          <div className="px-4 py-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3">
              {studyPlan.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${item.color} text-white p-4 rounded-2xl shadow-lg`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold">{item.subject}</div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {item.priority === 'critical' ? '🔴 فوری' : item.priority === 'high' ? '🟠 بالا' : '🟡 متوسط'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>سطح موجود</span>
                        <span>{item.mastery}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/80 transition-all duration-500"
                          style={{ width: `${item.mastery}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-sm opacity-90">
                      ⏱️ {item.weeks} هفته مطالعه
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 p-4 rounded-2xl">
              <div className="font-semibold mb-2">💡 نکات مهم:</div>
              <ul className="text-sm space-y-1 list-disc list-inside opacity-90">
                <li>روزانه 2-4 ساعت مطالعه کنید</li>
                <li>بر موضوعات با اولویت بالا تمرکز کنید</li>
                <li>هر روز 10 دقیقه استراحت بگیرید</li>
                <li>یادداشت‌های خود را خوب سازماندهی کنید</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        {showPlan && (
          <div className="space-y-3">
            <Link
              href="/lessons"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              شروع اولین درس 🚀
            </Link>
            <Link
              href="/dashboard"
              className="block w-full text-center px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              مشاهده داشبورد 📊
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
