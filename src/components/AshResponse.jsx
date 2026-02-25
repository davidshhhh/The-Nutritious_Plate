import { useState, useEffect } from 'react'
import NutritionLabel from './NutritionLabel'

function AshResponse({ jsonString }) {
  const [parsedData, setParsedData] = useState(null)
  const [parseError, setParseError] = useState(false)

  useEffect(() => {
    try {
      const data = JSON.parse(jsonString)
      setParsedData(data)
      setParseError(false)
    } catch (error) {
      console.error('Failed to parse Ash response:', error)
      setParseError(true)
      // Fallback: treat as plain text
      setParsedData({ message: jsonString, recipe: null })
    }
  }, [jsonString])

  if (!parsedData) return null

  return (
    <div className="space-y-4">
      {/* Chat message bubble */}
      {parsedData.message && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 max-w-2xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#c9a875] rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">Ash</p>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {parsedData.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recipe card (only if recipe exists) */}
      {parsedData.recipe && (
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          {/* Recipe Details */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex-1 min-w-0">
            <div className="space-y-4">
              {/* Recipe vision/title */}
              {parsedData.recipe.vision && (
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    🍽️ {parsedData.recipe.vision}
                  </h3>
                </div>
              )}

              {/* Ingredients */}
              {parsedData.recipe.ingredients && parsedData.recipe.ingredients.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Ingredients
                  </h4>
                  <ul className="space-y-1 text-gray-700">
                    {parsedData.recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#c9a875] mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Steps */}
              {parsedData.recipe.steps && parsedData.recipe.steps.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Steps
                  </h4>
                  <ol className="space-y-2 text-gray-700">
                    {parsedData.recipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-[#c9a875] text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Nutrition Label (only if ingredientsList exists) */}
          {parsedData.recipe.ingredientsList && parsedData.recipe.ingredientsList.length > 0 && (
            <div className="flex-shrink-0">
              <NutritionLabel ingredientsList={parsedData.recipe.ingredientsList} />
            </div>
          )}
        </div>
      )}

      {/* Parse error indicator (dev only) */}
      {parseError && process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-yellow-600 italic">
          ⚠️ Response wasn't valid JSON, displaying as plain text
        </div>
      )}
    </div>
  )
}

export default AshResponse
