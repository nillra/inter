"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import InterviewPost from "@/components/interview-post"
import CompanyDashboard from "@/components/company-dashboard"
import ThemeToggle from "@/components/theme-toggle"

const featuredCompanies = [
  { name: "Google", posts: 245, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Microsoft", posts: 189, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Amazon", posts: 167, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Meta", posts: 134, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Apple", posts: 98, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Netflix", posts: 76, logo: "/placeholder.svg?height=40&width=40" },
]

const recentPosts = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    author: "John Doe",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "2 hours ago",
    content:
      "Had my Google SDE interview today. The process was quite smooth with 4 rounds including coding, system design, and behavioral questions. The interviewers were very friendly and helpful.",
    likes: 24,
    comments: 8,
    tags: ["coding", "system-design", "behavioral"],
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Product Manager",
    author: "Sarah Smith",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "5 hours ago",
    content:
      "Microsoft PM interview experience - 3 rounds focusing on product sense, technical understanding, and leadership scenarios. Great learning experience overall!",
    likes: 18,
    comments: 12,
    tags: ["product-management", "leadership"],
  },
  {
    id: 3,
    company: "Amazon",
    position: "Data Scientist",
    author: "Mike Johnson",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "1 day ago",
    content:
      "Amazon Data Scientist role interview - Heavy focus on machine learning concepts, SQL queries, and behavioral questions around leadership principles.",
    likes: 31,
    comments: 15,
    tags: ["data-science", "machine-learning", "sql"],
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Set to true for demo, false by default

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSelectedCompany(searchQuery.trim())
    }
  }

  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName)
    setSearchQuery(companyName)
  }

  if (selectedCompany) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
        <Navigation />
        {isLoggedIn && <ThemeToggle />}
        <CompanyDashboard companyName={selectedCompany} onBack={() => setSelectedCompany(null)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 via-yellow-50 via-emerald-50 via-cyan-50 via-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 animate-gradient-x transition-all duration-1000 animate-in fade-in duration-700">
      <Navigation />
      {isLoggedIn && <ThemeToggle />}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 via-blue-500/20 via-green-500/20 to-yellow-500/20 dark:from-pink-900/30 dark:via-purple-900/30 dark:via-blue-900/30 dark:via-green-900/30 dark:to-yellow-900/30 animate-gradient-xy"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-rose-600 rounded-full opacity-20 dark:opacity-10 animate-pulse blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full opacity-20 dark:opacity-10 animate-pulse delay-1000 blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full opacity-20 dark:opacity-10 animate-pulse delay-2000 blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full opacity-20 dark:opacity-10 animate-pulse delay-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x bg-300% animate-pulse">
                Interview Insights
              </h1>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 animate-in slide-in-from-bottom-4 duration-700 delay-500">
                Share your interview experiences, learn from others, and ace your next interview
              </p>

              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-700"
              >
                <div className="flex gap-4">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                    <Input
                      type="text"
                      placeholder="Search for companies (e.g., Google, Microsoft, Amazon...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-3 text-lg text-gray-900 dark:text-gray-100 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-2 border-transparent focus:border-purple-400 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl animate-gradient-x bg-300%"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 via-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent animate-gradient-x bg-300% animate-in slide-in-from-top-4 duration-700">
            Featured Companies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company, index) => (
              <Card
                key={company.name}
                className="cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg hover:bg-gradient-to-br hover:from-white hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-purple-900/20 dark:hover:to-blue-900/20 animate-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCompanySelect(company.name)}
              >
                <CardHeader className="flex flex-row items-center space-y-0 pb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 via-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="w-12 h-12 rounded-full mr-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 shadow-lg"
                  />
                  <div className="relative z-10">
                    <CardTitle className="text-lg group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {company.name}
                    </CardTitle>
                    <CardDescription className="group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {company.posts} interview posts
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 dark:via-purple-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-300% animate-in slide-in-from-top-4 duration-700">
            Recent Interview Posts
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {recentPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-in slide-in-from-left-4 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <InterviewPost post={post} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 animate-in slide-in-from-bottom-4 duration-700 delay-1000">
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 hover:border-purple-300 hover:text-purple-700 dark:hover:text-purple-300 transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-2"
            >
              View All Posts
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
