import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipes = async (ingredient) => {
  try {
    console.log('Searching for:', ingredient); // Debug log
    
    // Clean the ingredient input
    const cleanIngredient = ingredient.trim().toLowerCase();
    
    const response = await axios.get(`${BASE_URL}/filter.php?i=${encodeURIComponent(cleanIngredient)}`);
    console.log('API Response:', response.data); // Debug log
    
    return response.data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to search recipes');
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${recipeId}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error('Failed to fetch recipe details');
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw new Error('Failed to fetch random recipe');
  }
};

// New function to search by multiple ingredients
export const searchByMultipleIngredients = async (ingredients) => {
  try {
    // Try each ingredient individually
    const promises = ingredients.map(ingredient => 
      searchRecipes(ingredient.trim())
    );
    
    const results = await Promise.all(promises);
    const allRecipes = results.flat();
    
    // Remove duplicates
    const uniqueRecipes = allRecipes.filter((recipe, index, self) =>
      index === self.findIndex(r => r.idMeal === recipe.idMeal)
    );
    
    return uniqueRecipes;
  } catch (error) {
    console.error('Error searching multiple ingredients:', error);
    throw new Error('Failed to search recipes');
  }
};