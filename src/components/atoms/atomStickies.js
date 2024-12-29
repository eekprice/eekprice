function Stickie({ text }) {
  return (
    <div className="relative w-40 h-40 pl-4 pr-4 mt-4 group hover:cursor-pointer">
      {/* Background sticky layer with a slight rotation */}
      <div className="absolute top-14 left-0 w-32 h-40 bg-green-300 transform rotate-[-8deg] shadow-md transition-transform duration-300 group-hover:rotate-[-10deg] rounded-md"></div>
      
      {/* Middle sticky layer with a smaller rotation */}
      <div className="absolute top-11 left-2 w-32 h-32 bg-blue-300 transform rotate-[-5deg] shadow-md transition-transform duration-300 group-hover:rotate-[-7deg] rounded-md"></div>
      
      {/* Foreground sticky layer where the text is displayed */}
      <div className="relative w-full h-full bg-yellow-300 p-4 shadow-lg top-8 transition-transform duration-300 group-hover:-translate-y-2 rounded-md">
        <span className="text-m font-bold text-text-primary">{text}</span>
      </div>
    </div>
  );
}

export default Stickie;