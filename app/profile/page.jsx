"use client"

import { useState } from "react"

import {
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  BookOpen,
  Target,
  Edit3,
  Share2,
  Heart,
  MessageCircle,
  Clock,
  CheckCircle,
  Copy,
  Check,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Badge } from "@/components/ui/badge"

import { Progress } from "@/components/ui/progress"

import Navigation from "@/components/navigation"

import InterviewPost from "@/components/interview-post"

import { useEffect, useRef } from "react"

import { getUserProfile, getUserPosts } from "../../src/api/auth" // adjust based on your project structure

import { useRouter } from "next/navigation"

import { CameraIcon } from "lucide-react"

// Share Profile Modal Component

const ShareProfileModal = ({ isOpen, onClose, userProfile }) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const profileUrl = `${window.location.origin}/profile/${userProfile?.id}`

  const shareText = `Check out ${userProfile?.fullName}'s profile on InterviewHub - ${userProfile?.currentRole} at ${userProfile?.company}`

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)

      setCopied(true)

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`

    window.open(linkedInUrl, "_blank", "width=600,height=400")
  }

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
            Share Profile
          </h3>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* LinkedIn Share */}

          <button
            onClick={handleLinkedInShare}
            className="w-full flex items-center space-x-3 p-4 bg-[#0077B5] hover:bg-[#005885] text-white rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#0077B5] font-bold text-sm">in</span>
            </div>

            <span className="font-medium">Share on LinkedIn</span>
          </button>

          {/* WhatsApp Share */}

          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center space-x-3 p-4 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#25D366] font-bold text-lg">📱</span>
            </div>

            <span className="font-medium">Share on WhatsApp</span>
          </button>

          {/* Copy URL */}

          <button
            onClick={handleCopyUrl}
            className="w-full flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded flex items-center justify-center">
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            </div>

            <span className="font-medium">{copied ? "Copied!" : "Copy Profile URL"}</span>
          </button>
        </div>

        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{profileUrl}</p>
        </div>
      </div>
    </div>
  )
}

const practiceHistory = [
  { company: "Google", questionsCompleted: 45, totalQuestions: 60, progress: 75, lastPracticed: "2 hours ago" },

  { company: "Microsoft", questionsCompleted: 38, totalQuestions: 50, progress: 76, lastPracticed: "1 day ago" },

  { company: "Amazon", questionsCompleted: 32, totalQuestions: 55, progress: 58, lastPracticed: "3 days ago" },

  { company: "Meta", questionsCompleted: 25, totalQuestions: 45, progress: 56, lastPracticed: "5 days ago" },

  { company: "Apple", questionsCompleted: 16, totalQuestions: 40, progress: 40, lastPracticed: "1 week ago" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const router = useRouter()

  const [userProfile, setUserProfile] = useState(null)

  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState(null)

  const [shareModalOpen, setShareModalOpen] = useState(false)

  // const [posts, setPosts] = useState([]);

  const fileInputRef = useRef(null)

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = async () => {
        const base64String = reader.result

        try {
          // Update state immediately for preview

          setUserProfile((prev) => ({ ...prev, profilePicture: base64String }))

          const storedUser = JSON.parse(localStorage.getItem("user"))

          const userId = storedUser?.id

          // Send to backend

          const response = await fetch(`http://localhost:8080/api/users/${userId}/profile-pic`, {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ profilePic: base64String }),
          })

          if (!response.ok) {
            throw new Error("Failed to upload profile picture.")
          }

          console.log("Profile picture updated successfully.")
        } catch (error) {
          console.error("Upload error:", error.message)
        }
      }

      reader.readAsDataURL(file) // Converts to base64
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"))

      const userId = user?.id

      if (!userId) {
        console.error("User ID not found in localStorage")

        return
      }

      try {
        const profileData = await getUserProfile(userId)
        console.log("Final image src:", profileData)

        const posts = await getUserPosts(userId) // fetch user posts
        console.log("Final image src:", userProfile?.profilePicture)
        setUserProfile({ ...profileData, posts }) // merge posts into profile
      } catch (err) {
        console.error("Error fetching user profile or posts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <div>Loading...</div>

  if (!userProfile) return <div>User not found.</div>

  const userPosts = userProfile?.posts || []

  const postsCount = userPosts.length

  const totalLikes = userPosts.reduce((acc, post) => acc + (post.likes || 0), 0)

  const totalComments = userPosts.reduce((acc, post) => acc + (post.comments?.length || 0), 0)

  const companiesExplored = new Set(userPosts.map((post) => post.companyname || "")).size

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 via-yellow-50 via-emerald-50 via-cyan-50 via-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/50 dark:via-blue-900/50 dark:via-indigo-900/50 dark:to-violet-900/50 animate-gradient-xy transition-all duration-1000 animate-in fade-in duration-700">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}

        <div className="relative mb-8 animate-in slide-in-from-top-4 duration-700">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 dark:from-purple-600 dark:via-blue-600 dark:via-indigo-600 dark:via-violet-600 dark:to-purple-700 h-48 rounded-2xl relative overflow-hidden animate-gradient-x bg-300%">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 via-blue-600/20 via-green-600/20 to-yellow-600/20 dark:from-purple-800/30 dark:via-blue-800/30 dark:via-indigo-800/30 dark:via-violet-800/30 dark:to-purple-900/30 animate-pulse"></div>
          </div>

          <div className="relative -mt-16 px-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative group">
                <img
  src={
    userProfile?.profilePicture?.startsWith("data:image")
      ? userProfile.profilePicture
      : `data:image/png;base64,${userProfile.profilePicture}`
  }
  alt={userProfile?.fullName || "user"}
  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl group-hover:scale-105 transition-transform duration-300"
/>





                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-green-400 dark:from-purple-500 dark:via-blue-500 dark:via-indigo-500 dark:to-violet-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-gradient-x"></div>

                {/* Profile Picture Upload Button */}

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-gray-200"
                >
                  <CameraIcon className="w-4 h-4 text-gray-600" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                      {userProfile.fullName}
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                      {userProfile.currentRole} at {userProfile.company}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />

                        <span>{userProfile.location}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />

                        <span>Joined {userProfile.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShareModalOpen(true)}
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transform hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => router.push("/profile/edit")} // <--- trigger modal
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 dark:hover:from-purple-700 dark:hover:via-blue-700 dark:hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 animate-gradient-x bg-300%"
                    >
                      <Edit3 href="/EditProfileModal" className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{userProfile.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            {
              label: "Posts",

              value: postsCount,

              icon: BookOpen,

              color: "from-pink-500 to-rose-500 dark:from-purple-500 dark:to-pink-500",
            },

            {
              label: "Likes",

              value: totalLikes,

              icon: Heart,

              color: "from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600",
            },

            {
              label: "Comments",

              value: totalComments || 0,

              icon: MessageCircle,

              color: "from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600",
            },

            {
              label: "Practice",

              value: userProfile.stats?.practiceQuestions || 10,

              icon: Target,

              color: "from-purple-500 to-violet-500 dark:from-purple-600 dark:to-violet-600",
            },

            {
              label: "Companies",

              value: companiesExplored || 2,

              icon: Briefcase,

              color: "from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600",
            },

            {
              label: "Streak",

              value: `${userProfile?.stats?.streak || 1} days`,

              icon: TrendingUp,

              color: "from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600",
            },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:bg-gradient-to-br hover:from-white hover:to-purple-50/30 dark:hover:from-gray-800 dark:hover:to-purple-900/20 animate-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 animate-gradient-x bg-300%`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>

                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="animate-in slide-in-from-bottom-6 duration-700 delay-500"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-1 rounded-xl shadow-lg border-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 dark:data-[state=active]:from-purple-600 dark:data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
            >
              Overview
            </TabsTrigger>

            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
            >
              My Posts
            </TabsTrigger>

            <TabsTrigger
              value="practice"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-500 dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
            >
              Practice History
            </TabsTrigger>

            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 dark:data-[state=active]:from-violet-600 dark:data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}

          <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}

              <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 dark:hover:from-gray-800 dark:hover:to-blue-900/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />

                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Recent Activity
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {[
                    {
                      action: "Created a new post",

                      target: "Google Interview Experience",

                      time: "2 hours ago",

                      icon: "📝",
                    },

                    { action: "Completed practice", target: "Microsoft DSA Questions", time: "1 day ago", icon: "🎯" },

                    { action: "Received likes", target: "Amazon Interview Post", time: "2 days ago", icon: "❤️" },

                    { action: "Started practicing", target: "Apple System Design", time: "3 days ago", icon: "🚀" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300 animate-in slide-in-from-left-4 duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-2xl">{activity.icon}</span>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>

                        <p className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                          {activity.target}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}

              <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:bg-gradient-to-br hover:from-white hover:to-purple-50/30 dark:hover:from-gray-800 dark:hover:to-purple-900/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />

                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      Progress Overview
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Overall Practice Progress</span>

                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent font-bold">
                          68%
                        </span>
                      </div>

                      <Progress value={68} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Posts Engagement</span>

                        <span className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
                          85%
                        </span>
                      </div>

                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Learning Streak</span>

                        <span className="bg-gradient-to-r from-green-600 to-yellow-600 dark:from-green-400 dark:to-yellow-400 bg-clip-text text-transparent font-bold">
                          15 days
                        </span>
                      </div>

                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Posts Tab */}

          <TabsContent value="posts" className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  My Interview Posts ({userProfile?.posts?.length || 0})
                </h3>

                <Button className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 dark:hover:from-green-700 dark:hover:via-emerald-700 dark:hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-gradient-x bg-300%">
                  Create New Post
                </Button>
              </div>

              <div className="space-y-6">
                {userPosts.map((post, index) => (
                  <div
                    key={post._id || post.id}
                    className="animate-in slide-in-from-left-4 duration-700"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <InterviewPost post={post} profilePic={userProfile?.profilePicture} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Practice History Tab */}

          <TabsContent value="practice" className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Practice Progress by Company
              </h3>

              <div className="grid gap-4">
                {practiceHistory.map((company, index) => (
                  <Card
                    key={company.company}
                    className="hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:bg-gradient-to-r hover:from-white hover:to-purple-50/30 dark:hover:from-gray-800 dark:hover:to-purple-900/20 animate-in slide-in-from-right-4 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 flex items-center justify-center text-white font-bold animate-gradient-x bg-300%">
                            {company.company.charAt(0)}
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{company.company}</h4>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {company.questionsCompleted} of {company.totalQuestions} questions completed
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            {company.progress}%
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Last practiced {company.lastPracticed}
                          </p>
                        </div>
                      </div>

                      <Progress value={company.progress} className="h-3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}

          <TabsContent value="achievements" className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Achievements & Badges
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProfile?.achievements?.map((achievement, index) => (
                  <Card
                    key={achievement.id}
                    className={`hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-0 animate-in slide-in-from-bottom-4 duration-700 ${
                      achievement.earned
                        ? "bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-pink-900/20 border-yellow-200 dark:border-yellow-700"
                        : "bg-white/60 dark:bg-gray-800/60 opacity-60"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`text-6xl mb-4 ${achievement.earned ? "animate-bounce" : "grayscale"}`}>
                        {achievement.icon}
                      </div>

                      <h4
                        className={`font-semibold mb-2 ${achievement.earned ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {achievement.title}
                      </h4>

                      <p
                        className={`text-sm ${achievement.earned ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}
                      >
                        {achievement.description}
                      </p>

                      {achievement.earned && (
                        <Badge className="mt-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-600 dark:via-orange-600 dark:to-red-600 text-white animate-gradient-x bg-300%">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Profile Modal */}

      <ShareProfileModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} userProfile={userProfile} />
    </div>
  )
}
