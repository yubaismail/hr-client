"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get current page path
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
        <meta name="keywords" content="HRMS, Human Resource Management, Employee Management, Payroll" />
        <meta name="author" content="Your Company Name" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg py-4">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
              {/* Logo */}
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">HRMS</h1>
              
              {/* Menu Toggle Button (Mobile) */}
              <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Navigation */}
            <nav className={`md:flex justify-center md:items-center text-lg transition-all duration-300 ${menuOpen ? "block" : "hidden md:block"}`}>
              <ul className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left">
                <li><Link href="/" className="block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent">Home</Link></li>
                <li><Link href="/dashboard" className="block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent">Dashboard</Link></li>
                <li><Link href="/employees" className="block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent">Employees</Link></li>
                <li><Link href="/attendance" className="block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent">Attendance</Link></li>
                <li><Link href="/payroll" className="block py-3 px-6 hover:bg-blue-500 md:hover:bg-transparent">Payroll</Link></li>
              </ul>
            </nav>

            {/* Logout Button - Hide on Login Page */}
            {pathname !== "/login" && (
              <div className="flex justify-center md:justify-end p-4">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </header>

          {/* Page Content */}
          <div className="container mx-auto p-4 md:p-6 flex-grow">{children}</div>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-6 text-center">
            <p>© {new Date().getFullYear()} HRMS. All rights reserved.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
