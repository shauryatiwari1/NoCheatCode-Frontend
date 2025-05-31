import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { problemsAPI } from '../services/api'

function ProblemList() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
    setLoading(true)
    setError('')
    
    console.log('Fetching problems...')
    const response = await problemsAPI.getAll()
    console.log('API Response:', response)
    console.log('Response data:', response.data)
    
    if (response.data && response.data.content) {
      // Extract problems from paginated response
      const problemList = response.data.content
      console.log('Parsed problems:', problemList)
      setProblems(problemList)
    } else {
      console.log('No content in response, setting empty array')
      setProblems([])
    }
  } catch (err) {
    console.error('Error details:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      headers: err.response?.headers
    })
    const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch problems'
    setError(errorMessage)
    setProblems([])
  } finally {
    setLoading(false)
  }
  }

  const handleProblemClick = (problemId) => {
    navigate(`/problems/${problemId}`)
  }

  const handleRetry = () => {
    fetchProblems()
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading problems...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={handleRetry} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Problems</h1>
      
      {problems.length === 0 ? (
        <div className="text-center">
          <p>No problems available</p>
        </div>
      ) : (
        <div className="problem-list">
          {problems.map((problem) => (
            <div 
              key={problem.id} 
              className="problem-item"
              onClick={() => handleProblemClick(problem.id)}
            >
              <div>
                <div className="problem-title">{problem.title}</div>
                {problem.description && (
                  <div className="problem-description">
                    {problem.description.substring(0, 100)}...
                  </div>
                )}
              </div>
              <div className={`difficulty ${problem.difficulty?.toLowerCase() || 'unknown'}`}>
                {problem.difficulty || 'Unknown'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProblemList