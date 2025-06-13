import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { UserPlus, Mail, Lock, User, Sparkles, Zap, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const registerData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password
      }

      await authAPI.register(registerData)
      
      // Registration successful, redirect to login
      navigate('/login', { 
        replace: true,
        state: { message: 'Registration successful! Please log in.' }
      })
    } catch (err) {
      console.error('Registration error:', err)
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Registration failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0C29 0%, #24243e 50%, #302B63 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Background Text */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}>
        
      </div>

      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(139, 69, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 99, 132, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(54, 162, 235, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1200px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3), 0 0 100px rgba(139, 69, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Left Side - Branding */}
        <div style={{
          background: 'linear-gradient(135deg, #0F0C29 0%, #24243e 50%, #302B63 100%)',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(139, 69, 255, 0.3) 0%, transparent 70%), radial-gradient(circle at 70% 30%, rgba(255, 99, 132, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #8B45FF 0%, #FF6384 50%, #36A2EB 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 8px 32px rgba(139, 69, 255, 0.4), 0 0 50px rgba(255, 99, 132, 0.2)',
              animation: 'glow 3s ease-in-out infinite alternate'
            }}>
              <Sparkles size={40} />
            </div>
            
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #8B45FF 0%, #FF6384 50%, #36A2EB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(139, 69, 255, 0.3)'
            }}>
              CodeSaaS
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '32px',
              opacity: 0.9,
              lineHeight: '1.6',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Join thousands of developers building the future with our cutting-edge platform
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              {[
                { icon: <Zap size={20} />, text: 'Your Turbocharged Journey into Algorithms', color: '#FFCE56' },
                { icon: <Shield size={20} />, text: 'Enterprise-grade security', color: '#36A2EB' },
                { icon: <Sparkles size={20} />, text: 'AI-powered solutions', color: '#FF6384' }
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: 0.9,
                  animation: `slideInLeft 0.6s ease-out ${index * 0.2}s both`
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: `linear-gradient(135deg, ${feature.color}40, ${feature.color}20)`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${feature.color}30`,
                    boxShadow: `0 4px 15px ${feature.color}20`
                  }}>
                    {feature.icon}
                  </div>
                  <span style={{ fontSize: '1rem' }}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div style={{
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)'
        }}>
          <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #0F0C29 0%, #302B63 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px'
              }}>
                Create Account
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '1rem'
              }}>
                Start your journey with us today
              </p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="username" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={20} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#8B45FF'
                  }} />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 44px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8B45FF'
                      e.target.style.boxShadow = '0 0 20px rgba(139, 69, 255, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="email" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#FF6384'
                  }} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 44px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#FF6384'
                      e.target.style.boxShadow = '0 0 20px rgba(255, 99, 132, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="password" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#36A2EB'
                  }} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    minLength={6}
                    style={{
                      width: '100%',
                      padding: '12px 44px 12px 44px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#36A2EB'
                      e.target.style.boxShadow = '0 0 20px rgba(54, 162, 235, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#36A2EB',
                      cursor: 'pointer',
                      padding: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="confirmPassword" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#FFCE56'
                  }} />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '12px 44px 12px 44px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#FFCE56'
                      e.target.style.boxShadow = '0 0 20px rgba(255, 206, 84, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#FFCE56',
                      cursor: 'pointer',
                      padding: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div role="alert" style={{
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  color: '#dc2626',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.1)'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    background: '#dc2626',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>!</div>
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #8B45FF 0%, #FF6384 50%, #36A2EB 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: loading ? 'none' : '0 8px 32px rgba(139, 69, 255, 0.3), 0 0 50px rgba(255, 99, 132, 0.2)',
                  transform: loading ? 'none' : 'translateY(0)',
                  outline: 'none',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)'
                    e.target.style.boxShadow = '0 12px 40px rgba(139, 69, 255, 0.4), 0 0 60px rgba(255, 99, 132, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 8px 32px rgba(139, 69, 255, 0.3), 0 0 50px rgba(255, 99, 132, 0.2)'
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Registering...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
            
            <div style={{
              textAlign: 'center',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Already have an account? </span>
              <Link 
                to="/login" 
                style={{
                  background: 'linear-gradient(135deg, #8B45FF 0%, #FF6384 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #FF6384 0%, #36A2EB 100%)'
                  e.target.style.WebkitBackgroundClip = 'text'
                  e.target.style.WebkitTextFillColor = 'transparent'
                  e.target.style.backgroundClip = 'text'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #8B45FF 0%, #FF6384 100%)'
                  e.target.style.WebkitBackgroundClip = 'text'
                  e.target.style.WebkitTextFillColor = 'transparent'
                  e.target.style.backgroundClip = 'text'
                }}
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-20px) rotate(-15deg); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 8px 32px rgba(139, 69, 255, 0.4), 0 0 50px rgba(255, 99, 132, 0.2); }
          100% { box-shadow: 0 12px 40px rgba(139, 69, 255, 0.6), 0 0 70px rgba(255, 99, 132, 0.4); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 0.9;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Register
