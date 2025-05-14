"use client"

import { Button } from "@/components/ui/button"

// MicrosoftButton: Handles Microsoft login button and logic
// Usage: <MicrosoftButton isLoading={isLoading} />
export function MicrosoftButton({ isLoading }: { isLoading: boolean }) {
  const handleMicrosoftLogin = async () => {
    // Implement Microsoft login logic here
    // For example: await signInWithMicrosoft()
  }
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={handleMicrosoftLogin}
      className="flex items-center justify-center gap-2"
    >
      {/* Microsoft SVG Icon */}
      <svg className="h-5 w-5" viewBox="0 0 23 23">
        <path fill="#f3f3f3" d="M0 0h23v23H0z" />
        <path fill="#f35325" d="M1 1h10v10H1z" />
        <path fill="#81bc06" d="M12 1h10v10H12z" />
        <path fill="#05a6f0" d="M1 12h10v10H1z" />
        <path fill="#ffba08" d="M12 12h10v10H12z" />
      </svg>
      Microsoft
    </Button>
  )
} 