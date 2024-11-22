import React, { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, and useRef from React
import { useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SideProjectsButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMenuLocked, setMenuLocked] = useState(false); // State to lock the menu open
  const menuRef = useRef(null); // Create a ref for the menu

  const handleTextClick = () => {
    navigate('/new-page'); // Replace '/new-page' with your desired route
  };

  const toggleMenuLock = () => {
    setMenuLocked((prev) => !prev);
    setMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
      setMenuLocked(false);
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setMenuLocked(false);
  };

  const handleMouseEnter = () => {
    if (!isMenuLocked) {
      setMenuVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMenuLocked) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible || isMenuLocked) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible, isMenuLocked]);

  return (
    <div className="inline-flex items-stretch justify-center rounded-lg border border-gray-300 relative p-0">
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
        className="flex-grow flex items-center justify-center border-r border-gray-300 px-2 py-2.5 pl-4 cursor-pointer hover:text-gray-500 hover:bg-gray-100 rounded-l-lg"
        onClick={handleTextClick}
        role="button" // Indicates this div acts as a button
        tabIndex={0} // Makes the div focusable
        onKeyPress={(e) => e.key === 'Enter' && handleTextClick()} // Handles Enter key for accessibility
        aria-label="Navigate to Side Projects page" // Descriptive label for screen readers
      >
        <span className="text-black font-medium text-[14px] leading-[150%] font-inter">
          Side Projects
        </span>
      </div>

      {/* Chevron Container */}
      <div
        className={`flex items-center justify-center px-2 py-2.5 cursor-pointer rounded-r-lg ${
          isMenuLocked
            ? 'bg-blue-500 border border-blue-700'
            : 'hover:bg-gray-200'
        }`}
        onClick={toggleMenuLock}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && toggleMenuLock()}
        aria-expanded={isMenuVisible || isMenuLocked}
        aria-label="Toggle menu"
      >
        <ExpandMoreIcon className="text-black text-xs" />
      </div>

      {/* Menu */}
      {(isMenuVisible || isMenuLocked) && (
        <div
          ref={menuRef}
          className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10"
        >
          <div className="p-2 text-black" role="menuitem" tabIndex={0}>
            Menu Item 1
          </div>
          <div className="p-2 text-black" role="menuitem" tabIndex={0}>
            Menu Item 2
          </div>
          <button
            className="p-2 text-red-500 hover:text-red-700"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>
      )}

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