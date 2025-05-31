import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          NoCheatCode
        </Link>
        <Link to="/problems" className="nav-user">
                Problem Set
        </Link>
        
        <div >
          {isAuthenticated ? (
            <>
              
              <span className="nav-user">
                Welcome, {user?.username || 'User'}
              </span>
              <button 
                onClick={handleLogout}
                className="nav-buttons"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar