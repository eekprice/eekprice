// Text styles for headers (Merriweather)
export const headers = {
  h1: "font-merriweather text-4xl font-normal", // Large headers
  h2: "font-merriweather text-3xl font-normal", // Section headers
  h3: "font-merriweather text-2xl font-normal", // Sub-section headers
  h4: "font-merriweather text-xl font-normal",  // Small headers
}

// Text styles for body text (Inter)
export const body = {
  large: "font-inter text-lg font-normal",      // Large body text
  base: "font-inter text-base font-normal",     // Regular body text
  small: "font-inter text-sm font-normal",      // Small text
  tiny: "font-inter text-xs font-normal",       // Tiny text (footnotes, etc.)
}

// Text styles for special cases
export const special = {
  quote: "font-merriweather text-xl font-light italic", // Quotes or testimonials
  caption: "font-inter text-sm font-medium",            // Image captions
  button: "font-inter text-sm font-medium",             // Button text
  link: "font-inter text-base font-medium underline",   // Links
}

export const text = {
  // H1 variations
  h1: {
    lg: "font-merriweather text-5xl font-normal",  // Largest h1
    md: "font-merriweather text-4xl font-normal",  // Default h1
    sm: "font-merriweather text-3xl font-normal",  // Smaller h1
  },
  
  // H2 variations
  h2: {
    lg: "font-merriweather text-6xl font-normal",
    md: "font-merriweather text-3xl font-normal",
    sm: "font-merriweather text-2xl font-normal",
  },
  
  // H3 variations
  h3: {
    lg: "font-merriweather text-3xl font-normal",
    md: "font-merriweather text-2xl font-normal",
    sm: "font-merriweather text-xl font-normal",
  },
  
  // Body text variations
  body: {
    lg: "font-inter text-lg font-normal",
    md: "font-inter text-base font-normal",
    sm: "font-inter text-sm font-normal",
  },
  
  // Caption variations
  caption: {
    lg: "font-inter text-base font-medium",
    md: "font-inter text-sm font-medium",
    sm: "font-inter text-xs font-medium",
  }
} 