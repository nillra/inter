"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Briefcase, MapPin, BadgeInfo } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getUserProfile } from "../../src/api/auth"

export default function EditProfilePage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    currentRole: "",
    company: "",
    location: "",
    bio: "",
  })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    const id = storedUser?.id
    if (!id) return
    setUserId(id)

    const fetchUser = async () => {
      try {
        const data = await getUserProfile(id)
        setFormData({
          fullName: data.fullName || "",
          currentRole: data.currentRole || "",
          company: data.company || "",
          location: data.location || "",
          bio: data.bio || "",
        })
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    }

    fetchUser()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to update profile")

      alert("Profile updated successfully!")
      router.push("/profile")
    } catch (err) {
      console.error("Error updating profile:", err)
      alert("Failed to update profile")
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Edit Profile
          </h1>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              Update Your Profile Details
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Make changes to your public profile information
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currentRole">Current Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="currentRole"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <BadgeInfo className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, India"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write a short bio..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows="4"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Save Changes
              </Button>

              <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                Don’t want to update?{" "}
                <Link href="/profile" className="text-blue-600 hover:underline">
                  Back to Profile
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
