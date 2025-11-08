"use client"

import { useEffect, useState } from "react"
import { authStorage, userStorage } from "@/lib/storage"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = userStorage.getUser()
    const storedToken = authStorage.getToken()
    setUser(storedUser)
    setToken(storedToken)
    setLoading(false)
  }, [])

  const login = (userData) => {
    userStorage.setUser(userData)
    const token = "mock_jwt_" + Math.random().toString(36).substr(2, 9)
    authStorage.setToken(token)
    setUser(userData)
    setToken(token)
  }

  const logout = () => {
    userStorage.clearUser()
    authStorage.clearToken()
    setUser(null)
    setToken(null)
  }

  return { user, token, loading, login, logout, isAuthenticated: !!token }
}
