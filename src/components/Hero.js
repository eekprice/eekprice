const Hero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Main hero content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Your Headline Here
            </h1>
            <p className="text-lg text-gray-600">
              Your description text here
            </p>
          </div>
          
          {/* Photo section */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/path/to/photo1.jpg"
              alt="Description 1"
              className="rounded-lg object-cover w-full h-64"
            />
            <img
              src="/path/to/photo2.jpg"
              alt="Description 2"
              className="rounded-lg object-cover w-full h-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 