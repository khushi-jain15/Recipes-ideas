const RecipeCard = ({ recipe, onClick }) => {
  // Function to ensure HTTPS and handle image URLs properly
  const getSafeImageUrl = (url) => {
    if (!url) return null;
    
    // Ensure HTTPS and handle protocol-relative URLs
    let safeUrl = url;
    if (url.startsWith('//')) {
      safeUrl = 'https:' + url;
    } else if (url.startsWith('http://')) {
      safeUrl = url.replace('http://', 'https://');
    }
    
    return safeUrl;
  };

  // Handle image loading errors with multiple fallbacks
  const handleImageError = (e) => {
    console.log('Image failed to load, using fallback...');
    
    // Fallback 1: Try direct TheMealDB URL
    const directUrl = `https://www.themealdb.com/images/media/meals/${recipe.strMealThumb?.split('/media/meals/')[1]}`;
    
    if (directUrl && e.target.src !== directUrl) {
      e.target.src = directUrl;
    } else {
      // Fallback 2: Use a colorful placeholder
      const colors = ['667eea', '764ba2', 'f093fb', 'f5576c', '4facfe'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const placeholderText = recipe.strMeal ? 
        recipe.strMeal.substring(0, 15) + (recipe.strMeal.length > 15 ? '...' : '') : 
        'Recipe Image';
      
      e.target.src = `https://via.placeholder.com/300x200/${color}/ffffff?text=${encodeURIComponent(placeholderText)}`;
    }
  };

  const imageUrl = getSafeImageUrl(recipe.strMealThumb);

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer border border-gray-100 transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-50 to-purple-50">
        <img 
          src={imageUrl} 
          alt={recipe.strMeal || 'Recipe image'}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight min-h-14 flex items-center">
          {recipe.strMeal || 'Unknown Recipe'}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {recipe.strCategory || 'General'}
          </span>
          {recipe.strArea && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {recipe.strArea}
            </span>
          )}
        </div>
        
        <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-md">
          View Recipe →
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;