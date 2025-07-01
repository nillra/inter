"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Search,
  Building,
  Smartphone,
  Film,
  Users,
} from "lucide-react"

// Dynamic Questions Database
const questionsDatabase = {
  "crt-quant": {
    easy: [
      {
        id: 1,
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correct: 1,
        difficulty: "easy",
        topic: "percentage",
        explanation: "25% of 80 = (25/100) × 80 = 20",
      },
      {
        id: 2,
        question: "If x + 5 = 12, what is the value of x?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        difficulty: "easy",
        topic: "algebra",
        explanation: "x + 5 = 12, so x = 12 - 5 = 7",
      },
      {
        id: 13,
        question: "What is 30% of 150?",
        options: ["40", "45", "50", "55"],
        correct: 1,
        difficulty: "easy",
        topic: "percentage",
        explanation: "30% of 150 = (30/100) × 150 = 45",
      },
      {
        id: 14,
        question: "If y - 8 = 15, what is the value of y?",
        options: ["20", "21", "23", "25"],
        correct: 2,
        difficulty: "easy",
        topic: "algebra",
        explanation: "y - 8 = 15, so y = 15 + 8 = 23",
      },
    ],
    medium: [
      {
        id: 3,
        question: "If a car travels 60 miles in 1.5 hours, what is its average speed in miles per hour?",
        options: ["35 mph", "40 mph", "45 mph", "50 mph"],
        correct: 1,
        difficulty: "medium",
        topic: "speed-distance",
        explanation: "Speed = Distance/Time = 60/1.5 = 40 mph",
      },
      {
        id: 4,
        question: "What is the area of a rectangle with length 8 and width 6?",
        options: ["42", "46", "48", "52"],
        correct: 2,
        difficulty: "medium",
        topic: "geometry",
        explanation: "Area = length × width = 8 × 6 = 48",
      },
      {
        id: 15,
        question: "A train travels 120 km in 2 hours. What is its speed in km/h?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        correct: 1,
        difficulty: "medium",
        topic: "speed-distance",
        explanation: "Speed = Distance/Time = 120/2 = 60 km/h",
      },
      {
        id: 16,
        question: "What is the perimeter of a square with side length 7?",
        options: ["21", "28", "35", "49"],
        correct: 1,
        difficulty: "medium",
        topic: "geometry",
        explanation: "Perimeter of square = 4 × side = 4 × 7 = 28",
      },
    ],
    hard: [
      {
        id: 5,
        question: "If 3x = 21, what is x?",
        options: ["6", "7", "8", "9"],
        correct: 1,
        difficulty: "hard",
        topic: "algebra",
        explanation: "3x = 21, so x = 21/3 = 7",
      },
      {
        id: 6,
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
        difficulty: "hard",
        topic: "percentage",
        explanation: "15% of 200 = (15/100) × 200 = 30",
      },
      {
        id: 17,
        question: "If 2x + 5 = 17, what is x?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        difficulty: "hard",
        topic: "algebra",
        explanation: "2x + 5 = 17, so 2x = 12, x = 6",
      },
      {
        id: 18,
        question: "What is 18% of 250?",
        options: ["40", "45", "50", "55"],
        correct: 1,
        difficulty: "hard",
        topic: "percentage",
        explanation: "18% of 250 = (18/100) × 250 = 45",
      },
    ],
  },
  "crt-reasoning": {
    easy: [
      {
        id: 7,
        question: "A farmer has 17 sheep. All but 9 die. How many sheep are left?",
        options: ["8", "9", "17", "0"],
        correct: 1,
        difficulty: "easy",
        topic: "logical-thinking",
        explanation: "'All but 9' means 9 sheep remain alive.",
      },
      {
        id: 8,
        question: "If you're running a race and you pass the person in 2nd place, what place are you in?",
        options: ["1st place", "2nd place", "3rd place", "Last place"],
        correct: 1,
        difficulty: "easy",
        topic: "logical-thinking",
        explanation: "If you pass the person in 2nd place, you take their position - 2nd place.",
      },
      {
        id: 19,
        question: "What comes next in the sequence: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        correct: 1,
        difficulty: "easy",
        topic: "pattern-recognition",
        explanation: "This is an even number sequence, so 10 comes next.",
      },
      {
        id: 20,
        question: "If today is Monday, what day will it be in 3 days?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        correct: 2,
        difficulty: "easy",
        topic: "logical-thinking",
        explanation: "Monday + 3 days = Thursday",
      },
    ],
    medium: [
      {
        id: 9,
        question:
          "All birds can fly. Penguins are birds. Therefore, penguins can fly. What is wrong with this reasoning?",
        options: [
          "Nothing is wrong",
          "The first statement is false",
          "The second statement is false",
          "The conclusion doesn't follow",
        ],
        correct: 1,
        difficulty: "medium",
        topic: "logical-reasoning",
        explanation:
          "The first statement 'All birds can fly' is false - penguins, ostriches, and other birds cannot fly.",
      },
      {
        id: 10,
        question: "A bat and ball cost $1.10 total. The bat costs $1 more than the ball. How much does the ball cost?",
        options: ["$0.05", "$0.10", "$0.15", "$0.20"],
        correct: 0,
        difficulty: "medium",
        topic: "mathematical-reasoning",
        explanation: "Let ball = x, bat = x + 1. So x + (x + 1) = 1.10, 2x = 0.10, x = $0.05",
      },
      {
        id: 21,
        question: "Which number doesn't belong: 2, 3, 6, 7, 8, 14, 15, 30?",
        options: ["8", "14", "15", "30"],
        correct: 0,
        difficulty: "medium",
        topic: "pattern-recognition",
        explanation: "All numbers except 8 are either prime or products of consecutive integers.",
      },
      {
        id: 22,
        question: "If some cats are dogs and all dogs are animals, what can we conclude?",
        options: ["All cats are animals", "Some cats are animals", "No cats are animals", "All animals are cats"],
        correct: 1,
        difficulty: "medium",
        topic: "logical-reasoning",
        explanation: "Since some cats are dogs and all dogs are animals, some cats must be animals.",
      },
    ],
    hard: [
      {
        id: 11,
        question:
          "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["1 minute", "5 minutes", "20 minutes", "100 minutes"],
        correct: 1,
        difficulty: "hard",
        topic: "logical-reasoning",
        explanation: "Each machine makes 1 widget in 5 minutes. 100 machines make 100 widgets in 5 minutes.",
      },
      {
        id: 12,
        question:
          "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?",
        options: ["24 days", "47 days", "46 days", "25 days"],
        correct: 1,
        difficulty: "hard",
        topic: "exponential-growth",
        explanation: "If it doubles each day and covers the whole lake on day 48, it covered half the lake on day 47.",
      },
      {
        id: 23,
        question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
        options: ["0°", "7.5°", "15°", "22.5°"],
        correct: 1,
        difficulty: "hard",
        topic: "mathematical-reasoning",
        explanation: "At 3:15, the minute hand is at 90° and hour hand is at 97.5°. Difference = 7.5°",
      },
      {
        id: 24,
        question: "If you have a 3-gallon jug and a 5-gallon jug, how can you measure exactly 4 gallons?",
        options: [
          "Fill 5, pour into 3, empty 3, pour remaining 2 from 5 into 3, fill 5, pour into 3 until full",
          "Fill 3 twice",
          "Fill 5, pour out 1 gallon",
          "Cannot be done",
        ],
        correct: 0,
        difficulty: "hard",
        topic: "logical-reasoning",
        explanation:
          "Fill 5-gallon jug, pour 3 gallons into 3-gallon jug (2 remain). Empty 3-gallon jug, pour the 2 gallons in. Fill 5-gallon jug again, pour into 3-gallon jug until full (1 gallon fits). 4 gallons remain in 5-gallon jug.",
      },
    ],
  },
}

