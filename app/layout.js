"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// Metadata needs to be moved to a separate file in app directory when using "use client" in layout.js
// Create a separate file named metadata.js with the following content:
/* 
// app/metadata.js
export const metadata = {
  title: "HRMS - Human Resource Management System",
  description: "A comprehensive solution for managing your organization's human resources.",
};
*/

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="HRMS, Human Resource Management, Employee Management, Payroll" />
        <meta name="author" content="Your Company Name" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen flex flex-col">
          {/* ✅ Header */}
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg py-4">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">HRMS</h1>
              
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
                </ul>
              </nav>
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
                </ul>
              </nav>
            )}
          </header>

          {/* ✅ Page Content */}
          <div className="container mx-auto p-4 md:p-6 flex-grow">{children}</div>

          {/* ✅ Footer */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center text-sm px-4">
              <p>© {new Date().getFullYear()} HRMS. All rights reserved.</p>
              <div className="flex flex-col md:flex-row justify-center md:space-x-6 space-y-2 md:space-y-0 mt-4">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="hover:underline">Terms of Service</Link>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}