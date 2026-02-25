import Button from './Button'

function RecipeCard({ emoji, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
      <div className="h-48 bg-gradient-to-br from-[#f5f1eb] to-[#ebe6dd] flex items-center justify-center">
        <div className="text-6xl">{emoji}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex gap-2">
          <Button variant="card">
            View Recipe
          </Button>
          <Button variant="cardSecondary">
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
