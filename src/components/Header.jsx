const Header = () => {
  return (
    <header className="text-center mb-12 animate-slide-up">
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4">
          <span className="text-6xl">🍳</span>
          Recipe Ideas
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover delicious recipes based on ingredients you have! Perfect for busy professionals like Taylor.
        </p>
      </div>
    </header>
  )
}

export default Header