import { useState, useRef } from 'react'
import Button from './Button'
import AshResponse from './AshResponse'
import { createChatSession } from '../services/gemini'

function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState([]) // Chat history
  const [chatSession, setChatSession] = useState(null)
  const [error, setError] = useState('')
  const [lastGenerateTime, setLastGenerateTime] = useState(0)
  const inputRef = useRef(null)

  // Prevent spam - minimum 2 seconds between requests
  const COOLDOWN_MS = 2000

  const handleGenerate = async (customPrompt = null) => {
    const textToGenerate = customPrompt || prompt.trim()
    
    if (!textToGenerate) {
      setError('Please enter a message first!')
      return
    }

    // Spam protection - check cooldown
    const now = Date.now()
    const timeSinceLastGenerate = now - lastGenerateTime
    if (timeSinceLastGenerate < COOLDOWN_MS) {
      const remainingSeconds = Math.ceil((COOLDOWN_MS - timeSinceLastGenerate) / 1000)
      setError(`Please wait ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} before sending again`)
      return
    }

    // Add user message to chat
    const userMessage = { role: 'user', content: textToGenerate }
    setMessages(prev => [...prev, userMessage])
    setPrompt('')
    
    setIsGenerating(true)
    setError('')
    setLastGenerateTime(now)

    try {
      // Initialize chat session if it doesn't exist
      const session = chatSession || createChatSession()
      if (!chatSession) setChatSession(session)

      // Send message to Ash
      const result = await session.sendMessage(textToGenerate)
      const responseText = result.response.text()
      
      // Add Ash's response to chat
      const ashMessage = { role: 'assistant', content: responseText }
      setMessages(prev => [...prev, ashMessage])
      
    } catch (err) {
      setError('Something went wrong. Please check your API key and try again.')
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleGenerate()
    }
  }

  return (
    <main className="flex flex-col h-[calc(100vh-80px)]">
      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Welcome header - only show when no messages */}
          {messages.length === 0 && (
            <div className="text-center space-y-8 mb-12">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#c9a875] via-[#d4b896] to-[#8b7355] bg-clip-text text-transparent">
                  Chat with Ash
                </h1>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                  Your wellness collaborator for nutrition, recipes, and health advice.<br />
                  <span className="font-medium">Ask Ash to "fix" meals and get personalized recipes.</span>
                </p>
              </div>

              {/* Suggestion prompts */}
              <div className="space-y-6 pt-4">
                <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold">Not sure where to start? Try one of these:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button 
                    variant="pill" 
                    onClick={() => handleGenerate('I want to fix a healthy breakfast')}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Fix Healthy Breakfast
                  </Button>
                  <Button 
                    variant="pill" 
                    onClick={() => handleGenerate('Help me fix a 30-minute dinner')}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Fix 30-Min Dinner
                  </Button>
                  <Button 
                    variant="pill" 
                    onClick={() => handleGenerate('What\'s a good vegan recipe?')}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vegan Recipe Ideas
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Chat messages */}
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[#c9a875] text-white rounded-2xl px-5 py-3 max-w-xl">
                      <p className="leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <AshResponse jsonString={msg.content} />
                )}
              </div>
            ))}
          </div>


        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className="px-6 py-6 pb-8">
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Chat input box or thinking state */}
          {isGenerating ? (
            <div className="w-full px-6 py-4 bg-gradient-to-r from-[#c9a875]/10 to-[#8b7355]/10 border border-[#c9a875]/30 rounded-full shadow-lg flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#c9a875] to-[#8b7355] rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#c9a875] to-[#8b7355] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-[#c9a875] to-[#8b7355] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent font-medium">
                Ash is thinking...
              </span>
            </div>
          ) : (
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Ash about nutrition and wellness..."
                disabled={isGenerating}
                className="w-full px-6 py-4 pr-14 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c9a875] focus:border-transparent transition-all text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button 
                onClick={() => handleGenerate()}
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#c9a875] hover:bg-[#b8976a] text-white p-3 rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default GeneratePage
