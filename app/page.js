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
    // ✅ Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not logged in
    }

    // ✅ Set greeting based on time
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
  ];

  return (
    <div className="space-y-12 pb-16 px-4 md:px-8">
      {/* ✅ Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-200 p-6 md:p-10 rounded-xl shadow-md border border-blue-300 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{greeting}</h1>
        <p className="text-gray-700 max-w-3xl text-lg mx-auto md:mx-0">
          Welcome to <span className="font-semibold text-blue-700">HRMS</span>, your all-in-one Human Resource Management System.
          Manage employees, track attendance, process payroll, and more.
        </p>
        <div className="flex flex-col md:flex-row mt-6 gap-4 items-center md:items-start">
          <Link href="/dashboard">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition-all">
              Go to Dashboard
            </button>
          </Link>
          <button
            onClick={() => setShowTutorial(true)}
            className="w-full md:w-auto bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 rounded-lg border border-blue-300 transition-all"
          >
            View Tutorial
          </button>
        </div>
      </section>

      {/* ✅ Quick Access Modules */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {modules.map(({ title, description, icon, link, stats }) => (
            <Link href={link} key={title} className="block group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 group-hover:border-blue-400 text-center md:text-left">
                <div className="text-5xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-sm font-medium text-gray-500">{stats}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-6">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">HRMS Tutorial</h2>
            <p className="text-gray-600 mb-4">
              Learn how to use the HRMS platform efficiently. Manage employees, process payroll, and track attendance with ease.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={() => setShowTutorial(false)}
                className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition-all"
              >
                Close
              </button>
              <a
                href="https://www.example.com/tutorial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all"
              >
                Watch Video
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
