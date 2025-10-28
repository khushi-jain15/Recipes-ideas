import Header from './components/Header'
import SearchBar from './components/SearchBar'
import RecipeCard from './components/RecipeCard'
import RecipeModal from './components/RecipeModal'
import LoadingSpinner from './components/LoadingSpinner'
import { useRecipes } from './hooks/useRecipes'

function App() {
  const {
    recipes,
    loading,
    error,
    selectedRecipe,
    isModalOpen,
    searchRecipesByIngredient,
    fetchRandomRecipe,
    openRecipeDetails,
    closeRecipeModal,
    hasRecipes,
  } = useRecipes()

  const handleRandomSearch = () => {
    // Use common ingredients for random search
    const commonIngredients = ['chicken', 'pasta', 'rice', 'beef', 'potato', 'tomato', 'cheese', 'egg']
    const randomIngredient = commonIngredients[Math.floor(Math.random() * commonIngredients.length)]
    searchRecipesByIngredient(randomIngredient)
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <SearchBar 
          onSearch={searchRecipesByIngredient}
          onRandomSearch={handleRandomSearch}
        />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center mb-6 animate-fade-in">
            <div className="font-semibold mb-2">😕 No Recipes Found</div>
            <div>{error}</div>
            <div className="mt-3 text-sm text-red-600">
              Try common ingredients like: chicken, beef, pasta, rice, potato, tomato, cheese, egg
            </div>
          </div>
        )}

        {!loading && !error && hasRecipes && (
          <div className="animate-fade-in">
            <div className="text-white text-center mb-6">
              <p className="text-lg">Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onClick={() => openRecipeDetails(recipe.idMeal)}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && !hasRecipes && (
          <div className="text-center py-16 text-white animate-fade-in">
            <div className="text-6xl mb-4">🍳</div>
            <h3 className="text-2xl font-bold mb-4">Find Your Perfect Recipe!</h3>
            <p className="text-lg opacity-90 max-w-md mx-auto mb-6">
              Enter an ingredient above to discover delicious recipes you can make today.
            </p>
            <div className="text-sm opacity-75">
              <p>Try: chicken, beef, pasta, rice, potato, tomato, cheese, or egg</p>
            </div>
          </div>
        )}

        {isModalOpen && selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={closeRecipeModal}
          />
        )}
      </div>
    </div>
  )
}

export default App