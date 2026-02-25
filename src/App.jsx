import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import GeneratePage from './components/GeneratePage'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage'
import MyRecipesPage from './components/MyRecipesPage'
import { onAuthChange } from './services/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './config/firebase'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        // User is signed in, fetch additional data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              ...userDoc.data()
            })
          } else {
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              fullName: user.displayName || 'User'
            })
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || 'User'
          })
        }
      } else {
        // User is signed out
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-gray-100' : 'bg-[#faf8f5] text-gray-800'}`}>
      <Header onNavigate={handleNavigation} darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentUser={currentUser} />
      
      {currentPage === 'myRecipes' && <MyRecipesPage darkMode={darkMode} />}
      {currentPage === 'generate' && <GeneratePage darkMode={darkMode} />}
      {currentPage === 'signUp' && <SignUpPage onNavigate={handleNavigation} darkMode={darkMode} />}
      {currentPage === 'signIn' && <SignInPage onNavigate={handleNavigation} darkMode={darkMode} />}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigation} darkMode={darkMode} />}
    </div>
  )
}

export default App