// Dynamic Company Configuration
const companyConfig = {
  amazon: {
    name: "amazon",
    displayName: "Amazon",
    color: "#E91E63",
    icon: ShoppingBag,
    testDuration: 30,
    questionsPerTest: 10,
    passingScore: 70,
  },
  google: {
    name: "google",
    displayName: "Google",
    color: "#4285F4",
    icon: Search,
    testDuration: 45,
    questionsPerTest: 12,
    passingScore: 75,
  },
  microsoft: {
    name: "microsoft",
    displayName: "Microsoft",
    color: "#00A1F1",
    icon: Building,
    testDuration: 35,
    questionsPerTest: 10,
    passingScore: 70,
  },
  apple: {
    name: "apple",
    displayName: "Apple",
    color: "#007AFF",
    icon: Smartphone,
    testDuration: 40,
    questionsPerTest: 11,
    passingScore: 80,
  },
  netflix: {
    name: "netflix",
    displayName: "Netflix",
    color: "#E50914",
    icon: Film,
    testDuration: 30,
    questionsPerTest: 10,
    passingScore: 65,
  },
  meta: {
    name: "meta",
    displayName: "Meta",
    color: "#1877F2",
    icon: Users,
    testDuration: 35,
    questionsPerTest: 10,
    passingScore: 75,
  },
}

