import React from 'react'; // Import React
import { useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SideProjectsButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTextClick = () => {
    navigate('/new-page'); // Replace '/new-page' with your desired route
  };

  return (
    <div className="inline-flex items-center justify-center rounded-lg border relative p-0 outline-surface-outlinePrimary hover:bg-gray-200 transition-transform duration-300 hover:rotate-2 cursor-pointer">
      {/* Left Dot */}
      <span
        className="bg-gray-700 rounded-full absolute border-2 border-white"
        style={{
          width: '8px',
          height: '8px',
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true" // Decorative element, hidden from screen readers
      ></span>

      {/* Text Container */}
      <div
        className="flex-grow flex items-center justify-center border-r outline-surface-outlinePrimary px-2 py-2.5 pl-4 cursor-pointer rounded-l-lg"
        onClick={handleTextClick}
        role="button" // Indicates this div acts as a button
        tabIndex={0} // Makes the div focusable
        onKeyPress={(e) => e.key === 'Enter' && handleTextClick()} // Handles Enter key for accessibility
        aria-label="Navigate to Side Projects page" // Descriptive label for screen readers
      >
        <span className="text-text-primary font-medium text-sm leading-[150%] font-inter">
          Side Projects
        </span>
      </div>

      {/* Chevron Container */}
      <div
        className="flex items-center justify-center px-2 py-2.5 rounded-r-lg"
        role="button"
        tabIndex={0}
        aria-label="Chevron icon"
      >
        <ExpandMoreIcon className="text-text-primary text-xs" />
      </div>

      {/* Right Dot */}
      <span
        className="bg-gray-700 rounded-full absolute border-2 border-white"
        style={{
          width: '8px',
          height: '8px',
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true" // Decorative element, hidden from screen readers
      ></span>
    </div>
  );
};

export default SideProjectsButton;