'use client'

import React, { useRef, useEffect, useState } from 'react'

interface ChatMessage {
  id: string
  type: 'advisor' | 'user'
  content: React.ReactNode
  timestamp?: Date
}

interface ChatContainerProps {
  messages: ChatMessage[]
  isAdvisorTyping?: boolean
}

export function ChatContainer({ messages, isAdvisorTyping = false }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isAdvisorTyping])

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-4 gap-4 scrollbar-hide">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
          <div
            className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
              message.type === 'advisor'
                ? 'bg-white dark:bg-slate-800 text-foreground shadow-md'
                : 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg'
            }`}
          >
            <div className="text-sm md:text-base">{message.content}</div>
          </div>
        </div>
      ))}

      {isAdvisorTyping && (
        <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white dark:bg-slate-800 text-foreground shadow-md px-4 py-3 rounded-2xl">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
