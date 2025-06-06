import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { submissionAPI } from '../services/api'
import './Profile.css'


function Profile() {
  const { user, logout } = useAuth()
  
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    solvedProblems: 0,
    attemptedProblems: 0
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleBackToProblems = () => {
    navigate('/problems')
  }

  const getInitials = (username) => {
    if (!username) return 'U'
    return username.charAt(0).toUpperCase()
  }

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Fetching submissions...')
      
      const response = await submissionAPI.getUserSubmissions()
      console.log('Raw response:', response)
      
      // Based on your SubmissionListResponseDto, the response structure is:
      // { submissions: [...] }
      const submissionsList = response.data?.submissions || []
      
      console.log('Processed submissions:', submissionsList)
      
      setSubmissions(submissionsList)
      
      // Calculate stats
      const solved = new Set(submissionsList
        .filter(sub => sub.solved)
        .map(sub => sub.problemId)
      ).size

      const attempted = new Set(submissionsList
        .map(sub => sub.problemId)
      ).size

      setStats({
        totalSubmissions: submissionsList.length,
        solvedProblems: solved,
        attemptedProblems: attempted
      })
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data
      })
      
      // Better error handling
      let errorMessage = 'Failed to fetch submissions'
      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.'
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied. Please check your permissions.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  if (isLoading) {
    return (
      <div className="container">
        <div className="profile-loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="profile-container">
          <div className="profile-header">
            <button onClick={handleBackToProblems} className="btn-secondary">
              <i className="fas fa-arrow-left"></i>
              Back to Problems
            </button>
            <h1>Profile Error</h1>
          </div>
          <div className="profile-content">
            <div className="profile-card">
              <div className="error-message">
                <h3>Error Loading Profile</h3>
                <p>{error}</p>
                <button onClick={fetchSubmissions} className="btn btn-primary">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <button onClick={handleBackToProblems} className="btn-secondary">
            <i className="fas fa-arrow-left"></i>
            Back to Problems
          </button>
          <h1>My Profile</h1>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* User Info Card */}
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {getInitials(user?.username)}
              </div>
            </div>
            
            <div className="profile-info">
              <h2>{user?.username || 'Anonymous User'}</h2>
              {user?.email && <p className="profile-email">{user?.email}</p>}
              {user?.joinDate && (
                <p className="profile-joined">
                  Member since {user.joinDate}
                </p>
              )}
            </div>

            <div className="profile-actions">
              <button className="btn btn-outline">
                <i className="fas fa-edit"></i>
                Edit Profile
              </button>
              <button onClick={handleLogout} className="btn btn-danger">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>

          <div className="profile-statistics">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.totalSubmissions}</span>
                <span className="stat-label">Total Submissions</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.solvedProblems}</span>
                <span className="stat-label">Problems Solved</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.attemptedProblems}</span>
                <span className="stat-label">Problems Attempted</span>
              </div>
            </div>
          </div>

          <div className="recent-submissions">
            <h3>Recent Submissions</h3>
            <div className="submissions-list">
              {submissions.length === 0 ? (
                <p className="no-submissions">No submissions yet</p>
              ) : (
                submissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="submission-item">
                    <div className="submission-problem">
                      <span className={`status-dot ${submission.solved ? 'solved' : 'unsolved'}`}></span>
                      <span className="problem-title">{submission.problemTitle}</span>
                    </div>
                    <div className="submission-details">
                      <span className="submission-date">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
