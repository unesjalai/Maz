'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { OptionButtons } from '@/components/chat/option-buttons'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

const lessons = [
  {
    id: '1',
    title: 'توابع و مشتقات',
    subject: 'ریاضی',
    questions: 5,
    difficulty: 'متوسط',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: '2',
    title: 'معادلات درجه دوم',
    subject: 'ریاضی',
    questions: 4,
    difficulty: 'سخت',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: '3',
    title: 'شاهنامه و ادبیات کلاسیک',
    subject: 'فارسی',
    questions: 6,
    difficulty: 'متوسط',
    color: 'from-pink-400 to-pink-600',
  },
  {
    id: '4',
    title: 'شیمی آلی - واکنش‌های عضوی',
    subject: 'علوم',
    questions: 5,
    difficulty: 'سخت',
    color: 'from-green-400 to-green-600',
  },
]

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'خوش آمدید به بخش یادگیری! 📖',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'advisor' as const,
      content: 'از لیست زیر یکی از درس‌ها را انتخاب کنید و بیایید شروع کنیم!',
      timestamp: new Date(Date.now() + 1000),
    },
  ])

  const handleSelectLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId)
    setSelectedLesson(lessonId)
    setCurrentQuestion(0)

    setMessages((prev) => [
      ...prev,
      {
        id: `lesson-${Date.now()}`,
        type: 'user' as const,
        content: lesson?.title || 'درس انتخاب شد',
        timestamp: new Date(),
      },
      {
        id: `lesson-${Date.now()}-1`,
        type: 'advisor' as const,
        content: `عالی! درس "${lesson?.title}" را شروع می‌کنیم. این درس ${lesson?.questions} سوال دارد. 💪`,
        timestamp: new Date(Date.now() + 1000),
      },
      {
        id: `lesson-${Date.now()}-2`,
        type: 'advisor' as const,
        content: 'توجه کنید به توضیحات و پاسخ‌های صحیح.',
        timestamp: new Date(Date.now() + 2000),
      },
    ])
  }

  const handleAnswerQuestion = (answerId: string) => {
    const lesson = lessons.find((l) => l.id === selectedLesson)
    if (!lesson) return

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'user' as const,
        content: `جواب ${String.fromCharCode(65 + currentQuestion)}: ${answerId}`,
        timestamp: new Date(),
      },
      {
        id: `answer-${Date.now()}-1`,
        type: 'advisor' as const,
        content: '✅ آفرین! این پاسخ صحیح است. شما 10 امتیاز کسب کردید! 🌟',
        timestamp: new Date(Date.now() + 1000),
      },
    ])

    if (currentQuestion < lesson.questions - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 2000)
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `complete-${Date.now()}`,
            type: 'advisor' as const,
            content: `تبریک! درس "${lesson.title}" را کامل کردید! 🎉`,
            timestamp: new Date(),
          },
          {
            id: `complete-${Date.now()}-1`,
            type: 'advisor' as const,
            content: 'آیا می‌خواهید درسی دیگری شروع کنید؟',
            timestamp: new Date(Date.now() + 1000),
          },
        ])
        setCompletedLessons((prev) => [...prev, selectedLesson])
        setSelectedLesson(null)
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">درس‌ها و تمرین‌ها</h1>
            <p className="text-sm text-muted-foreground">{completedLessons.length} درس کامل شده</p>
          </div>
        </div>
        <Link href="/dashboard" className="text-primary hover:text-opacity-80">
          📊
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        {!selectedLesson && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-semibold px-1 mb-3">درس‌های موجود:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  disabled={completedLessons.includes(lesson.id)}
                  className={`bg-gradient-to-r ${lesson.color} text-white p-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
                >
                  <div>{lesson.title}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {completedLessons.includes(lesson.id) ? '✅ کامل شده' : `${lesson.questions} سوال`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedLesson && (
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground">
              سوال {currentQuestion + 1} از {lessons.find((l) => l.id === selectedLesson)?.questions}
            </div>
            <OptionButtons
              options={[
                { id: 'a', label: 'گزینه A', color: 'blue' },
                { id: 'b', label: 'گزینه B', color: 'green' },
                { id: 'c', label: 'گزینه C', color: 'orange' },
              ]}
              onSelect={handleAnswerQuestion}
            />
          </div>
        )}
      </div>
    </div>
  )
}
