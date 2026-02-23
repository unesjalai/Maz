'use client'

import React from 'react'

interface OptionButtonsProps {
  options: {
    id: string
    label: string
    color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple'
  }[]
  onSelect: (optionId: string) => void
  disabled?: boolean
}

export function OptionButtons({ options, onSelect, disabled = false }: OptionButtonsProps) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
    green: 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700',
    orange: 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700',
    pink: 'bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700',
    purple: 'bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700',
  }

  const colors: (keyof typeof colorClasses)[] = ['blue', 'green', 'orange', 'pink', 'purple']

  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((option, index) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          disabled={disabled}
          className={`${colorClasses[option.color || colors[index % colors.length]]} text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
