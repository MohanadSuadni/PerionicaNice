'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {  premiumLogo } from '@/public'
export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email ili lozinka nisu ispravni.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="h-1.5 w-full bg-[#1687e8]" />

      <div className="flex min-h-[calc(100vh-6px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-[440px]">

          <div className="mb-7 flex justify-center">
            <div className="relative flex h-30 w-30 items-center justify-center">
              <Image
  src="/Stylized__N__Logo_Design-removebg-preview (1).png"
                  alt="Perionica veša Nice"
                width={150}
                height={150}
                priority
                className="h-30 w-30 object-contain"
              />
            </div>
          </div>

          <div className="mb-7 text-center">
            <h1 className="text-[30px] font-bold tracking-tight text-[#172033]">
              Admin Panel
            </h1>

            <p className="mt-2 text-[15px] text-slate-500">
              Prijavite se da biste pristupili administraciji
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-100 bg-white p-7 shadow-[0_12px_45px_rgba(30,60,90,0.09)] sm:p-9">

            <form onSubmit={handleLogin} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#172033]"
                >
                  Email
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className="h-[54px] w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-12 pr-4 text-[15px] text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1687e8] focus:bg-white focus:ring-4 focus:ring-[#1687e8]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#172033]"
                >
                  Lozinka
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </span>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-[54px] w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-12 pr-4 text-[15px] text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1687e8] focus:bg-white focus:ring-4 focus:ring-[#1687e8]/10"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    !
                  </div>

                  <p className="text-sm text-red-600">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#1687e8] px-5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(22,135,232,0.25)] transition-all duration-200 hover:bg-[#0878d4] hover:shadow-[0_8px_24px_rgba(22,135,232,0.3)] focus:outline-none focus:ring-4 focus:ring-[#1687e8]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />

                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>

                    Prijavljivanje...
                  </>
                ) : (
                  <>
                    Uloguj se

                    <svg
                      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3 20 7v5c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V7l8-4Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

                <span>Bezbedan pristup administraciji</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/sr"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-[#1687e8]"
            >
              <span>←</span>
              Nazad na sajt
            </a>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Perionica veša Nice
          </p>

        </div>
      </div>
    </main>
  )
}