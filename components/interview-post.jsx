"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InterviewPost({ post }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <Card className="w-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:bg-gradient-to-br hover:from-white hover:via-purple-50/30 hover:to-blue-50/30 dark:hover:from-gray-800 dark:hover:via-purple-900/10 dark:hover:to-blue-900/10 animate-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="pb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 via-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={post.authorAvatar || "/placeholder.svg"}
                alt={post.author}
                className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-gradient-x"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {post.author}
                </h3>
                <span className="text-gray-500 dark:text-gray-400 animate-pulse">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {post.timeAgo}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {post.position} at{" "}
                <span className="font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-300">
                  {post.company}
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:scale-110 transition-all duration-300"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative">
        <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
          {post.content}
        </p>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transform hover:scale-105 transition-all duration-300 animate-in slide-in-from-right-2 duration-500 bg-gray-100 dark:bg-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Enhanced Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-colors duration-300">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 transform hover:scale-110 transition-all duration-300 ${
                isLiked
                  ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${isLiked ? "fill-current animate-pulse" : "hover:fill-current"}`}
              />
              <span className="font-medium">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-110 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
              <span>{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transform hover:scale-110 transition-all duration-300"
            >
              <Share2 className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
