import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemsAPI, submissionAPI } from '../services/api';
import CodeEditor from '../components/MonacoEditor';
import '../styles/ProblemDetail.css';
import AiHelper from '../components/AiHelper';
import { useAuth } from '../context/AuthContext';

import axios from 'axios';
function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Use the API service instead of direct fetch
      const response = await problemsAPI.getById(id);
      setProblem(response.data);
      
    } catch (err) {
      console.error('Error fetching problem:', err);
      if (err.response?.status === 404) {
        setError('Problem not found');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to fetch problem');
      }
    } finally {
      setLoading(false);
    }
  };
  const languageMap = {
  java: 62,
  javascript: 63,
  python: 71,
  cpp: 54
};

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please enter your code');
      return;
    }

    setSubmitting(true);
    setSubmissionResult(null);

    try {
      // Use the API service instead of direct fetch
      const response = await submissionAPI.submit({
        problemId: id,
        code: code,
        language: language
      });
      
      const data = response.data;
      
      setSubmissionResult({
        success: data.status === 'ACCEPTED',
        message: data.message || (data.status === 'ACCEPTED' ? 'All test cases passed!' : 'Some test cases failed.'),
        testResults: data.testResults
      });
      
    } catch (err) {
      console.error('Submission error:', err);
      let errorMessage = 'Submission failed due to a network error';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status >= 400) {
        errorMessage = 'Submission failed';
      }
      
      setSubmissionResult({
        success: false,
        message: errorMessage
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/problems');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="problem-detail">
          <div className="problem-header">
            <button onClick={handleBack} className="btn-secondary">
              <i className="fas fa-arrow-left"></i>
              Back to Problems
            </button>
            <div className="title-section">
              <h1>Error Loading Problem</h1>
            </div>
          </div>
          <div className="split-view">
            <div className="problem-content">
              <div className="problem-description">
                <h3>Error</h3>
                <div className="example-box">
                  <p>Error: {error}</p>
                  <p>Please try refreshing the page or go back to the problems list.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="container">
        <div className="problem-detail">
          <div className="problem-header">
            <button onClick={handleBack} className="btn-secondary">
              <i className="fas fa-arrow-left"></i>
              Back to Problems
            </button>
            <div className="title-section">
              <h1>Problem Not Found</h1>
            </div>
          </div>
          <div className="split-view">
            <div className="problem-content">
              <div className="problem-description">
                <h3>Not Found</h3>
                <div className="example-box">
                  <p>The requested problem could not be found.</p>
                  <p>Please check the URL or go back to the problems list.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="problem-detail">
        {/* Problem Header Section */}
        <div className="problem-header">
          <button onClick={handleBack} className="btn-secondary">
            <i className="fas fa-arrow-left"></i>
            Back to Problems
          </button>
          <div className="title-section">
            <h1>{problem.title}</h1>
            <span className={`difficulty ${problem.difficulty?.toLowerCase() || 'unknown'}`}>
              {problem.difficulty || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Split View Container */}
        <div className="split-view">
          {/* Left Panel - Problem Information */}
          <div className="problem-content">
            <div className="problem-description">
              <h3>Description</h3>
              <div dangerouslySetInnerHTML={{ __html: problem.description || 'No description available' }} />
            </div>

            {problem.inputDescription && (
              <div className="problem-input-description">
                <h3>Input</h3>
                <div dangerouslySetInnerHTML={{ __html: problem.inputDescription }} />
              </div>
            )}

            {problem.outputDescription && (
              <div className="problem-output-description">
                <h3>Output</h3>
                <div dangerouslySetInnerHTML={{ __html: problem.outputDescription }} />
              </div>
            )}

            {problem.examples && problem.examples.length > 0 && (
  <div className="problem-examples">
    <h3>Examples/Constraints</h3>
    {problem.examples.map((example, index) => (
      <div key={index} className="example-box">
        <div className="example-input">
          
          <pre>{typeof example === 'string' ? example : example.input}</pre>
        </div>
        <div className="example-output">
          
          <pre>{typeof example === 'string' ? '' : example.output}</pre>
        </div>
        {(typeof example === 'object' && example.explanation) && (
          <div className="example-explanation">
            <h4>Explanation:</h4>
            <p>{example.explanation}</p>
          </div>
        )}
      </div>
    ))}
  </div>
)}

{problem.testCases && problem.testCases.length > 0 && (
              <div className="problem-test-cases">
                <h3>Test Cases</h3>
                {problem.testCases.map((testCase, index) => (
                  <div key={index} className="test-case-box">
                    <h4>Test Case {index + 1}:</h4>
                    <div>
          <strong>Input:</strong>
          <pre>{testCase.input}</pre>
        </div>
        <div>
          <strong>Expected Output:</strong>
          <pre>{testCase.output}</pre>
        </div>
                  </div>
                ))}
              </div>
            )}

            {problem.tags && problem.tags.length > 0 && (
              <div className="problem-tags">
                <h3>Tags</h3>
                <div className="tags-container">
                  {problem.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="editor-panel">
            <div className="editor-header">
              <h4>Code</h4>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="aihelp-btn"
                >
                 Consult AI
              </button>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
              
            </div>
            
            <div className="editor-container">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                theme="vs-dark"
              />
              
            </div>
            
            <div className="editor-footer">
              
              <button 
                onClick={handleSubmit}
                disabled={submitting}
                className="submit-btn"
              >
                {submitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-play"></i>
                    Submit Solution
                  </>
                )}
              </button>
            </div>
          </div>
          {isAuthenticated && (
          <AiHelper 
  isOpen={isAiModalOpen}
  onClose={() => setIsAiModalOpen(false)}
  code={code}
  problemTitle={problem?.title}
  problemDescription={problem?.description}
/>
          )}
        </div>

        {/* Submission Results Section */}
        {submissionResult && (
          <div className={`submission-result ${submissionResult.success ? 'success' : 'error'}`}>
            <button 
      onClick={() => setSubmissionResult(null)} 
      style={{ 
        position: 'absolute', 
        right: '10px', 
        top: '10px',
        background: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      ✕
    </button>
            <h3>
              {submissionResult.success ? (
                <>
                  <i className="fas fa-check-circle"></i>
                  Submission Successful
                </>
              ) : (
                <>
                  <i className="fas fa-times-circle"></i>
                  Submission Failed
                </>
              )}
            </h3>
            <div className="result-content">
              <p className="result-message">{submissionResult.message}</p>
              {submissionResult.testResults && (
                <div className="test-results">
                  <h4>Test Results:</h4>
                  <div className="test-results-box">
                    <pre>{JSON.stringify(submissionResult.testResults, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDetail;
