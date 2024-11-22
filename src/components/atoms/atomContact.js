function AtomContact() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 rounded-lg cursor-pointer hover:opacity-80">
      {/* Email Icon */}
      <div className="w-16 h-16 rounded-2xl border-2 border-text-primary flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-text-primary" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
      </div>
      
      {/* Text */}
      <span className="text-xl font-merriweather font-light text-text-primary">
        Contact
      </span>
    </div>
  );
}

export default AtomContact; 