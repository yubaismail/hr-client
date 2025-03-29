"use client";

import { FaUserTie, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Manage your employees, attendance, and payroll efficiently.
        </p>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employees */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-500">
              <FaUserTie size={24} />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">Employees</h2>
              <p className="text-gray-600">View and manage employees</p>
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-500">
              <FaCalendarCheck size={24} />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">Attendance</h2>
              <p className="text-gray-600">Track employee attendance</p>
            </div>
          </div>
        </div>

        {/* Payroll */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-500">
              <FaMoneyBillWave size={24} />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">Payroll</h2>
              <p className="text-gray-600">Manage payroll and salaries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
