import RecipeCard from './RecipeCard'

function MyRecipesPage() {
  return (
    <main className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-2">My Recipes</h1>
          <p className="text-gray-600">Manage and organize all your recipes in one place</p>
        </div>
        
        {/* Coming Soon Message */}
        <div className="mb-12 p-8 bg-gradient-to-r from-[#c9a875]/10 to-[#8b7355]/10 border border-[#c9a875]/30 rounded-2xl text-center">
          <p className="text-lg text-gray-700 font-medium">
            This feature is <span className="bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent font-bold">coming soon</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">You'll be able to save and organize all your favorite recipes here</p>
        </div>

        {/* Example Preview */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preview: Your Saved Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Recipe Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="p-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent mb-2">Italian Pasta</h3>
                <p className="text-sm text-gray-600 mb-6">Classic pasta dish with fresh ingredients</p>
                
                {/* Nutrition Facts Section */}
                <div className="bg-gradient-to-br from-white to-[#faf8f5] rounded-xl p-4 border-l-4 border-[#c9a875]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-gradient-to-b from-[#c9a875] to-[#8b7355] rounded-full"></div>
                    <p className="text-xs font-bold text-gray-800">Nutrition Facts</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#c9a875]">350</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#8b7355]">12g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#b8976a]">45g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Recipe Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="p-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent mb-2">Fresh Garden Salad</h3>
                <p className="text-sm text-gray-600 mb-6">Healthy and crisp salad recipe</p>
                
                {/* Nutrition Facts Section */}
                <div className="bg-gradient-to-br from-white to-[#faf8f5] rounded-xl p-4 border-l-4 border-[#c9a875]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-gradient-to-b from-[#c9a875] to-[#8b7355] rounded-full"></div>
                    <p className="text-xs font-bold text-gray-800">Nutrition Facts</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#c9a875]">180</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#8b7355]">8g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#b8976a]">22g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Recipe Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="p-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#c9a875] to-[#8b7355] bg-clip-text text-transparent mb-2">Chocolate Cake</h3>
                <p className="text-sm text-gray-600 mb-6">Rich and moist chocolate dessert</p>
                
                {/* Nutrition Facts Section */}
                <div className="bg-gradient-to-br from-white to-[#faf8f5] rounded-xl p-4 border-l-4 border-[#c9a875]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-4 bg-gradient-to-b from-[#c9a875] to-[#8b7355] rounded-full"></div>
                    <p className="text-xs font-bold text-gray-800">Nutrition Facts</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#c9a875]">420</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#8b7355]">6g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="rounded-lg p-3 text-center bg-white shadow-sm">
                      <div className="text-lg font-bold text-[#b8976a]">52g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MyRecipesPage
