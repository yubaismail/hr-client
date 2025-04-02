"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning ☀️");
    else if (hour < 18) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙");
  }, [router]);

  const modules = [
    { title: "Dashboard", description: "Access all HR modules in one place", icon: "🏠", link: "/dashboard", stats: "Quick Overview" },
    { title: "Employee Management", description: "Add, edit, and manage employee profiles", icon: "👥", link: "/employees", stats: "143 employees" },
    { title: "Attendance Tracking", description: "Monitor employee attendance & leaves", icon: "📊", link: "/attendance", stats: "98% on time" },
    { title: "Payroll Processing", description: "Automate salary calculations & payslips", icon: "💰", link: "/payroll", stats: "Next: Apr 30" },
    { title: "Performance Review", description: "Track employee growth & appraisals", icon: "📈", link: "/performance-reviews", stats: "12 pending reviews" },
    { title: "Documents", description: "Manage company and employee documents", icon: "📂", link: "/documents", stats: "256 files" },
  ];

  return (
    <div className="space-y-12 pb-16 px-4 md:px-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-200 p-6 md:p-10 rounded-xl shadow-md border border-blue-300 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">AlignHR</h1>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">{greeting}</h2>
        <p className="text-gray-700 max-w-3xl text-lg mx-auto md:mx-0">
          Welcome to <span className="font-semibold text-blue-700">AlignHR</span>, the modern platform that aligns your workforce with business goals.
          Streamline HR processes and enhance employee engagement.
        </p>
        <div className="flex flex-col md:flex-row mt-6 gap-4 items-center md:items-start">
          <Link href="/dashboard">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition-all flex items-center">
              <span>Go to Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
          <button
            onClick={() => setShowTutorial(true)}
            className="w-full md:w-auto bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 rounded-lg border border-blue-300 transition-all flex items-center"
          >
            <span>View Tutorial</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Quick Access Modules */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">AlignHR Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {modules.map(({ title, description, icon, link, stats }) => (
            <Link href={link} key={title} className="block group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 group-hover:border-blue-400 text-center md:text-left h-full">
                <div className="text-5xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 inline-block px-3 py-1 rounded-full">
                  {stats}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-6 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">AlignHR Platform Tutorial</h2>
            <p className="text-gray-600 mb-6">
              Get started with AlignHR and discover how to align your workforce with your business objectives.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={() => setShowTutorial(false)}
                className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg transition-all flex items-center justify-center"
              >
                <span>Close</span>
              </button>
              <a
                href="https://www.example.com/tutorial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all flex items-center justify-center"
              >
                <span>Watch Video Tutorial</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}