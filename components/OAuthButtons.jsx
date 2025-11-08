"use client"

import { Github, Chrome } from "lucide-react"

export function OAuthButtons() {
  const handleOAuth = (provider) => {
    // Mock OAuth - just show a toast
    console.log(`OAuth with ${provider}`)
  }

  // return (
  //   <div className="space-y-3">
  //     <button
  //       onClick={() => handleOAuth("google")}
  //       className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition"
  //     >
  //       <Chrome className="w-4 h-4" />
  //       <span className="text-sm font-medium">Continue with Google</span>
  //     </button>
  //     <button
  //       onClick={() => handleOAuth("github")}
  //       className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition"
  //     >
  //       <Github className="w-4 h-4" />
  //       <span className="text-sm font-medium">Continue with GitHub</span>
  //     </button>
  //   </div>
  // )
}
