// localStorage utilities for auth, theme, and user data persistence

export const StorageKeys = {
  AUTH_TOKEN: "NexoVate_auth_token",
  USER_DATA: "NexoVate_user_data",
  THEME: "NexoVate_theme",
  COURSE_PROGRESS: "NexoVate_course_progress",
  ONBOARDING_COMPLETE: "NexoVate_onboarding",
}

export const authStorage = {
  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(StorageKeys.AUTH_TOKEN, token)
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(StorageKeys.AUTH_TOKEN)
    }
    return null
  },

  clearToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(StorageKeys.AUTH_TOKEN)
    }
  },
}

export const userStorage = {
  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(user))
    }
  },

  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(StorageKeys.USER_DATA)
      return user ? JSON.parse(user) : null
    }
    return null
  },

  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(StorageKeys.USER_DATA)
    }
  },
}

export const themeStorage = {
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(StorageKeys.THEME, theme)
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  },

  getTheme: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(StorageKeys.THEME) || "light"
    }
    return "light"
  },
}

export const progressStorage = {
  setProgress: (userId, courseId, progress) => {
    if (typeof window !== "undefined") {
      const key = `${StorageKeys.COURSE_PROGRESS}_${userId}_${courseId}`
      localStorage.setItem(key, JSON.stringify(progress))
    }
  },

  getProgress: (userId, courseId) => {
    if (typeof window !== "undefined") {
      const key = `${StorageKeys.COURSE_PROGRESS}_${userId}_${courseId}`
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : { completedLessons: [] }
    }
    return { completedLessons: [] }
  },
}
