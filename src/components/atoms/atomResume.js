function AtomResume() {
    return (
      <div className="flex flex-col items-center space-y-4 p-4 rounded-lg cursor-pointer hover:opacity-80">
        {/* Resume Icon */}
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        {/* Text */}
        <span className="text-xl font-merriweather font-light text-text-primary">
          Resume
        </span>
      </div>
    );
  }
  
  export default AtomResume;