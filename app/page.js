"use client"; // ✅ Use client components

import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);

  // Dynamically set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning ☀️");
    else if (hour < 18) setGreeting("Good Afternoon 🌤️");
    else setGreeting("Good Evening 🌙");
  }, []);

  const modules = [
    {
      title: "Dashboard",
      description: "Access all HR modules in one place",
      icon: "🏠",
      link: "/dashboard",
      stats: "Quick Overview",
    },
    {
      title: "Employee Management",
      description: "Add, edit, and manage employee profiles",
      icon: "👥",
      link: "/employees",
      stats: "143 employees",
    },
    {
      title: "Attendance Tracking",
      description: "Monitor employee attendance & leaves",
      icon: "📊",
      link: "/attendance",
      stats: "98% on time",
    },
    {
      title: "Payroll Processing",
      description: "Automate salary calculations & payslips",
      icon: "💰",
      link: "/payroll",
      stats: "Next: Apr 30",
    },
    {
      title: "Performance Review",
      description: "Track employee growth & appraisals",
      icon: "📈",
      link: "/performance",
      stats: "12 pending reviews",
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* ✅ Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-200 p-10 rounded-xl shadow-md border border-blue-300">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">{greeting}</h1>
        <p className="text-gray-700 max-w-3xl text-lg">
          Welcome to <span className="font-semibold text-blue-700">HRMS</span>, your all-in-one Human Resource Management System.
          Manage employees, track attendance, process payroll, and more.
        </p>
        <div className="flex mt-6 gap-4">
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition-all">
              Go to Dashboard
            </button>
          </Link>
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 rounded-lg border border-blue-300 transition-all"
          >
            View Tutorial
          </button>
        </div>
      </section>

      {/* ✅ Quick Access Modules */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(({ title, description, icon, link, stats }) => (
            <Link href={link} key={title} className="block group">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 group-hover:border-blue-400">
                <div className="text-5xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="text-sm font-medium text-gray-500">{stats}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ Show More Activities Button (Optional) */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAllActivities(!showAllActivities)}
          className="text-blue-700 hover:underline font-medium"
        >
          {showAllActivities ? "Show Less" : "Show More Activities"}
        </button>
      </div>

      {/* ✅ Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-6">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">HRMS Tutorial</h2>
            <p className="text-gray-600 mb-4">
              Learn how to use the HRMS platform efficiently. Manage employees, process payroll, and track attendance with ease.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowTutorial(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition-all"
              >
                Close
              </button>
              <a
                href="https://www.example.com/tutorial"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all"
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
