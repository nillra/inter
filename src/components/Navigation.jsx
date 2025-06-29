"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/Button"
import { Menu, X, User, LogIn } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Set to false by default, true for demo

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with hover animation */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 text-white p-2 rounded-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl animate-gradient-x bg-300%">
              <User className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-green-600 transition-all duration-300">
              Interview Insights
            </span>
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium relative group transition-colors duration-300"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a
              href="#posts"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium relative group transition-colors duration-300"
            >
              All Posts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#companies"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium relative group transition-colors duration-300"
            >
              Companies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 via-yellow-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#resources"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium relative group transition-colors duration-300"
            >
              Resources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Auth Buttons with conditional rendering */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              // Logged in state - show profile, create post, and logout
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium animate-gradient-x bg-300%">
                      JD
                    </div>
                    <span>Profile</span>
                  </Button>
                </Link>
                <Link to="/create-post">
                  <Button className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-gradient-x bg-300%">
                    Create Post
                  </Button>
                </Link>
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  variant="outline"
                  className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 transform hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg"
                >
                  Logout
                </Button>
              </div>
            ) : (
              // Not logged in state - show login and signup
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-300"
                    onClick={() => setIsLoggedIn(true)} // Simulate login
                  >
                    <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-gradient-x bg-300%"
                    onClick={() => setIsLoggedIn(true)} // Simulate login after signup
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button with animation */}
          <button
            className="md:hidden transform hover:scale-110 transition-transform duration-300 text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu with conditional rendering */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transform hover:translate-x-2 transition-all duration-300"
              >
                Home
              </Link>
              <a
                href="#posts"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transform hover:translate-x-2 transition-all duration-300"
              >
                All Posts
              </a>
              <a
                href="#companies"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transform hover:translate-x-2 transition-all duration-300"
              >
                Companies
              </a>
              <a
                href="#resources"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transform hover:translate-x-2 transition-all duration-300"
              >
                Resources
              </a>
            </div>

            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              {isLoggedIn ? (
                // Mobile logged in state
                <>
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start transform hover:translate-x-2 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-medium mr-2 animate-gradient-x bg-300%">
                        JD
                      </div>
                      Profile
                    </Button>
                  </Link>
                  <Link to="/create-post">
                    <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 animate-gradient-x bg-300%">
                      Create Post
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsLoggedIn(false)}
                    variant="outline"
                    className="w-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                // Mobile not logged in state
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 animate-gradient-x bg-300%"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
