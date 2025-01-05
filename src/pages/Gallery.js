import PhotoGrid from '../components/PhotoGrid';

const Gallery = () => {
  const photos = [
    {
      id: '1',
      url: '/path/to/photo1.jpg',
      alt: 'Description 1'
    },
    // Add more photos...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PhotoGrid photos={photos} />
    </div>
  );
};

export default Gallery; 