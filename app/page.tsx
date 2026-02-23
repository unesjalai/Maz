'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { OptionButtons } from '@/components/chat/option-buttons'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

export default function HomePage() {
  const [stage, setStage] = useState<'welcome' | 'name'>('welcome')
  const [userName, setUserName] = useState('')
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: '👋 سلام! خوش آمدید به مشاور هوشمند کنکور!',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'advisor' as const,
      content: 'من اینجا هستم تا شما را در مسیر موفقیت در کنکور یاری دهم. بیایید با یکدیگر شروع کنیم!',
      timestamp: new Date(Date.now() + 1000),
    },
  ])

  const handleWelcomeOption = (optionId: string) => {
    // This function is now handled inline in the OptionButtons
  }

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          type: 'user' as const,
          content: userName,
          timestamp: new Date(),
        },
      ])

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-1`,
            type: 'advisor' as const,
            content: `خوشبختم که شما را میشناسم، ${userName}! 🌟`,
            timestamp: new Date(),
          },
          {
            id: `msg-${Date.now()}-2`,
            type: 'advisor' as const,
            content: 'حالا بیایید یک پرسش‌نامه کوتاه برای شناخت نحوه یادگیری شما انجام دهیم.',
            timestamp: new Date(Date.now() + 1000),
          },
          {
            id: `msg-${Date.now()}-3`,
            type: 'advisor' as const,
            content: 'روی دکمه پایین کلیک کنید تا شروع کنیم! 👇',
            timestamp: new Date(Date.now() + 2000),
          },
        ])
      }, 500)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">مشاور کنکور</h1>
            <p className="text-sm text-muted-foreground">آنلاین</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">⚙️</button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        {stage === 'welcome' && (
          <OptionButtons
            options={[
              { id: 'start', label: 'بله، شروع کنیم! 🚀', color: 'blue' },
              { id: 'info', label: 'اطلاعات بیشتر 📖', color: 'purple' },
            ]}
            onSelect={() => {
              setStage('name')
              setMessages((prev) => [
                ...prev,
                {
                  id: `msg-${Date.now()}`,
                  type: 'user' as const,
                  content: 'بله، شروع کنیم!',
                },
              ])
            }}
          />
        )}

        {stage === 'name' && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="نام خود را وارد کنید..."
                className="flex-1 px-4 py-3 rounded-xl bg-input text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl"
              />
              <button
                onClick={handleNameSubmit}
                disabled={!userName.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
              >
                ➡️
              </button>
            </div>
            {userName.trim() && (
              <Link
                href="/personality-quiz"
                className="w-full text-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                بروید به پرسش‌نامه 📝
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
