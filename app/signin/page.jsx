"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { OAuthButtons } from "@/components/OAuthButtons"
import { useAuth } from "@/hooks/useAuth"
import { validateEmail } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("demo@NexoVate.com")
  const [password, setPassword] = useState("password123")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    setLoading(true)

    // Mock API call
    setTimeout(() => {
      // Mock successful login
      login({
        id: 1,
        email,
        name: email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        bio: "Lifelong learner",
        enrolledCourses: [1, 2],
      })

      router.push("/dashboard")
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-md w-full mx-auto px-4 py-20">
        <div className="rounded-lg border border-border bg-background shadow-sm p-8">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-foreground-muted mb-8">Sign in to your account to continue learning</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-foreground-muted">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* OAuth */}
          <OAuthButtons />

          {/* Footer */}
          <p className="text-center text-sm text-foreground-muted mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
          <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Credentials:</p>
          <p className="text-blue-800 dark:text-blue-200">
            Email: <span className="font-mono">demo@NexoVate.com</span>
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
