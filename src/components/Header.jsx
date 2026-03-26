import { useState } from 'react'
import Button from './Button'
import { logOut } from '../services/auth'

function Header({ onNavigate, darkMode, toggleDarkMode, currentUser }) {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const navigateHome = () => {
    onNavigate('home')
  }

  const navigateGenerate = () => {
    onNavigate('generate')
    setShowProductsDropdown(false)
  }

  const navigateMyRecipes = () => {
    onNavigate('myRecipes')
    setShowProductsDropdown(false)
  }

  const navigateSignUp = () => {
    onNavigate('signUp')
  }

  const navigateSignIn = () => {
    onNavigate('signIn')
  }

  const handleLogout = async () => {
    const result = await logOut()
    if (result.success) {
      setShowUserDropdown(false)
      onNavigate('home')
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-gray-800' : 'bg-[#faf8f5]/90 backdrop-blur-sm'}`}>
      <nav className="px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className={`text-xl font-light cursor-pointer transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
          onClick={navigateHome}
        >
          The Nutritious<span className="text-[#c9a875]"> Plate</span>.
        </div>
        
        {/* Centered Navigation Links - Grouped in rounded container */}
        <div className={`hidden md:flex items-center space-x-1 rounded-full px-2 py-1.5 shadow-sm transition-colors ${darkMode ? 'bg-[#2d2d2d]/60 backdrop-blur-sm' : 'bg-[#f5f1eb]/60 backdrop-blur-sm'}`}>
          <Button variant="nav" onClick={navigateHome}>
            Home
          </Button>
          
          {/* Products Dropdown */}
          <div 
            className="relative" 
            onMouseEnter={() => setShowProductsDropdown(true)} 
            onMouseLeave={() => setShowProductsDropdown(false)}
          >
            <button className={`transition-all text-sm px-5 py-2 rounded-full flex items-center gap-1 ${darkMode ? 'text-gray-300 hover:text-gray-100 hover:bg-[#3d3d3d]/80' : 'text-gray-700 hover:text-gray-900 hover:bg-[#ebe6dd]/80'}`}>
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showProductsDropdown && (
              <div className="absolute top-full left-0 pt-2 w-56 z-50">
                <div className={`rounded-xl shadow-xl py-2 transition-colors ${darkMode ? 'bg-[#2d2d2d] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                  <button 
                    onClick={navigateGenerate} 
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}
                  >
                    Generate Recipe
                  </button>
                  <button 
                    onClick={navigateMyRecipes} 
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}
                  >
                    My Recipes
                  </button>
                  <button className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-not-allowed opacity-50 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Ingredient Intelligence
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative" 
            onMouseEnter={() => setShowResourcesDropdown(true)} 
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            <button className={`transition-all text-sm px-5 py-2 rounded-full flex items-center gap-1 ${darkMode ? 'text-gray-300 hover:text-gray-100 hover:bg-[#3d3d3d]/80' : 'text-gray-700 hover:text-gray-900 hover:bg-[#ebe6dd]/80'}`}>
              Resources
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showResourcesDropdown && (
              <div className="absolute top-full left-0 pt-2 w-48 z-50">
                <div className={`rounded-xl shadow-xl py-2 transition-colors ${darkMode ? 'bg-[#2d2d2d] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                  <a href="#gallery" className={`block px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}>
                    Gallery
                  </a>
                  <a href="#about" className={`block px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}>
                    About
                  </a>
                  <a href="#contact" className={`block px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}>
                    Contact
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-full transition-all shadow-lg ${darkMode ? 'bg-[#2d2d2d] hover:bg-[#3d3d3d] text-yellow-400' : 'bg-[#f5f1eb] hover:bg-[#ebe6dd] text-gray-700'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {/* User Menu or Sign In Button */}
          {currentUser ? (
            <div 
              className="relative"
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all shadow-lg ${darkMode ? 'bg-[#c9a875] text-gray-900 hover:bg-[#b8976a]' : 'bg-[#c9a875] text-white hover:bg-[#b8976a]'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {currentUser.fullName || 'User'}
              </button>
              
              {showUserDropdown && (
                <div className="absolute top-full right-0 pt-2 w-56 z-50">
                  <div className={`rounded-xl shadow-xl py-2 transition-colors ${darkMode ? 'bg-[#2d2d2d] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                    <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{currentUser.fullName}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onNavigate('myRecipes')
                        setShowUserDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}
                    >
                      My Recipes
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('generate')
                        setShowUserDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-gray-300 hover:bg-[#3d3d3d] hover:text-white' : 'text-gray-700 hover:bg-[#ebe6dd] hover:text-gray-900'}`}
                    >
                      Generate Recipe
                    </button>
                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} my-1`}></div>
                    <button 
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer ${darkMode ? 'text-red-400 hover:bg-red-900/30 hover:text-red-300' : 'text-red-600 hover:bg-red-100 hover:text-red-700'}`}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button variant="primary" onClick={navigateSignIn}>
              Sign in
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
