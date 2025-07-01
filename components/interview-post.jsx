"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InterviewPost({ post ,profilePic }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(Array.isArray(post.comments) ? post.comments : [])
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${post.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
      }
    } catch (error) {
      console.error("Like failed:", error)
    }
  }

  const submitComment = async () => {
    if (!newComment.trim()) return

    try {
      const response = await fetch(`http://localhost:8080/api/posts/comment/${post.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
      })

      if (response.ok) {
        setComments(prev => [...prev, newComment])
        setNewComment("")
      }
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  const deleteComment = async (commentText) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/comment/${post.id}?comment=${encodeURIComponent(commentText)}`,
        { method: "DELETE" }
      )

      if (response.ok) {
        setComments(prev => prev.filter(c => c !== commentText))
      }
    } catch (err) {
      console.error("Error deleting comment:", err)
    }
  }

  return (
    <Card className="w-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90">
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={profilePic || "/avatar.jpeg"}
              alt={post?.user?.fullName || post?.user?.username || post.author?.username ||"Anonymous"}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {post.username || post?.user?.username || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.position} at <span className="font-medium text-blue-600">{post.companyname}</span>
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-800 dark:text-gray-200 mb-4">{post.experience}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {(post.tags || []).map((tag) => (
            <Badge key={tag} variant="secondary">#{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center space-x-6 border-t pt-3 mt-4">
          <Button onClick={handleLike} variant="ghost" size="sm">
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            <span className="ml-1">{likesCount}</span>
          </Button>

          <Button
            onClick={() => setShowComments(prev => !prev)}
            variant="ghost"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 text-gray-500" />
            <span className="ml-1">{comments.length}</span>
          </Button>

          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 text-gray-500" />
            <span className="ml-1">Share</span>
          </Button>
        </div>

        {/* 💬 Comment Section - Shown only when toggled */}
        {showComments && (
          <div className="mt-4 animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
              />
              <button
                onClick={submitComment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-95 transition"
              >
                Post
              </button>
            </div>

            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <span className="text-sm text-gray-800 dark:text-gray-200">{comment}</span>
                  <button
                    onClick={() => deleteComment(comment)}
                    className="text-sm text-red-500 hover:text-red-600 hover:underline transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
