import { useState, useEffect } from 'react'
import Button from './Button'
import Footer from './Footer'

function HomePage({ onNavigate, darkMode }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Original Hero Section */}
      <div className="flex items-center justify-center min-h-[85vh] px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Image placeholder */}
          <div className="flex items-center justify-center">
            <div className={`w-96 h-96 rounded-full flex items-center justify-center shadow-2xl overflow-hidden transition-colors ${darkMode ? 'bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a]' : 'bg-gradient-to-br from-[#f5f1eb] to-[#ebe6dd]'}`}>
              <img src="/food-plate.jpeg" alt="Delicious meal" className="w-80 h-80 object-cover rounded-full" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div className={`text-sm flex items-center gap-2 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
              Explore Delicious Recipes
            </div>
            <h1 className={`text-5xl md:text-6xl font-light leading-tight transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Shape the Future<br />with The Nutritious Plate
            </h1>
            <p className={`text-base leading-relaxed max-w-md transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Dive into a collection of stunning recipes and<br />
              designs crafted by The Nutritious Plate, tailored for<br />
              the modern home chef.
            </p>
            <Button variant="primary" onClick={() => onNavigate('generate')} className="px-8 py-3 mt-4">
              Start your work
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* What We Do Section - Explaining the App */}
      <section 
        className={`min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d2d2d]' : 'bg-gradient-to-br from-[#faf8f5] via-[#f5f1eb] to-[#ebe6dd]'}`}
        style={{
          opacity: Math.min(1, Math.max(0, (scrollY - 200) / 300)),
          transform: `translateY(${Math.max(0, 30 - (scrollY - 200) / 15)}px)`
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-[#c9a875]/20' : 'bg-[#c9a875]/10'}`}></div>
          <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse delay-700 ${darkMode ? 'bg-[#b8976a]/20' : 'bg-[#b8976a]/10'}`}></div>
          <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl ${darkMode ? 'bg-gray-800/30' : 'bg-[#e8dfd0]/30'}`}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - App preview mockup */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#c9a875]/30 via-[#b8976a]/30 to-[#8b7355]/30 rounded-3xl blur-xl"></div>
              
              <div className={`relative rounded-3xl shadow-2xl p-8 border-2 backdrop-blur-sm transition-colors ${darkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-[#c9a875]/20'}`}>
                <div className="space-y-4">
                  {/* Mock chat interface */}
                  <div className={`rounded-2xl p-5 shadow-lg border transition-colors ${darkMode ? 'bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] border-gray-700' : 'bg-gradient-to-r from-[#f5f1eb] to-[#e8dfd0] border-[#c9a875]/20'}`}>
                    <p className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      "Help me create a healthy breakfast with eggs"
                    </p>
                  </div>
                  <div className={`rounded-2xl p-5 border-2 shadow-lg transition-colors ${darkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-[#c9a875]/20'}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#c9a875] via-[#b8976a] to-[#8b7355] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white">A</div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold mb-2 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Ash</p>
                        <p className={`text-sm leading-relaxed mb-2 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                          Let's create a protein-packed veggie scramble with spinach, tomatoes, and feta cheese...
                        </p>
                        <div className="flex gap-2 mt-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium border transition-colors ${darkMode ? 'bg-[#c9a875]/30 text-[#f5e6d3] border-[#c9a875]/50' : 'bg-[#c9a875]/20 text-[#8b7355] border-[#c9a875]/30'}`}>High Protein</span>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${darkMode ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-700'}`}>Low Carb</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-2xl p-5 shadow-lg border transition-colors ${darkMode ? 'bg-gradient-to-br from-[#2d2d2d] via-[#1a1a1a] to-[#0f0f0f] border-gray-700' : 'bg-gradient-to-br from-[#f5f1eb] via-white to-[#faf8f5] border-[#c9a875]/20'}`}>
                    <div className="space-y-3">
                      <div className={`text-xs font-bold flex items-center gap-2 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <span className="w-1 h-4 bg-gradient-to-b from-[#c9a875] to-[#8b7355] rounded-full"></span>
                        Nutrition Facts
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className={`rounded-lg p-2 text-center shadow-sm transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                          <div className="text-lg font-bold text-[#c9a875]">245</div>
                          <div className={`text-xs transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calories</div>
                        </div>
                        <div className={`rounded-lg p-2 text-center shadow-sm transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                          <div className="text-lg font-bold text-[#8b7355]">18g</div>
                          <div className={`text-xs transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Protein</div>
                        </div>
                        <div className={`rounded-lg p-2 text-center shadow-sm transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                          <div className="text-lg font-bold text-[#b8976a]">8g</div>
                          <div className={`text-xs transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carbs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Typing indicator */}
                  <div className="flex gap-2 pl-4">
                    <div className="h-2 w-2 bg-[#c9a875] rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-[#b8976a] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 bg-[#8b7355] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Description */}
            <div className="space-y-8">
              <div className="inline-block bg-gradient-to-r from-[#c9a875] to-[#b8976a] px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-xl">
                ✨ AI-Powered Wellness
              </div>
              <h2 className={`text-5xl md:text-6xl font-light leading-tight transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Meet <span className="font-bold bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent">Ash</span>, Your Personal Nutrition Assistant
              </h2>
              <p className={`text-xl leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Chat naturally with Ash about nutrition, health, and recipes. Get instant,
                personalized meal plans complete with detailed nutrition facts from medical-grade
                USDA databases.
              </p>
              <div className="space-y-4">
                <FeaturePoint text="Real-time AI conversation" isDark={darkMode} />
                <FeaturePoint text="USDA-verified nutrition data" isDark={darkMode} />
                <FeaturePoint text="Personalized recipe suggestions" isDark={darkMode} />
                <FeaturePoint text="Smart ingredient analysis" isDark={darkMode} />
              </div>
              <div className="pt-4">
                <Button 
                  variant="primary" 
                  onClick={() => onNavigate('generate')} 
                  className="px-8 py-4 text-base bg-gradient-to-r from-[#c9a875] to-[#b8976a] hover:from-[#b8976a] hover:to-[#a88659] shadow-2xl"
                >
                  Try Ash Now →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className={`min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gradient-to-b from-[#2d2d2d] via-[#1a1a1a] to-[#0f0f0f]' : 'bg-gradient-to-b from-[#ebe6dd] via-[#f5f1eb] to-[#faf8f5]'}`}>
        {/* Decorative elements */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${darkMode ? 'bg-[#c9a875]/15' : 'bg-[#c9a875]/8'}`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-[#b8976a]/15' : 'bg-[#b8976a]/8'}`}></div>
        <div className={`absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-2xl ${darkMode ? 'bg-gray-700/15' : 'bg-[#e8dfd0]/15'}`}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-[#c9a875] to-[#b8976a] px-6 py-3 rounded-full text-sm font-bold text-white shadow-xl mb-6">
              ⚡ Features
            </div>
            <h2 className={`text-5xl md:text-6xl font-light mb-6 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Everything You Need to <span className="font-bold bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent">Thrive</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              From recipe generation to nutrition tracking, we've got your wellness journey covered with powerful AI-driven tools.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Chat with Ash"
              description="Have natural conversations about nutrition, get instant recipe suggestions tailored to your preferences and dietary needs"
              action={() => onNavigate('generate')}
              buttonText="Try Now"
              gradient="from-[#c9a875] to-[#b8976a]"
              darkMode={darkMode}
            />
            <FeatureCard
              title="Ingredient Intelligence"
              description="Analyze and discover insights about ingredients with smart nutritional breakdown and alternatives"
              action={() => {}}
              buttonText="Coming Soon"
              disabled
              gradient="from-gray-600 to-gray-700"
              darkMode={darkMode}
            />
            <FeatureCard
              title="Nutrition Facts"
              description="Medical-grade nutrition data from USDA FoodData Central with detailed macros and micronutrients"
              action={() => {}}
              buttonText="Coming Soon"
              disabled
              gradient="from-gray-600 to-gray-700"
              darkMode={darkMode}
            />
            <FeatureCard
              title="Save Recipes"
              description="Build your personal collection of favorite healthy meals and access them anytime, anywhere"
              action={() => onNavigate('myRecipes')}
              buttonText="View Recipes"
              gradient="from-[#8b7355] to-[#c9a875]"
              darkMode={darkMode}
            />
            <FeatureCard
              title="Goal Tracking"
              description="Set and track your nutrition and wellness goals with smart analytics and progress reports"
              action={() => {}}
              buttonText="Coming Soon"
              disabled
              gradient="from-gray-600 to-gray-700"
              darkMode={darkMode}
            />
            <FeatureCard
              title="Mobile Ready"
              description="Access your recipes and chat with Ash from any device with our responsive design"
              action={() => {}}
              buttonText="Coming Soon"
              disabled
              gradient="from-gray-600 to-gray-700"
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      <section className={`min-h-screen flex items-center justify-center px-8 py-32 relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a]' : 'bg-gradient-to-br from-[#faf8f5] via-[#ebe6dd] to-[#f5f1eb]'}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${darkMode ? 'bg-[#c9a875]/20' : 'bg-[#c9a875]/10'}`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-500 ${darkMode ? 'bg-[#b8976a]/15' : 'bg-[#b8976a]/10'}`}></div>
          <div className={`absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-2xl ${darkMode ? 'bg-gray-800/20' : 'bg-[#e8dfd0]/20'}`}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#c9a875] to-[#b8976a] px-6 py-3 rounded-full text-sm font-bold text-white shadow-2xl mb-6">
              🚀 Get Started Today
            </div>
            <h2 className={`text-5xl md:text-6xl font-light mb-6 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Start Your <span className="font-bold bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent">Wellness Journey</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of users already living healthier with The Nutritious Plate. Choose the plan that's right for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
            {/* Free tier */}
            <div className={`group rounded-3xl shadow-2xl p-10 border-2 hover:scale-105 transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border-gray-700 hover:shadow-[#c9a875]/20' : 'bg-gradient-to-br from-[#f5f3f0] to-white border-[#c9a875]/30 hover:shadow-[#c9a875]/40'}`}>
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-[#c9a875] to-[#b8976a] px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4">
                  FOREVER FREE
                </div>
                <h3 className={`text-3xl font-bold mb-3 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Free</h3>
                <div className={`text-6xl font-light mb-2 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>$0</div>
                <p className={`text-lg transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perfect to get started</p>
              </div>
              <ul className="space-y-4 mb-10">
                <PricingFeature text="Chat with a trainer" darkMode={darkMode} />
                <PricingFeature text="Basic recipe generation" darkMode={darkMode} />
                <PricingFeature text="USDA nutrition data" darkMode={darkMode} />
                <PricingFeature text="Mobile access" darkMode={darkMode} />
              </ul>
              <Button 
                variant="primary" 
                onClick={() => onNavigate('signUp')}
                className="w-full bg-gradient-to-r from-[#c9a875] to-[#b8976a] hover:from-[#b8976a] hover:to-[#a88659] py-4 text-lg shadow-xl"
              >
                Start Free →
              </Button>
            </div>

            {/* Premium tier */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#c9a875] via-[#d4b896] to-[#8b7355] rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative bg-gradient-to-br from-[#c9a875] via-[#d4b896] to-[#b8976a] rounded-3xl shadow-2xl p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 bg-black px-6 py-2 rounded-bl-3xl text-sm font-bold shadow-lg">
                  🌟 COMING SOON
                </div>
                
                <div className="text-center mb-8 mt-6">
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                    MOST POPULAR
                  </div>
                  <h3 className="text-3xl font-bold mb-3">Premium</h3>
                  <div className="text-6xl font-light mb-2">$9.99<span className="text-2xl">/mo</span></div>
                  <p className="text-white/90 text-lg">Unlock everything</p>
                </div>
                <ul className="space-y-4 mb-10">
                  <PricingFeature text="Unlimited chat & recipes" light />
                  <PricingFeature text="Advanced meal planning" light />
                  <PricingFeature text="Custom nutrition goals" light />
                  <PricingFeature text="Unlimited saved recipes" light />
                  <PricingFeature text="Priority AI support" light />
                  <PricingFeature text="Export to grocery list" light />
                  <PricingFeature text="Family meal planning" light />
                </ul>
                <button 
                  disabled 
                  className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-xl font-bold text-lg opacity-70 cursor-not-allowed border-2 border-white/30"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 border-t-2 transition-colors ${darkMode ? 'border-gray-700' : 'border-[#c9a875]/20'}`}>
            <TrustCard 
              title="Secure & Private"
              description="Your data is encrypted and never shared"
              isDark={darkMode}
            />
            <TrustCard 
              title="USDA Verified"
              description="Medical-grade nutrition database"
              isDark={darkMode}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

// Helper Components
function FeaturePoint({ text, isDark = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-7 h-7 ${isDark ? 'bg-white/20' : 'bg-gradient-to-r from-[#c9a875] to-[#b8976a]'} rounded-full flex items-center justify-center shadow-lg`}>
        <svg className={`w-4 h-4 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className={`${isDark ? 'text-white text-lg' : 'text-gray-700 text-lg'}`}>{text}</span>
    </div>
  )
}

function FeatureCard({ title, description, action, buttonText, disabled = false, gradient = "from-[#c9a875] to-[#b8976a]", darkMode = false }) {
  return (
    <div className={`group rounded-3xl shadow-xl p-8 border transition-all hover:-translate-y-2 hover:border-[#c9a875]/50 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border-gray-700 hover:shadow-2xl' : 'bg-gradient-to-br from-white to-[#faf8f5] border-[#c9a875]/20 hover:shadow-2xl'}`}>
      {/* Decorative gradient on hover */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
      
      <h3 className={`text-2xl font-semibold mb-3 mt-2 transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{title}</h3>
      <p className={`text-base mb-6 leading-relaxed min-h-[4.5rem] transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
      <button
        onClick={action}
        disabled={disabled}
        className={`w-full py-3.5 rounded-xl font-semibold transition-all shadow-lg text-base ${
          disabled 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : `bg-gradient-to-r ${gradient} text-white hover:shadow-xl hover:scale-105`
        }`}
      >
        {buttonText}
      </button>
    </div>
  )
}

function PricingFeature({ text, light = false, icon = "", darkMode = false }) {
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-xl">{icon}</span>}
      <svg 
        className={`w-6 h-6 ${light ? 'text-white' : 'text-[#c9a875]'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className={`text-lg ${light ? 'text-white' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{text}</span>
    </div>
  )
}

function TrustCard({ icon, title, description, isDark = false }) {
  return (
    <div className="text-center">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h4 className={`text-xl font-bold mb-2 transition-colors ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{title}</h4>
      <p className={`transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  )
}

export default HomePage
