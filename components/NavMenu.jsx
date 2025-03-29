// app/components/NavMenu.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees" },
    { name: "Attendance", path: "/attendance" },
    { name: "Payroll", path: "/payroll" },
  ];

  if (!isAuthenticated) {
    return null; // Don't show nav menu if not authenticated
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">HRMS</h1>
        
        <div className="flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-lg">
              {navItems.map(({ name, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="relative text-white hover:text-gray-300 transition-all duration-300
                    after:block after:w-0 after:h-[2px] after:bg-white after:transition-all
                    after:duration-300 hover:after:w-full"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-300 transition-all duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center p-2 rounded text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden container mx-auto px-4 pt-2 pb-3">
          <ul className="flex flex-col space-y-3">
            {navItems.map(({ name, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="block text-white hover:text-gray-300 transition-all duration-300 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="block text-white hover:text-gray-300 transition-all duration-300 py-1"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}