// Dynamic Test Configuration
const testConfig = {
  "crt-quant": {
    displayName: "CRT Quantitative",
    description: "Mathematical and analytical reasoning",
    shortName: "Quant",
  },
  "crt-reasoning": {
    displayName: "CRT Reasoning",
    description: "Logical and critical thinking",
    shortName: "Reasoning",
  },
}

export default function DynamicTestPage(params) {
  const params = useParams()
  const router = useRouter()
  const { company, topic, type } = params;

  // Dynamic State Management
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const [loading, setLoading] = useState(true)

  // Dynamic Configuration
  const companyData = useMemo(
    () =>
      companyConfig[company] || {
        name: company,
        displayName: company,
        color: "#E91E63",
        icon: Building,
        testDuration: 30,
        questionsPerTest: 10,
        passingScore: 70,
      },
    [company],
  )

  const testData = useMemo(
    () =>
      testConfig[type] || {
        displayName: type,
        description: "Aptitude test",
        shortName: type,
      },
    [type],
  )

  // Dynamic Question Generation
  const questions = useMemo(() => {
    const questionPool = questionsDatabase[type]
    if (!questionPool) return []

    const allQuestions = [...(questionPool.easy || []), ...(questionPool.medium || []), ...(questionPool.hard || [])]
    const shuffled = allQuestions.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, companyData.questionsPerTest)
  }, [type, companyData.questionsPerTest])

  // Initialize test
  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(companyData.testDuration * 60)
      setLoading(false)
    }
  }, [questions, companyData.testDuration])

  // Dynamic Timer
  useEffect(() => {
    if (timeLeft > 0 && testStarted && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && testStarted) {
      handleSubmit()
    }
  }, [timeLeft, testStarted, isSubmitted])

  // Dynamic Time Formatting
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  // Dynamic Answer Handling
  const handleAnswerChange = useCallback(
    (questionId, answerIndex) => {
      if (!isSubmitted) {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: answerIndex,
        }))
      }
    },
    [isSubmitted],
  )

  // Dynamic Navigation
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [currentQuestion, questions.length])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }, [currentQuestion])

  const handleQuestionJump = useCallback((questionIndex) => {
    setCurrentQuestion(questionIndex)
  }, [])

  // Dynamic Test Submission
  const handleSubmit = useCallback(() => {
    setIsSubmitted(true)

    let correct = 0
    let totalAnswered = 0
    const topicBreakdown = {}

    questions.forEach((question) => {
      if (answers[question.id] !== undefined) {
        totalAnswered++
        if (answers[question.id] === question.correct) {
          correct++
        }

        const topic = question.topic || "general"
        if (!topicBreakdown[topic]) {
          topicBreakdown[topic] = { correct: 0, total: 0 }
        }
        topicBreakdown[topic].total++
        if (answers[question.id] === question.correct) {
          topicBreakdown[topic].correct++
        }
      }
    })

    const accuracy = Math.round((correct / questions.length) * 100)
    const passed = accuracy >= companyData.passingScore

    setTestResults({
      correct,
      totalAnswered,
      totalQuestions: questions.length,
      accuracy,
      passed,
      passingScore: companyData.passingScore,
      timeSpent: companyData.testDuration * 60 - timeLeft,
      topicBreakdown,
    })
  }, [answers, questions, companyData.passingScore, companyData.testDuration, timeLeft])

  // Dynamic Question Status
  const getQuestionStatus = useCallback(
    (questionIndex) => {
      const questionId = questions[questionIndex]?.id
      if (answers[questionId] !== undefined) {
        if (isSubmitted) {
          return answers[questionId] === questions[questionIndex].correct ? "correct" : "incorrect"
        }
        return "answered"
      }
      return "unanswered"
    },
    [answers, questions, isSubmitted],
  )

  // Dynamic Progress Calculation
  const progress = useMemo(() => {
    const answered = Object.keys(answers).length
    return {
      answered,
      percentage: Math.round((answered / questions.length) * 100),
      currentProgress: Math.round(((currentQuestion + 1) / questions.length) * 100),
    }
  }, [answers, questions.length, currentQuestion])

  // Start Test Handler
  const handleStartTest = useCallback(() => {
    setTestStarted(true)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Not Available</h2>
          <p className="text-gray-600 mb-4">Questions for this test are not available.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Pre-test screen
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header matching your interface */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Back to Search</span>
              </button>

              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: companyData.color }}
                >
                  <companyData.icon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{companyData.displayName}</h1>
                  <p className="text-sm text-gray-500">Interview Insights & Resources</p>
                </div>
              </div>

              <div className="w-24"></div>
            </div>

            {/* Navigation tabs */}
            <div className="flex space-x-8 border-t border-gray-200">
              <div className="flex items-center py-4">
                <Info className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">About The Company</span>
              </div>
              <div className="flex items-center py-4 border-b-2 border-teal-500">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-teal-700">Aptitude</span>
              </div>
              <div className="ml-auto flex items-center py-4">
                <span className="text-sm text-gray-500">{testData.shortName}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{testData.displayName}</h2>
            <p className="text-lg text-gray-600 mb-8">{testData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{companyData.testDuration}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{companyData.passingScore}%</div>
                <div className="text-sm text-gray-600">Pass Score</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-center mb-2">
                <Info className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-800">Test Instructions</span>
              </div>
              <ul className="text-sm text-yellow-700 text-left space-y-1">
                <li>
                  • You have {companyData.testDuration} minutes to complete {questions.length} questions
                </li>
                <li>• You can navigate between questions using the sidebar</li>
                <li>• Your progress is saved automatically</li>
                <li>• You need {companyData.passingScore}% to pass this test</li>
                <li>• Click Submit when you're ready to finish</li>
              </ul>
            </div>

            <button
              onClick={handleStartTest}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-lg font-medium"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header matching your interface exactly */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Back to Search</span>
            </button>

            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                style={{ backgroundColor: companyData.color }}
              >
                <companyData.icon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{companyData.displayName}</h1>
                <p className="text-sm text-gray-500">Interview Insights & Resources</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center ${timeLeft < 300 ? "text-red-600" : "text-gray-700"} transition-colors duration-200`}
              >
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</span>
              </div>
              {testResults && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    testResults.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {testResults.passed ? "✓" : "✗"} {testResults.accuracy}%
                </div>
              )}
            </div>
          </div>

          {/* Navigation tabs matching your interface */}
          <div className="flex space-x-8 border-t border-gray-200">
            <div className="flex items-center py-4">
              <Info className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">About The Company</span>
            </div>
            <div className="flex items-center py-4 border-b-2 border-teal-500">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-teal-700">Aptitude</span>
            </div>
            <div className="ml-auto flex items-center py-4">
              <span className="text-sm text-gray-500">{testData.shortName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Question Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        currentQuestionData.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : currentQuestionData.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {currentQuestionData.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 rounded-full h-2 w-32">
                      <div
                        className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress.currentProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{progress.currentProgress}%</span>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                <div className="mb-8">
                  <p className="text-lg text-gray-900 leading-relaxed">{currentQuestionData.question}</p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => {
                    const isSelected = answers[currentQuestionData.id] === index
                    const isCorrect = index === currentQuestionData.correct
                    const isWrong = isSubmitted && isSelected && !isCorrect
                    const showCorrect = isSubmitted && isCorrect

                    return (
                      <label
                        key={index}
                        className={`block cursor-pointer transition-all duration-200 ${
                          isSubmitted ? "cursor-default" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`flex items-center p-4 border-2 rounded-lg transition-all duration-300 ${
                            showCorrect
                              ? "border-green-500 bg-green-50 shadow-sm"
                              : isWrong
                                ? "border-red-500 bg-red-50 shadow-sm"
                                : isSelected
                                  ? "border-teal-500 bg-teal-50 shadow-sm"
                                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestionData.id}`}
                            value={index}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(currentQuestionData.id, index)}
                            disabled={isSubmitted}
                            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 transition-all duration-200"
                          />
                          <span className="ml-3 text-gray-900 flex-1">{option}</span>
                          {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 animate-pulse" />}
                          {isWrong && <XCircle className="w-5 h-5 text-red-600 animate-pulse" />}
                        </div>
                      </label>
                    )
                  })}
                </div>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Info className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Explanation</span>
                    </div>
                    <p className="text-blue-700 text-sm">{currentQuestionData.explanation}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>

                  <div className="space-x-3">
                    {currentQuestion === questions.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                      >
                        {isSubmitted ? "Test Submitted" : "Submit Test"}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accuracy Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Test Overview</h3>
              </div>

              <div className="p-4">
                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {questions.map((_, index) => {
                    const status = getQuestionStatus(index)
                    const isCurrent = currentQuestion === index

                    return (
                      <button
                        key={index}
                        onClick={() => handleQuestionJump(index)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-all duration-300 transform hover:scale-110 ${
                          isCurrent ? "ring-2 ring-teal-500 ring-offset-1 scale-110" : ""
                        } ${
                          status === "correct"
                            ? "bg-green-500 text-white shadow-lg"
                            : status === "incorrect"
                              ? "bg-red-500 text-white shadow-lg"
                              : status === "answered"
                                ? "bg-teal-500 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Stats */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-semibold text-gray-900">
                      {progress.answered}/{questions.length} ({progress.percentage}%)
                    </span>
                  </div>

                  {testResults && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Correct:</span>
                        <span className="font-semibold text-green-600">
                          {testResults.correct}/{testResults.totalQuestions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className={`font-semibold ${testResults.passed ? "text-green-600" : "text-red-600"}`}>
                          {testResults.accuracy}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-semibold ${testResults.passed ? "text-green-600" : "text-red-600"}`}>
                          {testResults.passed ? "PASSED" : "FAILED"}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded shadow-sm"></div>
                      <span className="text-gray-600">Correct</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded shadow-sm"></div>
                      <span className="text-gray-600">Incorrect</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-teal-500 rounded shadow-sm"></div>
                      <span className="text-gray-600">Answered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-200 rounded border border-gray-300"></div>
                      <span className="text-gray-600">Unanswered</span>
                    </div>
                  </div>
                </div>

                {/* Time Warning */}
                {timeLeft < 300 && timeLeft > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-red-800 text-xs font-medium">Less than 5 minutes left!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
