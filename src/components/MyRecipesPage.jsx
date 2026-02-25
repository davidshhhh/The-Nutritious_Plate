import RecipeCard from './RecipeCard'

function MyRecipesPage() {
  const recipes = [
    {
      emoji: '🍝',
      title: 'Italian Pasta',
      description: 'Classic pasta dish with fresh ingredients'
    },
    {
      emoji: '🥗',
      title: 'Fresh Garden Salad',
      description: 'Healthy and crisp salad recipe'
    },
    {
      emoji: '🍰',
      title: 'Chocolate Cake',
      description: 'Rich and moist chocolate dessert'
    }
  ]

  return (
    <main className="px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2">My Recipes</h1>
          <p className="text-gray-600">Manage and organize all your recipes in one place</p>
        </div>
        
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              emoji={recipe.emoji}
              title={recipe.title}
              description={recipe.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MyRecipesPage
