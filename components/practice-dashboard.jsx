"use client"

import { useState } from "react"
import { Play, CheckCircle, Target, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const practiceData = {
  Google: {
    totalQuestions: 60,
    completed: 45,
    categories: [
      { name: "Arrays & Strings", total: 15, completed: 12, difficulty: "Easy" },
      { name: "Dynamic Programming", total: 20, completed: 15, difficulty: "Hard" },
      { name: "Trees & Graphs", total: 15, completed: 10, difficulty: "Medium" },
      { name: "System Design", total: 10, completed: 8, difficulty: "Hard" },
    ],
  },
}

export default function PracticeDashboard({ companyName = "Google" }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const company = practiceData[companyName] || practiceData.Google
  const progress = Math.round((company.completed / company.totalQuestions) * 100)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Progress Overview */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>{companyName} Practice Progress</span>
          </CardTitle>
          <CardDescription>Track your preparation progress for {companyName} interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-blue-600">{progress}%</p>
              <p className="text-sm text-gray-600">
                {company.completed} of {company.totalQuestions} questions completed
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Award className="w-3 h-3 mr-1" />
                {progress >= 80 ? "Expert" : progress >= 60 ? "Advanced" : progress >= 40 ? "Intermediate" : "Beginner"}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Practice Categories */}
      <div className="grid gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Practice Categories</h3>
        {company.categories.map((category, index) => {
          const categoryProgress = Math.round((category.completed / category.total) * 100)

          return (
            <Card
              key={category.name}
              className="hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-r from-white to-gray-50/50 cursor-pointer animate-in slide-in-from-left-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedCategory(category)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      {categoryProgress === 100 ? <CheckCircle className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">
                        {category.completed} of {category.total} questions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getDifficultyColor(category.difficulty)}>{category.difficulty}</Badge>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{categoryProgress}%</p>
                  </div>
                </div>

                <Progress value={categoryProgress} className="h-2" />

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    {category.total - category.completed} questions remaining
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                  >
                    {categoryProgress === 100 ? "Review" : "Continue"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
