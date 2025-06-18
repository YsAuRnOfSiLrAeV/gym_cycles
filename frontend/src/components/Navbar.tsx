import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem('currentUser');
      setIsLoggedIn(!!currentUser);
    };

    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);

    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;
    
    localStorage.setItem = function(key, value) {
      const result = originalSetItem.apply(this, [key, value]);
      if (key === 'currentUser') {
        checkLoginStatus();
      }
      return result;
    };
    
    localStorage.removeItem = function(key) {
      const result = originalRemoveItem.apply(this, [key]);
      if (key === 'currentUser') {
        checkLoginStatus();
      }
      return result;
    };

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  return (
    <nav className="w-full fixed bg-white border-b border-[#aaaaaa] px-4 lg:px-12 z-50">
      <div className="h-16 flex items-center justify-between">
        <div className="text-2xl font-bold logo-brown-anim">GymCycles</div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center border border-[#4E342E] px-3 py-1.5 rounded-md w-64">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none text-[#4E342E] placeholder-[#4E342E] text-base"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E342E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 ml-2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-[#4E342E] block lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E342E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {!isLoggedIn ? (
              <Link to="/login" className="text-[#4E342E] text-base hover:underline">
                Login
              </Link>
            ) : (
              <Link to="/profile" className="text-[#4E342E] text-base hover:underline">
                Profile
              </Link>
            )}
          </div>

          <div className="block lg:hidden">
            {!isLoggedIn ? (
              <Link to="/login" className="text-[#4E342E] text-base hover:underline">
                Login
              </Link>
            ) : (
              <Link to="/profile" className="text-[#4E342E] text-base hover:underline">
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="block lg:hidden mt-2 mb-4 px-4">
          <div className="flex items-center border border-[#4E342E] px-3 py-2 rounded-md w-full">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none text-[#4E342E] placeholder-[#4E342E] text-base"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
