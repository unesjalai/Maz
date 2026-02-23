'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

interface Subject {
  id: string
  name: string
  category: string
  color: 'blue' | 'green' | 'orange' | 'pink' | 'purple'
}

const subjects: Subject[] = [
  // زیست‌شناسی
  { id: 'bio1', name: 'زیست ۱ (دهم)', category: 'زیست‌شناسی', color: 'green' },
  { id: 'bio2', name: 'زیست ۲ (یازدهم)', category: 'زیست‌شناسی', color: 'green' },
  { id: 'bio3', name: 'زیست ۳ (دوازدهم)', category: 'زیست‌شناسی', color: 'green' },
  // شیمی
  { id: 'chem1', name: 'شیمی ۱ (دهم)', category: 'شیمی', color: 'orange' },
  { id: 'chem2', name: 'شیمی ۲ (یازدهم)', category: 'شیمی', color: 'orange' },
  { id: 'chem3', name: 'شیمی ۳ (دوازدهم)', category: 'شیمی', color: 'orange' },
  // فیزیک
  { id: 'phys1', name: 'فیزیک ۱ (دهم)', category: 'فیزیک', color: 'blue' },
  { id: 'phys2', name: 'فیزیک ۲ (یازدهم)', category: 'فیزیک', color: 'blue' },
  { id: 'phys3', name: 'فیزیک ۳ (دوازدهم)', category: 'فیزیک', color: 'blue' },
  // ریاضی
  { id: 'math1', name: 'ریاضی ۱ (دهم)', category: 'ریاضی', color: 'purple' },
  { id: 'math2', name: 'ریاضی ۲ (یازدهم)', category: 'ریاضی', color: 'purple' },
  { id: 'math3', name: 'ریاضی ۳ (دوازدهم)', category: 'ریاضی', color: 'purple' },
  // زمین‌شناسی
  { id: 'geo1', name: 'زمین‌شناسی (یازدهم)', category: 'زمین‌شناسی', color: 'pink' },
]

const colorClasses = {
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-green-600',
  orange: 'from-orange-400 to-orange-600',
  pink: 'from-pink-400 to-pink-600',
  purple: 'from-purple-400 to-purple-600',
}

export default function SubjectRatingPage() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [currentCategory, setCurrentCategory] = useState('زیست‌شناسی')
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'عالی! حالا تسلط فعلی خود را برای هر درس مشخص کنید. 📚',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'advisor' as const,
      content: 'هر درس را از 1 (ضعیف) تا 5 (عالی) امتیاز دهید.',
      timestamp: new Date(Date.now() + 500),
    },
  ])
  const [completedCount, setCompletedCount] = useState(0)

  const categories = ['زیست‌شناسی', 'شیمی', 'فیزیک', 'ریاضی', 'زمین‌شناسی']
  const currentCategorySubjects = subjects.filter((s) => s.category === currentCategory)

  const handleRating = (subjectId: string, rating: number) => {
    setRatings((prev) => {
      const newRatings = { ...prev, [subjectId]: rating }
      const newCompleted = Object.keys(newRatings).length
      setCompletedCount(newCompleted)

      // اضافه کردن پیام تشویق
      if (newCompleted === 1 || newCompleted % 3 === 0) {
        setTimeout(() => {
          const messages_text = [
            'خوب پیش می‌رید! ادامه دهید! 💪',
            'عالی! شما تقریباً تمام کردید! 🚀',
            'فوق‌العاده! به زودی کل تصویر را خواهید داشت! ⭐',
          ]
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}`,
              type: 'advisor' as const,
              content: messages_text[Math.floor(Math.random() * messages_text.length)],
              timestamp: new Date(),
            },
          ])
        }, 300)
      }

      return newRatings
    })
  }

  const isAllRated = currentCategorySubjects.every((s) => ratings[s.id] !== undefined)

  const goToNextCategory = () => {
    const currentIndex = categories.indexOf(currentCategory)
    if (currentIndex < categories.length - 1) {
      const nextCategory = categories[currentIndex + 1]
      setCurrentCategory(nextCategory)

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `cat-${Date.now()}`,
            type: 'advisor' as const,
            content: `حالا بیایید درس‌های ${nextCategory} را ارزیابی کنیم.`,
            timestamp: new Date(),
          },
        ])
      }, 300)
    }
  }

  const isAllComplete = subjects.every((s) => ratings[s.id] !== undefined)

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">ارزیابی درس‌ها</h1>
            <p className="text-sm text-muted-foreground">رشته تجربی</p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{completedCount}</div>
          <div className="text-xs text-muted-foreground">از {subjects.length}</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-2 py-2 border-b border-border overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 text-sm ${
                currentCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />
      </div>

      {/* Subjects Grid */}
      <div className="px-4 py-4 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur max-h-64 overflow-y-auto">
        <div className="space-y-3">
          {currentCategorySubjects.map((subject) => (
            <div key={subject.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{subject.name}</span>
                {ratings[subject.id] && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-lg">
                    {ratings[subject.id]}/5
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRating(subject.id, rating)}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                      ratings[subject.id] === rating
                        ? `bg-gradient-to-r ${colorClasses[subject.color]} text-white shadow-md`
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        <div className="space-y-3">
          {!isAllRated ? (
            <button
              onClick={goToNextCategory}
              disabled={!isAllRated}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              {currentCategory === categories[categories.length - 1] ? 'ثبت و ادامه ✅' : 'دسته بعد ➡️'}
            </button>
          ) : (
            <>
              <Link
                href="/assessment"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                ادامه به مرحله بعد ➡️
              </Link>
              <button
                onClick={() => {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: `restart-${Date.now()}`,
                      type: 'advisor' as const,
                      content: 'آیا می‌خواهید امتیازات خود را تغییر دهید؟',
                    },
                  ])
                  setCurrentCategory(categories[0])
                  setRatings({})
                  setCompletedCount(0)
                }}
                className="w-full px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                بازبینی امتیازات 🔄
              </button>
            </>
          )}

          <Link
            href="/"
            className="block w-full text-center px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-foreground rounded-xl font-semibold transition-all duration-200 active:scale-95"
          >
            بازگشت به خانه 🏠
          </Link>
        </div>
      </div>
    </div>
  )
}
