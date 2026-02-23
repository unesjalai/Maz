'use client'

import React from 'react'
import Link from 'next/link'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

const activityHistory = [
  { date: '1402/11/03', time: '14:30', activity: 'درس توابع و مشتقات', type: 'lesson', score: 85 },
  { date: '1402/11/03', time: '13:15', activity: 'آزمون کوتاه - ریاضی', type: 'quiz', score: 92 },
  { date: '1402/11/02', time: '16:45', activity: 'درس معادلات درجه دوم', type: 'lesson', score: 78 },
  { date: '1402/11/02', time: '15:20', activity: 'تمرین شاهنامه', type: 'practice', score: 88 },
  { date: '1402/11/01', time: '14:00', activity: 'ارزیابی سطح دانش', type: 'assessment', score: 75 },
  { date: '1402/10/31', time: '16:30', activity: 'درس شیمی آلی', type: 'lesson', score: 81 },
]

const typeColors = {
  lesson: 'from-blue-400 to-blue-600',
  quiz: 'from-purple-400 to-purple-600',
  practice: 'from-green-400 to-green-600',
  assessment: 'from-orange-400 to-orange-600',
}

const typeEmojis = {
  lesson: '📚',
  quiz: '❓',
  practice: '✏️',
  assessment: '📋',
}

export default function HistoryPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">تاریخچه فعالیت</h1>
            <p className="text-sm text-muted-foreground">تمام فعالیت‌های شما</p>
          </div>
        </div>
        <Link href="/dashboard" className="text-primary hover:text-opacity-80">
          ⬅️
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {activityHistory.map((item, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-r ${typeColors[item.type as keyof typeof typeColors]} text-white p-4 rounded-2xl shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 flex-1">
                  <div className="text-3xl">
                    {typeEmojis[item.type as keyof typeof typeEmojis]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.activity}</p>
                    <div className="flex gap-2 mt-2 text-xs opacity-75">
                      <span>📅 {item.date}</span>
                      <span>🕐 {item.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{item.score}%</div>
                  <div className="text-xs opacity-75">امتیاز</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
