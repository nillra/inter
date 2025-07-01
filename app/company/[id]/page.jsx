"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Building2, Brain, Code2, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import InterviewPost from "./interview-post"

const companyData = {
  amazon: {
    name: "Amazon",
    about: {
      name: "Amazon.com, Inc.",
      founded: "1994",
      headquarters: "Seattle, Washington",
      employees: "1,500,000+",
      industry: "E-commerce, Cloud Computing",
      description:
        "Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    },
    aptitude: {
      crtQuant: [
        { topic: "Percentage & Ratios", difficulty: "Medium", questions: 15, testType: "crt-quant" },
        { topic: "Speed, Time & Distance", difficulty: "Hard", questions: 12, testType: "crt-quant" },
        { topic: "Algebra & Equations", difficulty: "Easy", questions: 18, testType: "crt-quant" },
        { topic: "Geometry & Mensuration", difficulty: "Hard", questions: 10, testType: "crt-quant" },
        { topic: "Number Systems", difficulty: "Medium", questions: 14, testType: "crt-quant" },
      ],
      crtReasoning: [
        { topic: "Logical Reasoning", difficulty: "Hard", questions: 20, testType: "crt-reasoning" },
        { topic: "Critical Thinking", difficulty: "Medium", questions: 16, testType: "crt-reasoning" },
        { topic: "Pattern Recognition", difficulty: "Easy", questions: 12, testType: "crt-reasoning" },
        { topic: "Mathematical Reasoning", difficulty: "Hard", questions: 14, testType: "crt-reasoning" },
        { topic: "Analytical Thinking", difficulty: "Medium", questions: 18, testType: "crt-reasoning" },
      ],
    },
    dsa: [
      { topic: "Arrays & Strings", link: "https://leetcode.com/tag/array/", difficulty: "Easy" },
      { topic: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/", difficulty: "Hard" },
      { topic: "Trees & Graphs", link: "https://leetcode.com/tag/tree/", difficulty: "Medium" },
      { topic: "System Design", link: "https://github.com/donnemartin/system-design-primer", difficulty: "Hard" },
      { topic: "Hash Tables", link: "https://leetcode.com/tag/hash-table/", difficulty: "Easy" },
    ],
  },
  google: {
    name: "Google",
    about: {
      name: "Google LLC",
      founded: "1998",
      headquarters: "Mountain View, California",
      employees: "150,000+",
      industry: "Technology",
      description:
        "Google is a multinational technology company that specializes in Internet-related services and products, including online advertising technologies, a search engine, cloud computing, software, and hardware.",
    },
    aptitude: {
      crtQuant: [
        { topic: "Number Systems", difficulty: "Medium", questions: 15, testType: "crt-quant" },
        { topic: "Percentages", difficulty: "Easy", questions: 12, testType: "crt-quant" },
        { topic: "Profit & Loss", difficulty: "Medium", questions: 10, testType: "crt-quant" },
        { topic: "Time & Work", difficulty: "Hard", questions: 8, testType: "crt-quant" },
        { topic: "Probability", difficulty: "Hard", questions: 6, testType: "crt-quant" },
      ],
      crtReasoning: [
        { topic: "Logical Reasoning", difficulty: "Medium", questions: 20, testType: "crt-reasoning" },
        { topic: "Pattern Recognition", difficulty: "Easy", questions: 15, testType: "crt-reasoning" },
        { topic: "Verbal Reasoning", difficulty: "Medium", questions: 12, testType: "crt-reasoning" },
        { topic: "Analytical Reasoning", difficulty: "Hard", questions: 10, testType: "crt-reasoning" },
        { topic: "Critical Thinking", difficulty: "Hard", questions: 8, testType: "crt-reasoning" },
      ],
    },
    dsa: [
      { topic: "Arrays & Strings", link: "https://leetcode.com/tag/array/", difficulty: "Easy" },
      { topic: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/", difficulty: "Hard" },
      { topic: "Trees & Graphs", link: "https://leetcode.com/tag/tree/", difficulty: "Medium" },
      { topic: "System Design", link: "https://github.com/donnemartin/system-design-primer", difficulty: "Hard" },
      { topic: "Hash Tables", link: "https://leetcode.com/tag/hash-table/", difficulty: "Easy" },
    ],
  },
  microsoft: {
    name: "Microsoft",
    about: {
      name: "Microsoft Corporation",
      founded: "1975",
      headquarters: "Redmond, Washington",
      employees: "220,000+",
      industry: "Software, Cloud Computing",
      description:
        "Microsoft is a multinational technology corporation that produces computer software, consumer electronics, personal computers, and related services.",
    },
    aptitude: {
      crtQuant: [
        { topic: "Business Mathematics", difficulty: "Medium", questions: 16, testType: "crt-quant" },
        { topic: "Financial Calculations", difficulty: "Medium", questions: 14, testType: "crt-quant" },
        { topic: "Data Analysis", difficulty: "Hard", questions: 18, testType: "crt-quant" },
        { topic: "Quantitative Reasoning", difficulty: "Easy", questions: 12, testType: "crt-quant" },
        { topic: "Graph Interpretation", difficulty: "Medium", questions: 15, testType: "crt-quant" },
      ],
      crtReasoning: [
        { topic: "Logical Puzzles", difficulty: "Medium", questions: 18, testType: "crt-reasoning" },
        { topic: "Deductive Reasoning", difficulty: "Hard", questions: 16, testType: "crt-reasoning" },
        { topic: "Inductive Logic", difficulty: "Medium", questions: 14, testType: "crt-reasoning" },
        { topic: "Verbal Reasoning", difficulty: "Easy", questions: 20, testType: "crt-reasoning" },
        { topic: "Abstract Thinking", difficulty: "Hard", questions: 12, testType: "crt-reasoning" },
      ],
    },
    dsa: [
      { topic: "Arrays & Strings", link: "https://leetcode.com/tag/array/", difficulty: "Easy" },
      { topic: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/", difficulty: "Hard" },
      { topic: "Trees & Graphs", link: "https://leetcode.com/tag/tree/", difficulty: "Medium" },
      { topic: "System Design", link: "https://github.com/donnemartin/system-design-primer", difficulty: "Hard" },
      { topic: "Hash Tables", link: "https://leetcode.com/tag/hash-table/", difficulty: "Easy" },
    ],
  },
  meta: {
    name: "Meta",
    about: {
      name: "Meta Platforms, Inc.",
      founded: "2004",
      headquarters: "Menlo Park, California",
      employees: "86,000+",
      industry: "Social Media, VR Technology",
      description:
        "Meta is a technology company that focuses on building products that help people connect, find communities, and grow businesses through social media and virtual reality.",
    },
    aptitude: {
      crtQuant: [
        { topic: "Social Network Analysis", difficulty: "Hard", questions: 20, testType: "crt-quant" },
        { topic: "User Engagement Metrics", difficulty: "Medium", questions: 16, testType: "crt-quant" },
        { topic: "Algorithm Mathematics", difficulty: "Hard", questions: 18, testType: "crt-quant" },
        { topic: "VR/AR Calculations", difficulty: "Hard", questions: 14, testType: "crt-quant" },
        { topic: "Platform Statistics", difficulty: "Easy", questions: 12, testType: "crt-quant" },
      ],
      crtReasoning: [
        { topic: "Social Psychology", difficulty: "Medium", questions: 22, testType: "crt-reasoning" },
        { topic: "Platform Logic", difficulty: "Hard", questions: 18, testType: "crt-reasoning" },
        { topic: "Community Dynamics", difficulty: "Medium", questions: 16, testType: "crt-reasoning" },
        { topic: "Virtual Reality Logic", difficulty: "Hard", questions: 14, testType: "crt-reasoning" },
        { topic: "Network Effects", difficulty: "Hard", questions: 20, testType: "crt-reasoning" },
      ],
    },
    dsa: [
      { topic: "Arrays & Strings", link: "https://leetcode.com/tag/array/", difficulty: "Easy" },
      { topic: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/", difficulty: "Hard" },
      { topic: "Trees & Graphs", link: "https://leetcode.com/tag/tree/", difficulty: "Medium" },
      { topic: "System Design", link: "https://github.com/donnemartin/system-design-primer", difficulty: "Hard" },
      { topic: "Hash Tables", link: "https://leetcode.com/tag/hash-table/", difficulty: "Easy" },
    ],
  },
  netflix: {
    name: "Netflix",
    about: {
      name: "Netflix, Inc.",
      founded: "1997",
      headquarters: "Los Gatos, California",
      employees: "12,000+",
      industry: "Streaming, Entertainment",
      description:
        "Netflix is a streaming entertainment service with over 230 million paid memberships in more than 190 countries enjoying TV series, documentaries and feature films.",
    },
    aptitude: {
      crtQuant: [
        { topic: "Media Analytics", difficulty: "Medium", questions: 16, testType: "crt-quant" },
        { topic: "Audience Metrics", difficulty: "Easy", questions: 14, testType: "crt-quant" },
        { topic: "Content Statistics", difficulty: "Medium", questions: 18, testType: "crt-quant" },
        { topic: "Performance Analysis", difficulty: "Hard", questions: 12, testType: "crt-quant" },
        { topic: "Trend Calculations", difficulty: "Medium", questions: 15, testType: "crt-quant" },
      ],
      crtReasoning: [
        { topic: "Content Strategy", difficulty: "Hard", questions: 18, testType: "crt-reasoning" },
        { topic: "Audience Psychology", difficulty: "Medium", questions: 16, testType: "crt-reasoning" },
        { topic: "Market Analysis", difficulty: "Medium", questions: 20, testType: "crt-reasoning" },
        { topic: "Creative Logic", difficulty: "Easy", questions: 14, testType: "crt-reasoning" },
        { topic: "Behavioral Patterns", difficulty: "Hard", questions: 12, testType: "crt-reasoning" },
      ],
    },
    dsa: [
      { topic: "Arrays & Strings", link: "https://leetcode.com/tag/array/", difficulty: "Easy" },
      { topic: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/", difficulty: "Hard" },
      { topic: "Trees & Graphs", link: "https://leetcode.com/tag/tree/", difficulty: "Medium" },
      { topic: "System Design", link: "https://github.com/donnemartin/system-design-primer", difficulty: "Hard" },
      { topic: "Hash Tables", link: "https://leetcode.com/tag/hash-table/", difficulty: "Easy" },
    ],
  },
  apple: {
    name: "Apple",
    about: {
      name: "Apple Inc.",
      founded: "1976",
      headquarters: "Cupertino, California",
      employees: "164,000+",
      industry: "Consumer Electronics, Software",
      description:
        "Apple is a multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    },
    aptitude: {
      crtQuant: [
        { topic: "Design Mathematics", difficulty: "Medium", questions: 14, testType: "crt-quant" },
        { topic: "Engineering Calculations", difficulty: "Hard", questions: 18, testType: "crt-quant" },
        { topic: "Physics Applications", difficulty: "Hard", questions: 16, testType: "crt-quant" },
        { topic: "Optimization Problems", difficulty: "Medium", questions: 12, testType: "crt-quant" },
        { topic: "Measurement & Scaling", difficulty: "Easy", questions: 15, testType: "crt-quant" },
      ],
      crtReasoning: [
        { topic: "Design Thinking", difficulty: "Medium", questions: 20, testType: "crt-reasoning" },
        { topic: "User Experience Logic", difficulty: "Hard", questions: 18, testType: "crt-reasoning" },
        { topic: "Creative Problem Solving", difficulty: "Medium", questions: 16, testType: "crt-reasoning" },
        { topic: "Innovation Patterns", difficulty: "Hard", questions: 14, testType: "crt-reasoning" },
        { topic: "Aesthetic Reasoning", difficulty: "Easy", questions: 12, testType: "crt-reasoning" },
      ],
    },
    dsa: [
      { topic: "Arrays & Strings", link: "https://leetcode.com/tag/array/", difficulty: "Easy" },
      { topic: "Dynamic Programming", link: "https://leetcode.com/tag/dynamic-programming/", difficulty: "Hard" },
      { topic: "Trees & Graphs", link: "https://leetcode.com/tag/tree/", difficulty: "Medium" },
      { topic: "System Design", link: "https://github.com/donnemartin/system-design-primer", difficulty: "Hard" },
      { topic: "Hash Tables", link: "https://leetcode.com/tag/hash-table/", difficulty: "Easy" },
    ],
  },
}

// Sample fallback posts for when API fails
const samplePosts = [
  {
    id: 1,
    company: "Amazon",
    position: "Software Engineer",
    author: "Alex Chen",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "3 hours ago",
    content:
      "Amazon SDE L4 interview experience. 5 rounds total - 2 coding, 1 system design, 1 behavioral, 1 leadership principles. Coding questions were medium level focusing on arrays and trees. System design was about designing a distributed cache.",
    likes: 42,
    comments: 16,
    tags: ["coding", "system-design", "behavioral", "leadership-principles"],
  },
  {
    id: 2,
    company: "Amazon",
    position: "Product Manager",
    author: "Maria Rodriguez",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "1 day ago",
    content:
      "Amazon PM interview - Focus on customer obsession, working backwards, and data-driven decisions. Case study involved improving Prime delivery experience for rural areas.",
    likes: 28,
    comments: 9,
    tags: ["product-management", "case-study", "customer-obsession"],
  },
  {
    id: 3,
    company: "Amazon",
    position: "Data Scientist",
    author: "John Smith",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    timeAgo: "2 days ago",
    content:
      "Amazon Data Scientist L5 interview. Technical deep dive on ML algorithms, A/B testing, and statistical analysis. Had to present a case study on recommendation systems.",
    likes: 35,
    comments: 12,
    tags: ["data-science", "machine-learning", "statistics"],
  },
]

export default function CompanyDashboard() {
  const params = useParams()
  const router = useRouter()
  const companyId = params.id
  const companyName = companyId ? companyId.charAt(0).toUpperCase() + companyId.slice(1) : "Amazon"

  const [activeAptitudeTab, setActiveAptitudeTab] = useState("quant")
  const company = companyData[companyId] || companyData["amazon"]
  const [interviewPosts, setInterviewPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [aboutData, setAboutData] = useState(null)
  const [apiError, setApiError] = useState(false)

  // Enhanced fetch function with better error handling
  const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  useEffect(() => {
    if (companyName) {
      setLoading(true)
      setApiError(false)

      // Fetch interview posts with enhanced error handling
      const fetchInterviewPosts = async () => {
        try {
          console.log(`Attempting to fetch posts for: ${companyName}`)
          const response = await fetchWithTimeout(
            `http://localhost:8080/api/posts/byCompany?companyname=${encodeURIComponent(companyName)}`,
            {},
            10000, // 10 second timeout
          )

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log("Successfully fetched interview posts:", data)
          setInterviewPosts(Array.isArray(data) ? data : [])
        } catch (error) {
          console.warn("API fetch failed, using fallback data:", error.message)
          setApiError(true)
          // Use sample posts filtered by company as fallback
          const fallbackPosts = samplePosts.filter((post) => post.company.toLowerCase() === companyName.toLowerCase())
          setInterviewPosts(fallbackPosts)
        }
      }

      // Fetch company about info with enhanced error handling
      const fetchCompanyInfo = async () => {
        try {
          console.log(`Attempting to fetch company info for: ${companyName}`)
          const response = await fetchWithTimeout(
            `http://localhost:8080/api/company-basic/company-basic-info/${encodeURIComponent(companyName)}`,
            {},
            10000, // 10 second timeout
          )

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log("Successfully fetched company details:", data)
          setAboutData(data)
        } catch (error) {
          console.warn("Company API fetch failed, using static data:", error.message)
          setAboutData(company.about) // Fallback to static data
        }
      }

      // Execute both API calls
      Promise.allSettled([fetchInterviewPosts(), fetchCompanyInfo()]).finally(() => {
        setLoading(false)
      })
    }
  }, [companyName, company.about])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const onBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-700">
      {/* Enhanced Header */}
      <div className="flex items-center mb-8 animate-in slide-in-from-left-4 duration-700">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mr-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 hover:-translate-x-1" />
          Back to Search
        </Button>
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 dark:from-purple-600 dark:via-blue-600 dark:via-indigo-600 dark:to-violet-600 text-white p-3 rounded-lg shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300 animate-gradient-x bg-300%">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
              {companyName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Interview Insights & Resources</p>
          </div>
        </div>
      </div>

      {/* API Status Indicator */}
      {apiError && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Using offline data - API connection unavailable
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Dashboard Tabs */}
      <Tabs defaultValue="about" className="w-full animate-in slide-in-from-bottom-4 duration-700 delay-300">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-1 rounded-xl shadow-lg border-0">
          <TabsTrigger
            value="about"
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 dark:data-[state=active]:from-purple-600 dark:data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
          >
            <Building2 className="w-4 h-4" />
            <span>About The Company</span>
          </TabsTrigger>
          <TabsTrigger
            value="aptitude"
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
          >
            <Brain className="w-4 h-4" />
            <span>Aptitude</span>
          </TabsTrigger>
          <TabsTrigger
            value="dsa"
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-500 dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
          >
            <Code2 className="w-4 h-4" />
            <span>DSA</span>
          </TabsTrigger>
        </TabsList>

        {/* Enhanced About Tab */}
        <TabsContent value="about" className="animate-in slide-in-from-bottom-4 duration-500">
          <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
              <CardTitle className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                Company Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Learn more about {companyName}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {aboutData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {Object.entries(aboutData)
                      .slice(0, Math.ceil(Object.entries(aboutData).length / 2))
                      .map(([key, value], index) => (
                        <div
                          key={key}
                          className="animate-in slide-in-from-left-4 duration-500"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 p-3 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
                            {value}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="space-y-4">
                    {Object.entries(aboutData)
                      .slice(Math.ceil(Object.entries(aboutData).length / 2))
                      .map(([key, value], index) => (
                        <div
                          key={key}
                          className="animate-in slide-in-from-right-4 duration-500"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 p-3 bg-gradient-to-l from-purple-50/50 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-lg border-r-4 border-purple-500 dark:border-purple-400">
                            {value}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400">Loading company information...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Aptitude Tab with Test Integration */}
        <TabsContent value="aptitude" className="animate-in slide-in-from-bottom-4 duration-500">
          <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
            <CardHeader className="bg-gradient-to-r from-green-50/50 via-blue-50/50 to-purple-50/50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-t-lg">
              <CardTitle className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                Aptitude Test Preparation
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Practice questions for {companyName} aptitude tests
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeAptitudeTab} onValueChange={setActiveAptitudeTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/90 dark:bg-gray-700/90 backdrop-blur-lg p-1 rounded-lg border-0">
                  <TabsTrigger
                    value="quant"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 dark:data-[state=active]:from-green-600 dark:data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    CRT Quant
                  </TabsTrigger>
                  <TabsTrigger
                    value="reasoning"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    CRT Reasoning
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quant">
                  <div className="space-y-4">
                    {company.aptitude.crtQuant.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/20 animate-in slide-in-from-left-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                            {item.topic}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.questions} practice questions
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={`${getDifficultyColor(item.difficulty)} hover:scale-110 transition-transform duration-300`}
                          >
                            {item.difficulty}
                          </Badge>
                          <Link
                            href={`/test/${companyId}/${item.topic.toLowerCase().replace(/\s+/g, "-")}/${item.testType}`}
                          >
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Start Test
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reasoning">
                  <div className="space-y-4">
                    {company.aptitude.crtReasoning.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 animate-in slide-in-from-right-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                            {item.topic}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.questions} practice questions
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={`${getDifficultyColor(item.difficulty)} hover:scale-110 transition-transform duration-300`}
                          >
                            {item.difficulty}
                          </Badge>
                          <Link
                            href={`/test/${companyId}/${item.topic.toLowerCase().replace(/\s+/g, "-")}/${item.testType}`}
                          >
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Start Test
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced DSA Tab */}
        <TabsContent value="dsa" className="animate-in slide-in-from-bottom-4 duration-500">
          <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-orange-50/50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-t-lg">
              <CardTitle className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                Data Structures & Algorithms
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Important DSA topics and resources for {companyName}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {company.dsa.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20 group animate-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {item.topic}
                      </h4>
                      <Badge
                        className={`${getDifficultyColor(item.difficulty)} mt-1 hover:scale-110 transition-transform duration-300`}
                      >
                        {item.difficulty}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-300 transform hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg"
                    >
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                        Practice
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Interview Posts Section */}
      <div className="mt-12 animate-in slide-in-from-bottom-6 duration-700 delay-700">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent mb-6 animate-gradient-x bg-300%">
          Recent Interview Posts for {companyName}
        </h2>
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading interview posts...</p>
            </div>
          ) : interviewPosts.length > 0 ? (
            interviewPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-in slide-in-from-left-4 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <InterviewPost post={post} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No interview posts found for {companyName}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {apiError
                  ? "API connection unavailable - showing sample data"
                  : "Be the first to share your experience!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
