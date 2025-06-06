import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import ProblemList from './pages/ProblemList'
import ProblemDetail from './pages/ProblemDetail'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import './styles/Footer.css'; 
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    )
  }
  
  return !isAuthenticated ? children : <Navigate to="/problems" replace />
}

function AppContent() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          <Route 
            path="/problems" 
            element={
              <ProtectedRoute>
                <ProblemList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/problems/:id" 
            element={
              <ProtectedRoute>
                <ProblemDetail />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/problems" replace />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
