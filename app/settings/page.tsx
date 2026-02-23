'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AdvisorAvatar } from '@/components/chat/advisor-avatar'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [dailyReminder, setDailyReminder] = useState('09:00')

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <AdvisorAvatar size="md" />
          <div>
            <h1 className="text-lg font-bold text-foreground">تنظیمات</h1>
            <p className="text-sm text-muted-foreground">شخصی‌سازی تجربه شما</p>
          </div>
        </div>
        <Link href="/dashboard" className="text-primary hover:text-opacity-80">
          ⬅️
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Account Section */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-foreground mb-4">👤 حساب کاربری</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">نام کاربری</label>
              <input
                type="text"
                defaultValue="علی محمدی"
                className="w-full mt-2 px-4 py-2 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">ایمیل</label>
              <input
                type="email"
                defaultValue="ali@example.com"
                className="w-full mt-2 px-4 py-2 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-foreground mb-4">📚 تنظیمات یادگیری</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">ساعات مطالعه روزانه</label>
              <select className="w-full mt-2 px-4 py-2 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                <option>1-2 ساعت</option>
                <option selected>2-4 ساعت</option>
                <option>4-6 ساعت</option>
                <option>6+ ساعت</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">سطح سختی درس‌ها</label>
              <select className="w-full mt-2 px-4 py-2 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                <option>آسان</option>
                <option selected>متوسط</option>
                <option>سخت</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-foreground mb-4">🔔 نوتیفیکیشن‌ها</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">فعال‌سازی نوتیفیکیشن</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-all ${notifications ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-all ${notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </button>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">یادآوری روزانه</label>
              <input
                type="time"
                value={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.value)}
                className="w-full mt-2 px-4 py-2 bg-input text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-foreground mb-4">🎨 نمایش</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">حالت تاریک</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-all ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-all ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-5 rounded-2xl shadow-lg">
          <h2 className="font-semibold mb-2">ℹ️ درباره</h2>
          <p className="text-sm opacity-90 mb-3">مشاور هوشمند کنکور</p>
          <p className="text-xs opacity-75">نسخه: 1.0.0</p>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition-all duration-200 active:scale-95 shadow-md">
          🚪 خروج از حساب
        </button>
      </div>
    </div>
  )
}
