// USDA FoodData Central API Service
const API_KEY = import.meta.env.VITE_USDA_API_KEY
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

if (!API_KEY) {
  console.error('⚠️ USDA API key is missing! Please add VITE_USDA_API_KEY to your .env file')
}

/**
 * Search for foods by name
 * @param {string} query - The food name to search for (e.g., "spinach", "chicken breast")
 * @param {number} pageSize - Number of results to return (default: 5)
 * @returns {Promise} Search results with fdcId and basic info
 */
export const searchFood = async (query, pageSize = 5) => {
  try {
    // Use + operators to force all words to be present (better accuracy)
    const formattedQuery = query.trim().split(/\s+/).join('+')
    const url = `${BASE_URL}/foods/search?query=${encodeURIComponent(formattedQuery)}&pageSize=${pageSize}&api_key=${API_KEY}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`USDA API Error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Simplify the response to only essential info
    const foods = data.foods?.map(food => ({
      fdcId: food.fdcId,
      description: food.description,
      brandName: food.brandName || null,
      dataType: food.dataType, // 'Branded', 'Survey (FNDDS)', 'SR Legacy', etc.
    })) || []
    
    return {
      success: true,
      foods: foods,
      totalResults: data.totalHits || 0
    }
  } catch (error) {
    console.error('Error searching USDA foods:', error)
    return {
      success: false,
      error: error.message,
      foods: []
    }
  }
}

/**
 * Get detailed nutrition facts for a specific food by fdcId
 * @param {number} fdcId - The unique food ID from USDA
 * @returns {Promise} Detailed nutrition information
 */
export const getFoodDetails = async (fdcId) => {
  try {
    const url = `${BASE_URL}/food/${fdcId}?api_key=${API_KEY}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`USDA API Error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Extract key nutrients in a clean format
    const nutrients = {}
    
    data.foodNutrients?.forEach(nutrient => {
      const name = nutrient.nutrient?.name
      const amount = nutrient.amount
      const unit = nutrient.nutrient?.unitName
      
      if (name && amount !== undefined) {
        nutrients[name] = {
          amount: amount,
          unit: unit
        }
      }
    })
    
    return {
      success: true,
      food: {
        fdcId: data.fdcId,
        description: data.description,
        brandName: data.brandName || null,
        servingSize: data.servingSize || null,
        servingSizeUnit: data.servingSizeUnit || null,
        nutrients: nutrients,
        // Key nutrition facts (if available)
        calories: nutrients['Energy']?.amount || 0,
        protein: nutrients['Protein']?.amount || 0,
        carbs: nutrients['Carbohydrate, by difference']?.amount || 0,
        fat: nutrients['Total lipid (fat)']?.amount || 0,
        fiber: nutrients['Fiber, total dietary']?.amount || 0,
        sugar: nutrients['Sugars, total including NLEA']?.amount || 0,
      }
    }
  } catch (error) {
    console.error('Error fetching USDA food details:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * One-step function: Search for a food and get its nutrition facts
 * @param {string} foodName - The food to search for
 * @returns {Promise} First matching food's nutrition details
 */
export const getNutritionFacts = async (foodName) => {
  try {
    // Step 1: Search for the food
    const searchResult = await searchFood(foodName, 1)
    
    if (!searchResult.success || searchResult.foods.length === 0) {
      return {
        success: false,
        error: `No foods found for "${foodName}"`
      }
    }
    
    // Step 2: Get details for the first result
    const fdcId = searchResult.foods[0].fdcId
    const details = await getFoodDetails(fdcId)
    
    return details
    
  } catch (error) {
    console.error('Error getting nutrition facts:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Get full plate nutrition by fetching data for multiple ingredients
 * @param {Array<string>} ingredientsArray - Array of ingredient strings (e.g., ["1 large egg", "2 slices bread"])
 * @returns {Promise} Object with totals and individual ingredient results
 */
export const getFullPlateNutrition = async (ingredientsArray) => {
  if (!ingredientsArray || ingredientsArray.length === 0) {
    return {
      success: false,
      error: 'No ingredients provided',
      totals: null,
      ingredients: []
    }
  }

  try {
    // Fetch nutrition for all ingredients simultaneously using Promise.all
    const nutritionPromises = ingredientsArray.map(async (ingredient) => {
      try {
        const result = await getNutritionFacts(ingredient)
        
        if (result.success && result.food) {
          return {
            ingredient: ingredient,
            success: true,
            data: result.food,
            error: null
          }
        } else {
          return {
            ingredient: ingredient,
            success: false,
            data: null,
            error: result.error || 'Unknown error'
          }
        }
      } catch (error) {
        // Handle individual ingredient errors gracefully
        return {
          ingredient: ingredient,
          success: false,
          data: null,
          error: error.message
        }
      }
    })

    // Wait for all promises to resolve
    const results = await Promise.all(nutritionPromises)

    // Reducer: Sum up nutrition from all successful results
    const totals = results.reduce((acc, result) => {
      if (result.success && result.data) {
        acc.calories += result.data.calories || 0
        acc.protein += result.data.protein || 0
        acc.carbs += result.data.carbs || 0
        acc.fat += result.data.fat || 0
        acc.fiber += result.data.fiber || 0
        acc.sugar += result.data.sugar || 0
        acc.successCount++
      } else {
        acc.failedCount++
      }
      return acc
    }, {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      successCount: 0,
      failedCount: 0
    })

    // Round totals for cleaner display
    totals.calories = Math.round(totals.calories)
    totals.protein = Math.round(totals.protein * 10) / 10
    totals.carbs = Math.round(totals.carbs * 10) / 10
    totals.fat = Math.round(totals.fat * 10) / 10
    totals.fiber = Math.round(totals.fiber * 10) / 10
    totals.sugar = Math.round(totals.sugar * 10) / 10

    return {
      success: true,
      totals: totals,
      ingredients: results
    }

  } catch (error) {
    console.error('Error calculating full plate nutrition:', error)
    return {
      success: false,
      error: error.message,
      totals: null,
      ingredients: []
    }
  }
}

export default {
  searchFood,
  getFoodDetails,
  getNutritionFacts,
  getFullPlateNutrition
}
