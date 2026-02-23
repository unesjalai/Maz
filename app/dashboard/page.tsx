'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

export default function DashboardPage() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'خوش آمدید به داشبورد شما! 📊',
      timestamp: new Date(),
    },
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: '2',
          type: 'advisor' as const,
          content: 'بسیار خوب داری پیشرفت می‌کنی! امروز می‌تونی 50 امتیاز دیگه کسب کنی! 💪',
          timestamp: new Date(),
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">داشبورد</h1>
            <p className="text-sm text-muted-foreground">روز خوبی داشتی!</p>
          </div>
        </div>
        <Link href="/settings" className="text-primary hover:text-opacity-80">
          ⚙️
        </Link>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />

        <div className="px-4 py-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stats Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Score Widget */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs opacity-75 mb-1">امتیاز کل</p>
                  <p className="text-3xl font-bold">1,250</p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>
              <div className="text-xs opacity-75">📈 امروز +150 امتیاز</div>
            </div>

            {/* Level Widget */}
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs opacity-75 mb-1">سطح</p>
                  <p className="text-3xl font-bold">7</p>
                </div>
                <div className="text-4xl">🏆</div>
              </div>
              <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-white/80 w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Streak Widget */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-5 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-75 mb-1">روزهای متوالی</p>
                <p className="text-3xl font-bold">8 روز</p>
                <p className="text-xs opacity-75 mt-2">🔥 نفوذت ادامه دار است!</p>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg">
            <p className="font-semibold text-foreground mb-4">پیشرفت این هفته</p>
            <div className="space-y-3">
              {[
                { day: 'شنبه', score: 150, color: 'from-blue-400 to-blue-600' },
                { day: 'یکشنبه', score: 200, color: 'from-green-400 to-green-600' },
                { day: 'دوشنبه', score: 100, color: 'from-yellow-400 to-yellow-600' },
                { day: 'سه‌شنبه', score: 180, color: 'from-pink-400 to-pink-600' },
                { day: 'چهارشنبه', score: 220, color: 'from-purple-400 to-purple-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-foreground w-20">{item.day}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden mx-3">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${(item.score / 250) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-foreground w-10 text-right">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg">
            <p className="font-semibold text-foreground mb-4">فعالیت اخیر</p>
            <div className="space-y-3">
              {[
                { action: 'درس توابع و مشتقات را کامل کردی', time: '2 ساعت پیش', icon: '📚' },
                { action: '15 امتیاز برای جواب صحیح کسب کردی', time: '4 ساعت پیش', icon: '🎯' },
                { action: 'رکورد روزانه جدید: 8 روز متوالی', time: 'امروز', icon: '🔥' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b border-border last:border-b-0">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Link
              href="/lessons"
              className="bg-blue-500 text-white p-4 rounded-2xl text-center font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95 shadow-md"
            >
              📚 درس جدید
            </Link>
            <Link
              href="/history"
              className="bg-purple-500 text-white p-4 rounded-2xl text-center font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95 shadow-md"
            >
              📋 تاریخچه
            </Link>
            <Link
              href="/settings"
              className="bg-pink-500 text-white p-4 rounded-2xl text-center font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95 shadow-md"
            >
              ⚙️ تنظیمات
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
