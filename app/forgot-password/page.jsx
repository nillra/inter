"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, KeyRound } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      })
      const result = await res.json()
      if (result.success) {
        alert("OTP sent to your email")
        setStep(2)
      } else {
        alert(result.message || "Failed to send OTP")
      }
    } catch (err) {
      console.error(err)
      alert("Server error")
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match")
    }

    try {
      const res = await fetch("http://localhost:8080/auth/changePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await res.json()
      if (result.success) {
        alert("Password updated successfully")
        router.push("/login")
      } else {
        alert(result.message || "OTP incorrect or update failed")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/40 dark:to-violet-900/40 animate-gradient-xy flex items-center justify-center p-4 relative overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 dark:from-blue-600 dark:via-indigo-600 dark:to-violet-600 rounded-full opacity-20 dark:opacity-30 animate-pulse delay-1000 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 rounded-full opacity-10 dark:opacity-20 animate-pulse delay-500 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-700">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 text-white p-3 rounded-lg shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <KeyRound className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Forgot Password
            </span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter your details to receive an OTP and update your password
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your registered email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {step === 1 && (
                <Button type="button" onClick={handleSendOtp} className="w-full bg-blue-600 hover:bg-blue-700">
                  Send OTP
                </Button>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Enter the OTP sent to your email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter new password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Update Password
                  </Button>
                </>
              )}
            </form>
            <Separator className="my-6" />
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login again
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
