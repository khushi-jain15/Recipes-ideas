import { useState } from 'react'

const SearchBar = ({ onSearch, onRandomSearch }) => {
  const [ingredient, setIngredient] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ingredient.trim()) {
      onSearch(ingredient)
    }
  }

  const handleRandomClick = () => {
    onRandomSearch()
  }

  // Common ingredient suggestions
  const commonIngredients = [
    'chicken', 'beef', 'pasta', 'rice', 'potato', 
    'tomato', 'cheese', 'egg', 'onion', 'garlic'
  ]

  const handleSuggestionClick = (suggestedIngredient) => {
    setIngredient(suggestedIngredient)
    onSearch(suggestedIngredient)
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8 animate-slide-up">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, pasta, or tomato, onion, cheese...)"
            className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 text-lg"
          />
          <button 
            type="submit"
            className="btn-primary whitespace-nowrap"
            disabled={!ingredient.trim()}
          >
            🔍 Search Recipes
          </button>
        </div>
      </form>
      
      {/* Quick Suggestions */}
      <div className="mb-6">
        <p className="text-gray-600 text-center mb-3">💡 Quick suggestions:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {commonIngredients.map((ing) => (
            <button
              key={ing}
              onClick={() => handleSuggestionClick(ing)}
              className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              {ing}
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <button 
          onClick={handleRandomClick}
          className="btn-secondary"
        >
          🎲 Feeling Lucky (Random Recipe)
        </button>
        <div className="text-gray-600 text-sm">
          <p>You can search single ingredients (e.g., "chicken") or multiple ingredients separated by commas (e.g., "tomato, onion, cheese")</p>
        </div>
      </div>
    </div>
  )
}

export default SearchBar