'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChatContainer } from '@/components/chat/chat-container'
import { OptionButtons } from '@/components/chat/option-buttons'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'
import { SubjectRatingInput } from '@/components/quiz/subject-rating-input'

const quizQuestions = [
  {
    id: '1',
    question: 'شما بهتر از چه روشی یاد می‌گیرید؟',
    type: 'options' as const,
    options: [
      { id: 'visual', label: '👁️ بصری (نمودارها، تصاویر)', color: 'blue' as const },
      { id: 'auditory', label: '👂 شنیداری (درس شفاهی)', color: 'green' as const },
      { id: 'kinesthetic', label: '✍️ عملی (نوشتن، حل مسئله)', color: 'orange' as const },
    ],
  },
  {
    id: '2',
    question: 'چند ساعت می‌توانید روزانه مطالعه کنید؟',
    type: 'options' as const,
    options: [
      { id: 'hours-2', label: '⏰ 1-2 ساعت', color: 'blue' as const },
      { id: 'hours-4', label: '⏰ 2-4 ساعت', color: 'green' as const },
      { id: 'hours-6', label: '⏰ 4+ ساعت', color: 'purple' as const },
    ],
  },
  {
    id: '3',
    question: 'در هر یک از دروس زیر از 1 تا 5 چه میزان تسلط دارید؟',
    type: 'rating' as const,
    subjects: [
      { id: 'biology', name: 'زیست‌شناسی', emoji: '🧬' },
      { id: 'chemistry', name: 'شیمی', emoji: '⚗️' },
      { id: 'physics', name: 'فیزیک', emoji: '⚛️' },
      { id: 'math', name: 'ریاضی', emoji: '📐' },
      { id: 'geology', name: 'زمین‌شناسی', emoji: '🌍' },
    ],
  },
]

export default function PersonalityQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [subjectRatings, setSubjectRatings] = useState<Record<string, number>>({})
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'advisor' as const,
      content: 'بسیار خوب! حالا بیایید یک پرسش‌نامه کوتاه انجام دهیم تا بهتر شما را بشناسم. 📝',
    },
  ])

  useEffect(() => {
    if (currentQuestionIndex < quizQuestions.length) {
      const question = quizQuestions[currentQuestionIndex]
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `q-${question.id}-${Date.now()}`,
            type: 'advisor' as const,
            content: `سوال ${currentQuestionIndex + 1}/${quizQuestions.length}: ${question.question}`,
          },
        ])
      }, 600)
    }
  }, [currentQuestionIndex])

  const handleOptionSelect = (optionId: string) => {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    if (currentQuestion.type !== 'options') return

    const selectedOption = currentQuestion.options?.find((opt) => opt.id === optionId)

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }))

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'user' as const,
        content: selectedOption?.label || 'پاسخ داده شد',
      },
    ])

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 400)
    } else {
      completeQuiz()
    }
  }

  const handleRatingSubmit = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    if (currentQuestion.type !== 'rating') return

    const allRated = currentQuestion.subjects?.every((subject) => subjectRatings[subject.id])

    if (!allRated) {
      setMessages((prev) => [
        ...prev,
        {
          id: `warning-${Date.now()}`,
          type: 'advisor' as const,
          content: 'لطفاً به همه دروس امتیاز دهید. 🙏',
        },
      ])
      return
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'user' as const,
        content: 'امتیازات ثبت شد ✅',
      },
    ])

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 400)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `final-${Date.now()}`,
          type: 'advisor' as const,
          content: 'عالی! من اطلاعات زیادی درباره شما یاد گرفتم. 🎉',
        },
        {
          id: `final-${Date.now()}-1`,
          type: 'advisor' as const,
          content: 'حالا بیایید نتایج را با هم ببینیم...',
        },
      ])
    }, 400)
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">پرسش‌نامه شخصیتی</h1>
            <p className="text-sm text-muted-foreground">مرحله 1 از 3</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-white/50 dark:bg-slate-800/50">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-center">
          سوال {currentQuestionIndex + 1} از {quizQuestions.length}
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatContainer messages={messages} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 pb-20 border-t border-border bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        {currentQuestionIndex < quizQuestions.length && currentQuestion.type === 'options' && (
          <OptionButtons
            options={currentQuestion.options?.map((opt) => ({
              id: opt.id,
              label: opt.label,
              color: opt.color,
            })) || []}
            onSelect={handleOptionSelect}
          />
        )}

        {currentQuestionIndex < quizQuestions.length && currentQuestion.type === 'rating' && (
          <div className="space-y-4">
            <SubjectRatingInput
              subjects={currentQuestion.subjects || []}
              ratings={subjectRatings}
              onRatingChange={(subjectId, rating) => {
                setSubjectRatings((prev) => ({ ...prev, [subjectId]: rating }))
              }}
            />
            <Link
              href="/learning-profile"
              onClick={(e) => {
                const allRated = currentQuestion.subjects?.every((subject) => subjectRatings[subject.id])
                if (!allRated) {
                  e.preventDefault()
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: `warning-${Date.now()}`,
                      type: 'advisor' as const,
                      content: 'لطفاً به همه دروس امتیاز دهید. 🙏',
                    },
                  ])
                }
              }}
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              ثبت امتیازات ✅
            </Link>
          </div>
        )}

        {currentQuestionIndex >= quizQuestions.length && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center mb-3">تبریک! اطلاعات شما ثبت شد</p>
            <Link
              href="/"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
