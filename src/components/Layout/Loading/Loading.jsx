function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Gradient Text */}
        <p className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent text-2xl font-extrabold animate-bounce">
          Loading, please wait...
        </p>

        {/* Floating Dots */}
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-white rounded-full animate-bounce"></span>
          <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></span>
          <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
