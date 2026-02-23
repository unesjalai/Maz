'use client'

import React from 'react'

interface SubjectRatingInputProps {
  subjects: { id: string; name: string; emoji: string }[]
  ratings: Record<string, number>
  onRatingChange: (subjectId: string, rating: number) => void
}

export function SubjectRatingInput({ subjects, ratings, onRatingChange }: SubjectRatingInputProps) {
  return (
    <div className="space-y-4">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-4 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{subject.emoji}</span>
              <span className="font-semibold text-foreground">{subject.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {ratings[subject.id] ? `امتیاز: ${ratings[subject.id]}` : 'انتخاب نشده'}
            </span>
          </div>

          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(subject.id, rating)}
                className={`
                  flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 active:scale-95
                  ${
                    ratings[subject.id] === rating
                      ? rating === 5
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                        : rating === 4
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                          : rating === 3
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                            : rating === 2
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }
                `}
              >
                {rating}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
            <span>ضعیف</span>
            <span>عالی</span>
          </div>
        </div>
      ))}
    </div>
  )
}
