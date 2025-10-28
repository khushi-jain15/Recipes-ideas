const RecipeModal = ({ recipe, onClose }) => {
  const getIngredients = () => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : 'to taste'
        })
      }
    }
    return ingredients
  }

  const ingredients = getIngredients()

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal}
            className="w-full h-64 md:h-80 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            ×
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-black/80 to-transparent p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {recipe.strMeal}
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {recipe.strCategory}
              </span>
              {recipe.strArea && (
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {recipe.strArea}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Ingredients */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 inline-block">
              Ingredients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {ingredients.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border-l-4 border-blue-500"
                >
                  <span className="font-semibold text-blue-600 min-w-20">
                    {item.measure}
                  </span>
                  <span className="text-gray-700">{item.ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500 inline-block">
              Instructions
            </h3>
            <div className="prose max-w-none mt-4">
              {recipe.strInstructions?.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>

          {/* YouTube Link */}
          {recipe.strYoutube && (
            <div className="text-center">
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-xl">📺</span>
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeModal