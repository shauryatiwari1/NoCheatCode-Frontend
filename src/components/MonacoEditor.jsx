import { Editor } from '@monaco-editor/react'

function CodeEditor({ 
  code, 
  onChange, 
  language = 'javascript', 
  theme = 'vs-dark' 
}) {
  const handleEditorChange = (value) => {
    onChange(value)
  }

  return (
    <div className="editor-container" style={{ height: '600px' }}>
      <Editor
        height="100%"
  
  defaultLanguage={language}
  value={code}
  onChange={onChange}
  options={{
    fontSize: 14,
    fontFamily: "'Consolas', monospace",
    minimap: { enabled: false },
    theme: 'vs-dark',
    scrollBeyondLastLine: true,
    lineNumbers: "on",
    roundedSelection: false,
    padding: { top: 16 },
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true,
    scrollbar: {
  vertical: 'auto',
  horizontal: 'auto'
}
  }}
      />
    </div>
  )
}

export default CodeEditor
