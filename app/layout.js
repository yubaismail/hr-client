"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // The authentication check is now just for UI purposes
    // since middleware handles the actual protection
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handleLogout = () => {
    // Remove the auth cookie
    Cookies.remove('auth');
    
    // Redirect to login page
    router.push("/login");
    router.refresh(); // Force a refresh to apply the new auth state
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
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">HRMS</h1>

              {/* Navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-6 text-lg">
                  <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                  <li><Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
                  <li><Link href="/employees" className="hover:text-gray-300">Employees</Link></li>
                  <li><Link href="/attendance" className="hover:text-gray-300">Attendance</Link></li>
                  <li><Link href="/payroll" className="hover:text-gray-300">Payroll</Link></li>
                </ul>
              </nav>

              {/* Logout Button */}
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </header>

          {/* Protected Page Content */}
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