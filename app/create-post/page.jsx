"use client"

import { useState } from "react"
import { ArrowLeft, Tag, MapPin, Calendar, Briefcase, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation";


const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Tesla", "Uber", "Airbnb", "Spotify"]

const positions = [
  "Software Engineer",
  "Senior Software Engineer",
  "Staff Software Engineer",
  "Principal Engineer",
  "Product Manager",
  "Senior Product Manager",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
]

const interviewTypes = [
  "Technical",
  "Behavioral",
  "System Design",
  "Coding",
  "Case Study",
  "Cultural Fit",
  "Phone Screen",
  "Onsite",
]

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    interviewDate: "",
    interviewType: "",
    experience: "",
    difficulty: "",
    outcome: "",
    content: "",
    tips: "",
    tags: [],
  })

  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }
  const router = useRouter();


  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    const postPayload = {
      companyname: formData.company,
      position: formData.position,
      location: formData.location,
      interviewDate: formData.interviewDate,
      interviewType: formData.interviewType,
      difficulty: formData.difficulty,
      outcome: formData.outcome,
      experience: formData.content, // 'content' is same as 'experience'
      tips: formData.tips,
      tags: formData.tags,
    };

    const res = await fetch(`http://localhost:8080/api/posts?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPayload),
    });

    if (!res.ok) throw new Error("Failed to publish post");

    alert("Post published successfully!");
    setFormData({
      company: "",
      position: "",
      location: "",
      interviewDate: "",
      interviewType: "",
      experience: "",
      difficulty: "",
      outcome: "",
      content: "",
      tips: "",
      tags: [],
    });

    // optional: navigate to user profile or post listing
    router.push("/profile");
  } catch (err) {
    console.error("Submit error:", err);
    alert("Something went wrong while publishing.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 via-yellow-50 via-emerald-50 via-cyan-50 via-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/50 dark:via-blue-900/50 dark:via-indigo-900/50 dark:to-violet-900/50 animate-gradient-xy animate-in fade-in duration-700">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8 animate-in slide-in-from-left-4 duration-700">
          <Link href="/profile">
            <Button
              variant="ghost"
              className="mr-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 hover:-translate-x-1" />
              Back to Profile
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Share Your Interview Experience
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Help others by sharing your interview journey</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg animate-in slide-in-from-bottom-8 duration-700 delay-300">
            <CardHeader className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                Create Interview Post
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Share detailed information about your interview experience to help the community
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-400">
                    <Label
                      htmlFor="company"
                      className="text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Company *</span>
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("company", value)}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company} value={company}>
                            {company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 animate-in slide-in-from-right-4 duration-500 delay-500">
                    <Label
                      htmlFor="position"
                      className="text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2"
                    >
                      <Tag className="w-4 h-4" />
                      <span>Position *</span>
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("position", value)}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-600">
                    <Label
                      htmlFor="location"
                      className="text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., San Francisco, CA"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700"
                    />
                  </div>

                  <div className="space-y-2 animate-in slide-in-from-right-4 duration-500 delay-700">
                    <Label
                      htmlFor="interviewDate"
                      className="text-gray-700 dark:text-gray-300 font-medium flex items-center space-x-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Interview Date</span>
                    </Label>
                    <Input
                      id="interviewDate"
                      name="interviewDate"
                      type="date"
                      value={formData.interviewDate}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>

                {/* Interview Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 animate-in slide-in-from-left-4 duration-500 delay-800">
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Interview Type</Label>
                    <Select onValueChange={(value) => handleSelectChange("interviewType", value)}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {interviewTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-900">
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Difficulty</Label>
                    <Select onValueChange={(value) => handleSelectChange("difficulty", value)}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 animate-in slide-in-from-right-4 duration-500 delay-1000">
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Outcome</Label>
                    <Select onValueChange={(value) => handleSelectChange("outcome", value)}>
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Select outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="selected">Selected</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="withdrew">Withdrew</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-1100">
                  <Label htmlFor="content" className="text-gray-700 dark:text-gray-300 font-medium">
                    Interview Experience *
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Share your detailed interview experience, questions asked, process, etc."
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 resize-none bg-white dark:bg-gray-700"
                    required
                  />
                </div>

                {/* Tips */}
                <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-1200">
                  <Label htmlFor="tips" className="text-gray-700 dark:text-gray-300 font-medium">
                    Tips & Advice
                  </Label>
                  <Textarea
                    id="tips"
                    name="tips"
                    placeholder="Share any tips or advice for future candidates"
                    value={formData.tips}
                    onChange={handleInputChange}
                    rows={3}
                    className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 resize-none bg-white dark:bg-gray-700"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-1300">
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add tags (e.g., coding, system-design)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 transition-colors duration-300 bg-white dark:bg-gray-700"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      variant="outline"
                      className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transform hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center space-x-1 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 cursor-pointer transition-colors duration-300 animate-in slide-in-from-right-2 duration-300 bg-gray-100 dark:bg-gray-700"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span>#{tag}</span>
                          <X
                            className="w-3 h-3 hover:scale-110 transition-transform duration-200"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 animate-in slide-in-from-bottom-4 duration-500 delay-1400">
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 dark:hover:from-purple-700 dark:hover:via-blue-700 dark:hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed animate-gradient-x bg-300%"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                      </div>
                    ) : (
                      "Publish Post"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
