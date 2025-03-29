"use client"; // ✅ Ensure it's a client component

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute"; // Adjusted import path
import DashboardLayout from "@/components/layout/DashboardLayout"; // Adjusted import path

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* ✅ Header Section */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 text-sm">Current Time: {currentTime}</p>
          </div>

          {/* ✅ Welcome Message */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">
              Stay organized and manage your employees, attendance, and payroll efficiently.
            </p>
          </div>

          {/* ✅ Main Dashboard Content Placeholder */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Dashboard Overview</h3>
            <p className="text-gray-600 mt-2">More analytics and insights coming soon...</p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
