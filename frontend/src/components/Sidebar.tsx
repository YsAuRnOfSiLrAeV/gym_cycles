import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  closeSidebar?: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen !== undefined) {
      setMenuOpen(isOpen);
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const linkClass = (path: string) =>
    `block text-xl px-2 py-1 ${
      location.pathname === path
        ? "text-black border-l-4 border-[#6a4133] bg-[#f8f4f2]"
        : "text-[#6C6960] hover:text-black"
    }`;

  const desktopLinkClass = (path: string) =>
    `block text-[22px] pl-6 px-4 py-3 rounded ${
      location.pathname === path
        ? "text-black bg-[#f8f4f2] border-l-4 border-[#6a4133]"
        : "text-[#6C6960] hover:bg-gray-100 hover:text-black"
    }`;

  const isMainActive = location.pathname === "/";

  return (
    <aside className="lg:w-96 w-full bg-white px-4 py-4 lg:border-t-12 lg:border-[#D0D0D0]">
      <div className="lg:hidden flex justify-between items-center">
        <Link to="/" onClick={handleLinkClick} className={`text-2xl font-poppins font-semibold ${isMainActive ? "text-black border-l-4 border-[#6a4133] pl-2 pr-2 bg-[#f8f4f2]" : "text-black"}`}>
          Program list
        </Link>

        <button onClick={handleMenuToggle} className="text-black">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden space-y-4 mt-4">
          <div className="pt-6 border-t border-[#d5c1ba]">
            <div className="text-2xl font-poppins font-semibold">General information</div>
            <ul className="mt-2 space-y-1">
              <li><Link to="/organization" onClick={handleLinkClick} className={linkClass("/organization")}>Organization of training</Link></li>
              <li><Link to="/newcomers" onClick={handleLinkClick} className={linkClass("/newcomers")}>For newcomers</Link></li>
              <li><Link to="/nutrition" onClick={handleLinkClick} className={linkClass("/nutrition")}>Nutrition</Link></li>
              <li><Link to="/author" onClick={handleLinkClick} className={linkClass("/author")}>About the Author</Link></li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[#d5c1ba]">
            <div className="text-2xl font-poppins font-semibold">Cycle types</div>
            <ul className="mt-2 space-y-1">
              <li><Link to="/hypertrophy" onClick={handleLinkClick} className={linkClass("/hypertrophy")}>Hypertrophy</Link></li>
              <li><Link to="/strength" onClick={handleLinkClick} className={linkClass("/strength")}>Strength</Link></li>
              <li><Link to="/recovery" onClick={handleLinkClick} className={linkClass("/recovery")}>Reaching the peak</Link></li>
            </ul>
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <Link to="/">
          <div className={`text-4xl rounded-md font-poppins font-semibold p-6 cursor-pointer ${
            isMainActive ? "text-black bg-[#f8f4f2] border-l-4 border-[#6a4133] pl-8" : ""
          }`}>
            Program list
          </div>
        </Link>
        <div className="pt-8 pb-8 border-b border-[#d5c1ba]">
          <div className="text-3xl font-poppins font-semibold pl-6">General information</div>
          <ul className="mt-[10px]">
            <li><Link to="/organization" className={desktopLinkClass("/organization")}>Organization of training</Link></li>
            <li><Link to="/newcomers" className={desktopLinkClass("/newcomers")}>For newcomers</Link></li>
            <li><Link to="/nutrition" className={desktopLinkClass("/nutrition")}>Nutrition</Link></li>
            <li><Link to="/author" className={desktopLinkClass("/author")}>About the Author</Link></li>
          </ul>
        </div>
        <div className="pt-8 pb-8 border-b border-[#d5c1ba]">
          <div className="text-3xl font-poppins font-semibold pl-6">Cycle types</div>
          <ul className="mt-[10px]">
            <li><Link to="/hypertrophy" className={desktopLinkClass("/hypertrophy")}>Hypertrophy</Link></li>
            <li><Link to="/strength" className={desktopLinkClass("/strength")}>Strength</Link></li>
            <li><Link to="/endurance" className={desktopLinkClass("/endurance")}>Reaching the peak</Link></li>
          </ul>
        </div>
        <ul className="mt-[10px]">
          <li><Link to="/future" className={desktopLinkClass("/future")}>*Thematic advertising will be displayed here</Link></li>
        </ul>
      </div>
    </aside>
  );
}
