import { LoginForm } from "./login-form"
import { cookies } from "next/headers"

// LoginPage: Shows different header for first-time and returning users
export default async function LoginPage() {
  // Read cookies from the request (server component)
  const cookieStore = await cookies()
  const returningUserCookie = cookieStore.get("returning_user")?.value

  // Show 'Login' if first visit (cookie missing or 'new'), else 'Welcome back'
  const isFirstVisit = !returningUserCookie || returningUserCookie === "new"
  const header = isFirstVisit ? "Login" : "Welcome back"
  const subtext = isFirstVisit
    ? "Sign in to your account for the first time"
    : "Sign in to your account to continue"

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          {/* Show different header for returning/first-time users */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{header}</h1>
          <p className="mt-2 text-sm text-gray-600">{subtext}</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
