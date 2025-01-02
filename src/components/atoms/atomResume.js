function AtomResume() {
    return (
      <div className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:opacity-80 group">
        {/* Resume Icon */}
        <div className="w-12 h-12 rounded-lg border border border-surface-outline-light dark:border-surface-outline-dark flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-200 group-hover:rotate-3">
          <svg 
            className="w-8 h-8 
            text-surface-foreground100-light dark:text-surface-foreground400-dark" 
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
        <span className="absolute text-sm font-int font-light text-surface-foreground400-light dark:text-surface-foreground400-dark translate-y-11 group-hover:text-surface-foreground100-light dark:group-hover:text-surface-foreground100-dark">
          Resume
        </span>
      </div>
    );
  }
  
  export default AtomResume;