import { useState, useCallback } from 'react';
import { searchRecipes, getRecipeDetails, getRandomRecipe, searchByMultipleIngredients } from '../utils/api';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Enhanced search that handles multiple ingredients
  const searchRecipesByIngredient = useCallback(async (ingredientInput) => {
    if (!ingredientInput.trim()) {
      setError('Please enter an ingredient');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Check if input contains multiple ingredients (comma-separated)
      const ingredients = ingredientInput.split(',').map(ing => ing.trim()).filter(ing => ing);
      
      let results;
      
      if (ingredients.length > 1) {
        // Search with multiple ingredients
        results = await searchByMultipleIngredients(ingredients);
      } else {
        // Single ingredient search
        results = await searchRecipes(ingredients[0]);
      }
      
      console.log('Search results:', results); // Debug log
      
      if (results && results.length > 0) {
        setRecipes(results);
      } else {
        setError(`No recipes found for "${ingredientInput}". Try common ingredients like chicken, beef, pasta, rice, etc.`);
        setRecipes([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch recipes. Please check your connection and try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get random recipe
  const fetchRandomRecipe = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const randomRecipe = await getRandomRecipe();
      if (randomRecipe) {
        setRecipes([randomRecipe]);
      } else {
        setError('Failed to fetch random recipe. Please try again.');
        setRecipes([]);
      }
    } catch (err) {
      setError('Failed to fetch random recipe. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get recipe details and open modal
  const openRecipeDetails = useCallback(async (recipeId) => {
    try {
      const recipeDetails = await getRecipeDetails(recipeId);
      setSelectedRecipe(recipeDetails);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to load recipe details.');
    }
  }, []);

  // Close modal
  const closeRecipeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }, []);

  // Clear all recipes and errors
  const clearRecipes = useCallback(() => {
    setRecipes([]);
    setError('');
  }, []);

  return {
    // State
    recipes,
    loading,
    error,
    selectedRecipe,
    isModalOpen,
    
    // Actions
    searchRecipesByIngredient,
    fetchRandomRecipe,
    openRecipeDetails,
    closeRecipeModal,
    clearRecipes,
    
    // Derived state
    hasRecipes: recipes.length > 0,
  };
};