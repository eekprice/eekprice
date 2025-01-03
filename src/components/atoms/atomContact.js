function AtomContact() {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:opacity-80 group">
      {/* Email Icon */}
      <div className=" border border-surface-outline-light dark:border-surface-outline-dark
      w-12 h-12 rounded-lg border  flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-200 group-hover:rotate-3">
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
          />
        </svg>
      </div>
      
      {/* Text */}
      <span className="absolute text-sm font-int font-light text-surface-foreground400-light dark:text-surface-foreground400-dark translate-y-11 group-hover:text-surface-foreground200-light dark:group-hover:text-surface-foreground200-dark">
        Contact
      </span>
    </div>
  );
}

export default AtomContact; 