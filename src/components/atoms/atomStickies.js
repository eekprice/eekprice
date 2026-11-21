function Stickie({ text }) {
  return (
    <div className="relative w-40 h-40 pl-4 pr-4 mt-4 group hover:cursor-pointer">
      {/* The back note, pink: the Principal Product Consultant study (Erica, 2026-11-20).
          A pale pink, tucked close behind the green, so it carries less weight (her ask). */}
      <div className="absolute top-[64px] -left-2.5 w-32 h-40 bg-pink-200 transform rotate-[-11deg] shadow-sm transition-transform duration-300 group-hover:rotate-[-12deg] rounded-md"></div>

      {/* Background sticky layer with a slight rotation */}
      <div className="absolute top-14 left-0 w-32 h-40 bg-green-300 transform rotate-[-8deg] shadow-md transition-transform duration-300 group-hover:rotate-[-10deg] rounded-md"></div>
      
      {/* Middle sticky layer with a smaller rotation */}
      <div className="absolute top-11 left-2 w-32 h-32 bg-blue-300 transform rotate-[-5deg] shadow-md transition-transform duration-300 group-hover:rotate-[-7deg] rounded-md"></div>
      
      {/* Foreground sticky layer where the text is displayed */}
      <div className="relative w-full h-full bg-highlight-backgroundSticky-light dark:bg-highlight-backgroundSticky-dark p-4 shadow-lg top-8 transition-transform duration-300 group-hover:-translate-y-2 rounded-md">
        {/* Erica, 2026-11-18: sticky notes are set in Inter, not the handwriting font, so the site is not showing three typefaces at once. */}
        <span className="font-inter text-base leading-5 font-semibold text-highlight-foregroundSticky-light dark:text-highlight-foregroundSticky-dark">{text}</span>
      </div>
    </div>
  );
}

export default Stickie;