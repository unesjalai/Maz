'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { OptionButtons } from '@/components/chat/option-buttons'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

const assessmentQuestions = [
  {
    id: '1',
    subject: 'ریاضی',
    question: 'مشتق تابع f(x) = x³ - 2x² + 5 چیست؟',
    options: [
      { id: 'a', label: '3x² - 4x', color: 'blue' as const },
      { id: 'b', label: '3x² - 2x + 5', color: 'green' as const },
      { id: 'c', label: 'x² - x', color: 'orange' as const },
    ],
    correct: 'a',
  },
  {
    id: '2',
    subject: 'فارسی',
    question: 'نویسنده کتاب "کلیله و دمنه" کیست؟',
    options: [
      { id: 'a', label: 'فردوسی', color: 'blue' as const },
      { id: 'b', label: 'ابن مقفع', color: 'green' as const },
      { id: 'c', label: 'نظامی', color: 'orange' as const },
    ],
    correct: 'b',
  },
  {
    id: '3',
    subject: 'علوم',
    question: 'pH محلول خنثی در دمای 25 درجه سلسیوس برابر است با:',
    options: [
      { id: 'a', label: '0', color: 'blue' as const },
      { id: 'b', label: '7', color: 'green' as const },
      { id: 'c', label: '14', color: 'orange' as const },
    ],
    correct: 'b',
  },
]

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'حالا سطح دانش کنونی شما را ارزیابی می‌کنیم. 📋',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'advisor' as const,
      content: 'این یک آزمون کوتاه از مختلف موضوعات است. تمام تلاش خود را بکنید!',
      timestamp: new Date(Date.now() + 1000),
    },
  ])

  useEffect(() => {
    if (currentQuestionIndex < assessmentQuestions.length) {
      const question = assessmentQuestions[currentQuestionIndex]
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `q-${question.id}`,
            type: 'advisor' as const,
            content: `سوال ${currentQuestionIndex + 1}/${assessmentQuestions.length} (${question.subject}): ${question.question}`,
            timestamp: new Date(),
          },
        ])
      }, 600)
    }
  }, [currentQuestionIndex])

  const handleAnswerSelect = (optionId: string) => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex]
    setSelectedAnswer(optionId)
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))

    const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId)
    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'user' as const,
        content: selectedOption?.label || 'پاسخ داده شد',
        timestamp: new Date(),
      },
    ])

    setShowFeedback(true)

    setTimeout(() => {
      const isCorrect = optionId === currentQuestion.correct
      if (isCorrect) {
        setScore((prev) => prev + 1)
        setMessages((prev) => [
          ...prev,
          {
            id: `feedback-${Date.now()}`,
            type: 'advisor' as const,
            content: '✅ آفرین! پاسخ صحیح است! شما به موضوع خوب تسلط دارید.',
            timestamp: new Date(),
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `feedback-${Date.now()}`,
            type: 'advisor' as const,
            content: '❌ متأسفانه پاسخ صحیح نیست. اما نگران نباشید، ما در این موضوع روی آن کار خواهیم کرد!',
            timestamp: new Date(),
          },
        ])
      }

      if (currentQuestionIndex < assessmentQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedAnswer(null)
          setShowFeedback(false)
        }, 1500)
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `final-${Date.now()}`,
              type: 'advisor' as const,
              content: `نتیجه نهایی: ${score + (optionId === currentQuestion.correct ? 1 : 0)} از ${assessmentQuestions.length} 🎉`,
              timestamp: new Date(),
            },
            {
              id: `final-${Date.now()}-1`,
              type: 'advisor' as const,
              content: 'حالا نقشه مطالعاتی شخصی‌سازی‌شده شما را ایجاد می‌کنم...',
              timestamp: new Date(Date.now() + 1000),
            },
          ])
        }, 1500)
      }
    }, 1000)
  }

  const currentQuestion = assessmentQuestions[currentQuestionIndex]
  const isComplete = currentQuestionIndex >= assessmentQuestions.length

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">ارزیابی دانش</h1>
            <p className="text-sm text-muted-foreground">مرحله 3 از 3</p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{score}</div>
          <div className="text-xs text-muted-foreground">امتیاز</div>
        </div>
      </div>

      {/* Progress Bar */}
      {!isComplete && (
        <div className="px-4 py-2 bg-white/50 dark:bg-slate-800/50">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            سوال {currentQuestionIndex + 1} از {assessmentQuestions.length}
          </p>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        {!isComplete && !showFeedback && (
          <OptionButtons
            options={currentQuestion.options.map((opt) => ({
              id: opt.id,
              label: opt.label,
              color: opt.color,
            }))}
            onSelect={handleAnswerSelect}
          />
        )}

        {showFeedback && currentQuestionIndex < assessmentQuestions.length - 1 && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">در حال رفتن به سوال بعد...</p>
          </div>
        )}

        {isComplete && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center mb-3">نقشه مطالعاتی در حال تهیه...</p>
            <Link
              href="/study-plan"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              ادامه به مرحله بعد ➡️
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
