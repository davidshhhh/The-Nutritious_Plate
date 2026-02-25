import { useState, useEffect } from 'react'
import { getFullPlateNutrition } from '../services/usda'

function NutritionLabel({ ingredientsList }) {
  const [nutritionData, setNutritionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchNutrition = async () => {
      if (!ingredientsList || ingredientsList.length === 0) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result = await getFullPlateNutrition(ingredientsList)
        
        if (result.success) {
          setNutritionData(result)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError('Failed to fetch nutrition data')
        console.error('Nutrition fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNutrition()
  }, [ingredientsList])

  if (!ingredientsList || ingredientsList.length === 0) return null

  if (loading) {
    return (
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 max-w-sm">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Calculating plate nutrition...</p>
        </div>
      </div>
    )
  }

  if (error || !nutritionData || !nutritionData.totals) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 max-w-sm">
        <p className="text-xs text-yellow-800">⚠️ Nutrition data unavailable</p>
        <p className="text-xs text-gray-600 mt-1">Unable to calculate plate totals</p>
      </div>
    )
  }

  const totals = nutritionData.totals

  return (
    <div className="bg-white border-2 border-gray-800 rounded-lg p-4 max-w-sm font-sans">
      {/* FDA-style Nutrition Facts Label */}
      <div className="border-b-8 border-gray-800 pb-1 mb-1">
        <h3 className="font-bold text-2xl">Nutrition Facts</h3>
        <p className="text-xs text-gray-600">
          Total Plate ({totals.successCount} ingredient{totals.successCount !== 1 ? 's' : ''})
        </p>
      </div>

      {/* Calories - Large and prominent */}
      <div className="border-b-8 border-gray-800 pb-2 mb-2">
        <div className="flex justify-between items-end">
          <span className="font-bold text-3xl">Calories</span>
          <span className="font-bold text-4xl">{totals.calories}</span>
        </div>
      </div>

      {/* % Daily Value header */}
      <div className="border-b-4 border-gray-800 pb-1 mb-2">
        <p className="text-xs font-semibold text-right">% Daily Value*</p>
      </div>

      {/* Macronutrients */}
      <div className="space-y-1 text-sm border-b border-gray-400 pb-2 mb-2">
        <NutrientRow 
          label="Total Fat" 
          amount={totals.fat} 
          unit="g" 
          dailyValue={totals.fat ? Math.round((totals.fat / 78) * 100) : null}
        />
        <NutrientRow 
          label="Total Carbohydrate" 
          amount={totals.carbs} 
          unit="g" 
          dailyValue={totals.carbs ? Math.round((totals.carbs / 275) * 100) : null}
        />
        {totals.fiber > 0 && (
          <NutrientRow 
            label="Dietary Fiber" 
            amount={totals.fiber} 
            unit="g" 
            dailyValue={Math.round((totals.fiber / 28) * 100)}
            indent={true}
          />
        )}
        {totals.sugar > 0 && (
          <NutrientRow 
            label="Total Sugars" 
            amount={totals.sugar} 
            unit="g" 
            indent={true}
          />
        )}
        <NutrientRow 
          label="Protein" 
          amount={totals.protein} 
          unit="g" 
          dailyValue={totals.protein ? Math.round((totals.protein / 50) * 100) : null}
        />
      </div>

      {/* Toggle for ingredient breakdown */}
      {nutritionData.ingredients && nutritionData.ingredients.length > 0 && (
        <>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-2 text-xs font-medium text-[#c9a875] hover:text-[#b8976a] flex items-center justify-between border-b border-gray-300"
          >
            <span>{showDetails ? '▼' : '▶'} Ingredient Breakdown</span>
          </button>
          
          {showDetails && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {nutritionData.ingredients.map((item, index) => (
                <div key={index} className="text-xs p-2 bg-gray-50 rounded border-l-2 border-[#c9a875]">
                  <p className="font-medium text-gray-800">{item.ingredient}</p>
                  {item.success ? (
                    <p className="text-gray-600 mt-1">
                      {Math.round(item.data.calories)} cal • 
                      {item.data.protein.toFixed(1)}g protein • 
                      {item.data.carbs.toFixed(1)}g carbs • 
                      {item.data.fat.toFixed(1)}g fat
                    </p>
                  ) : (
                    <p className="text-red-600 mt-1 italic">❌ {item.error}</p>
                  )}
                </div>
              ))}
              {totals.failedCount > 0 && (
                <p className="text-xs text-yellow-600 italic pt-2">
                  ⚠️ {totals.failedCount} ingredient{totals.failedCount !== 1 ? 's' : ''} could not be found in USDA database
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <p className="text-xs text-gray-600 mt-2">
        *The % Daily Value tells you how much a nutrient in a serving contributes to a daily diet. 
        2,000 calories a day is used for general nutrition advice.
      </p>

      <p className="text-xs text-gray-500 italic mt-2">
        Data from USDA FoodData Central
      </p>
    </div>
  )
}

// Helper component for nutrient rows
function NutrientRow({ label, amount, unit, dailyValue, indent = false }) {
  if (amount === 0 || amount === null || amount === undefined) return null

  return (
    <div className="flex justify-between border-b border-gray-300 py-1">
      <span className={`${indent ? 'pl-4' : 'font-semibold'}`}>
        {label} {amount.toFixed(1)}{unit}
      </span>
      {dailyValue !== null && dailyValue !== undefined && (
        <span className="font-semibold">{dailyValue}%</span>
      )}
    </div>
  )
}

export default NutritionLabel
