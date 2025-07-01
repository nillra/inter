"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { loginUser } from "../../src/api/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    username: formData.username,
    password: formData.password,
  };

  try {
    const result = await loginUser(payload);
    console.log("🔁 Backend Response:", result); // 👉 This logs the full response

    if (result.success && result.data?.user) {
  const userData = result.data.user;

  localStorage.setItem("user", JSON.stringify({
    id: userData.id, // or _id if that's used
    username: userData.username || "", // fallback if undefined
    email: userData.email
  }));

  alert("Login successful!");
  router.push("/");
} else {
  alert(result.data?.message || "Login failed");
}

  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 via-yellow-50 via-emerald-50 via-cyan-50 via-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/50 dark:via-blue-900/50 dark:via-indigo-900/50 dark:to-violet-900/50 animate-gradient-xy flex items-center justify-center p-4 relative overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 dark:from-blue-600 dark:via-indigo-600 dark:to-violet-600 rounded-full opacity-20 dark:opacity-30 animate-pulse delay-1000 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 dark:from-orange-600 dark:via-red-600 dark:to-pink-600 rounded-full opacity-10 dark:opacity-20 animate-pulse delay-500 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-700">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 text-white p-3 rounded-lg shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-gradient-x bg-300%">
              <User className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Interview Insights
            </span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Sign in to your account to continue sharing and learning
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-500">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300 font-medium">
                  Username
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-gray-700"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-in slide-in-from-right-4 duration-500 delay-700">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 bg-white dark:bg-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
  Forgot your password?
</Link>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-purple-700 transition-all">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Separator className="my-4" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
