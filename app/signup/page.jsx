"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { registerUser } from "../../src/api/auth"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const router = useRouter()

const handleSubmit = async (e) => {
  e.preventDefault()

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  if (!formData.agreeToTerms) {
    alert("Please agree to the terms and conditions")
    return
  }

  const payload = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  }

  try {
    const result = await registerUser(payload)

    if (result.success) {
      alert("Account created successfully!")
      router.push("/login")
    } else {
      alert(result.message || "Registration failed")
    }
  } catch (err) {
    console.error("Signup error:", err)
    alert("Something went wrong. Please try again.")
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 via-yellow-50 via-emerald-50 via-cyan-50 via-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/50 dark:via-blue-900/50 dark:via-indigo-900/50 dark:to-violet-900/50 animate-gradient-xy flex items-center justify-center p-4 relative overflow-hidden animate-in fade-in duration-1000">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 dark:from-blue-600 dark:via-indigo-600 dark:to-violet-600 rounded-full opacity-20 dark:opacity-30 animate-pulse delay-1000 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 rounded-full opacity-10 dark:opacity-20 animate-pulse delay-500 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Enhanced Logo */}
        <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-700">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 dark:from-purple-600 dark:via-blue-600 dark:via-indigo-600 dark:to-violet-600 text-white p-3 rounded-lg shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-gradient-x bg-300%">
              <User className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-green-600 transition-all duration-300 animate-gradient-x bg-300%">
              Interview Insights
            </span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Join thousands of professionals sharing interview experiences
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Enhanced form fields with staggered animations */}
              <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-400">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300 font-medium">
                  Full Name
                </Label>
                <div className="relative group">
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-colors group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 bg-white dark:bg-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-500">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-colors group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 bg-white dark:bg-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-600">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-colors group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 bg-white dark:bg-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-700">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-colors group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 bg-white dark:bg-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2 animate-in slide-in-from-left-4 duration-500 delay-800">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 dark:hover:from-purple-700 dark:hover:via-blue-700 dark:hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-in slide-in-from-bottom-4 duration-500 delay-1200 animate-gradient-x bg-300%"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Sign up with Facebook
                </Button>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-300 dark:hover:to-pink-300 hover:underline font-medium transition-all duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
