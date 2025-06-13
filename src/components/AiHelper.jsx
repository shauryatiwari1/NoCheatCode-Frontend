import React, { useState } from 'react';
import axios from 'axios';
import './AiHelper.css'; // Optional styling
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AiHelper = ({ isOpen, onClose, code, problemTitle, problemDescription }) => {
  const [hintLevel, setHintLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState('');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();
  const { token } = useAuth();

  const analyzeCode = async () => {
    setLoading(true);
    setHint('');
    setHintLevel('analyze');
    
    try {      const res = await api.post('/aihelper/analyze', {
        code,
        problemTitle,
        problemDescription,
        isAnalyzeRequest: true
      }, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

      setHint(res.data.text || res.data.body?.text || 'No analysis generated.');
    } catch (err) {
        const backendMsg = err.response?.data?.text;
      console.error('API error:', err);
      setHint(backendMsg );
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!userInput.trim()) return;
    
    const userMessage = userInput.trim();
    setUserInput('');
    setChatLoading(true);
    
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    
    try {      const res = await api.post('/aihelper/chat', {
        code,
        problemTitle,
        problemDescription,
        userMessage
      }, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

      setChatHistory(prev => [...prev, { type: 'ai', message: res.data.text || res.data.body?.text || 'No response generated.' }]);
    } catch (err) {
        const backendMsg = err.response?.data?.text;
      console.error('Chat API error:', err);
      setChatHistory(prev => [...prev, { type: 'ai', message: backendMsg  }]);
    } finally {
      setChatLoading(false);
    }
  };

  const fetchHint = async (level) => {
    setLoading(true);
    setHint('');
    try {      const res = await api.post('/aihelper/hint', {
        code,
        problemTitle,
        problemDescription,
        hintLevel: level
      }, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

      setHint(res.data.text || res.data.body?.text || 'No hint generated.');
    } catch (err) {
        const backendMsg = err.response?.data?.text;
      console.error('API error:', err);
      setHint(backendMsg );
    } finally {
      setLoading(false);
    }
  };

  const handleHintLevel = (level) => {
    setHintLevel(level);
    fetchHint(level);
  };

  const handleClose = () => {
    // Reset state when closing
    setHintLevel(null);
    setHint('');
    setLoading(false);
    setUserInput('');
    setChatHistory([]);
    setChatLoading(false);
    onClose();
  };

  return (
    <div className={`ai-helper-sidepanel ${isOpen ? 'open' : ''}`}>
      <div className="ai-helper-content">
        <div className="ai-helper-header">
          <h3>AI Assistant</h3>
          <button className="close-btn-x" onClick={handleClose}>×</button>
        </div>
        
        <p className="problem-title">Hints for: <strong>{problemTitle}</strong></p>
        
        <div className="hint-buttons">
          <button 
            onClick={() => analyzeCode()}
            className={`hint-btn analyze-btn`}
            disabled={loading}
          >
            Analyze My Current Code
          </button>
          <button 
            onClick={() => handleHintLevel(1)}
            className={`hint-btn ${hintLevel === 1 ? 'active' : ''}`}
            disabled={loading}
          >
            Level 1 - Approach
          </button>
          <button 
            onClick={() => handleHintLevel(2)}
            className={`hint-btn ${hintLevel === 2 ? 'active' : ''}`}
            disabled={loading}
          >
            Level 2 - Algorithm
          </button>
          <button 
            onClick={() => handleHintLevel(3)}
            className={`hint-btn ${hintLevel === 3 ? 'active' : ''}`}
            disabled={loading}
          >
            Level 3 - Implementation
          </button>
          <div className="chat-section">
            <h4>Ask AI Anything</h4>
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  <strong>{msg.type === 'user' ? 'You:' : 'AI:'}</strong>
                  <div className="message-content">{msg.message}</div>
                </div>
              ))}
              {chatLoading && (
                <div className="chat-message ai">
                  <strong>AI:</strong>
                  <div className="typing-indicator">Thinking...</div>
                </div>
              )}
            </div>
            <div className="chat-input-section">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`Hello, ${user?.username}! Ask me anything about this problem or coding...`}
                className="chat-input"
                rows="2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
              />
              <button 
                onClick={handleChatSubmit}
                disabled={chatLoading || !userInput.trim()}
                className="chat-submit-btn"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading-hint">
            <div className="spinner"></div>
            <p>Generating hint...</p>
          </div>
        )}
        
        {hint && (
          <div className="hint-box">
            <h4>{hintLevel === 'analyze' ? 'Code Analysis:' : `Hint Level ${hintLevel}:`}</h4>
            <div className="hint-content">
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {hint.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`([^`]*)`/g, '$1')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiHelper;
