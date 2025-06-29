import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Import pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import CreatePostPage from "./pages/CreatePostPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
