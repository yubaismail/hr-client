"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/login");
    router.refresh();
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="AlignHR, Human Resource Management, Employee Alignment, Workforce Management, Payroll" />
        <meta name="description" content="AlignHR - The modern HR platform that aligns your workforce with business objectives" />
        <meta name="author" content="AlignHR Solutions" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg py-4">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
              {/* Logo with branding */}
              <div className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide">AlignHR</h1>
                <span className="ml-2 bg-white text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full hidden md:inline-block">
                  v2.0
                </span>
              </div>
              
              {/* Menu Toggle Button (Mobile) */}
              <button 
                className="md:hidden text-white text-2xl focus:outline-none" 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Navigation */}
            <nav className={`md:flex justify-center md:items-center text-lg transition-all duration-300 ${menuOpen ? "block" : "hidden md:block"}`}>
              <ul className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left">
                <li>
                  <Link 
                    href="/" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/dashboard" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/employees" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/employees" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Employees
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/attendance" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/attendance" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Attendance
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/payroll" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/payroll" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Payroll
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/performance-reviews" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/performance-reviews" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Performance
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/documents" 
                    className={`block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent transition-colors ${pathname === "/documents" ? "font-bold underline decoration-2" : ""}`}
                  >
                    Documents
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout Button - Hide on Login Page */}
            {pathname !== "/login" && (
              <div className="flex justify-center md:justify-end p-4">
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </header>

          {/* Page Content */}
          <div className="container mx-auto p-4 md:p-6 flex-grow">{children}</div>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <p className="mb-2">© {new Date().getFullYear()} AlignHR Solutions. All rights reserved.</p>
              <div className="flex justify-center space-x-4 text-sm">
                <Link href="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-blue-300 transition-colors">Contact Us</Link>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}