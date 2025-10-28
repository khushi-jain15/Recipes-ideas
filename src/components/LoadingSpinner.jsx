const LoadingSpinner = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold">Searching for delicious recipes...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner