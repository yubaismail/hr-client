"use client";

import { FaUserTie, FaCalendarCheck, FaMoneyBillWave, FaPlus } from "react-icons/fa";

export default function Dashboard() {
  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* ✅ Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your employees, attendance, and payroll efficiently.
          </p>
        </div>

        {/* ✅ Quick Actions */}
        <div className="flex space-x-4 mb-6">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all">
            <FaPlus />
            <span>Add Employee</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all">
            <FaMoneyBillWave />
            <span>Manage Payroll</span>
          </button>
        </div>

        {/* ✅ Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Employees */}
          <div className="bg-blue-100 p-6 rounded-lg shadow flex items-center space-x-4">
            <FaUserTie className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Employees</h2>
              <p className="text-gray-600">View and manage employees</p>
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow flex items-center space-x-4">
            <FaCalendarCheck className="text-yellow-600 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Attendance</h2>
              <p className="text-gray-600">Track employee attendance</p>
            </div>
          </div>

          {/* Payroll */}
          <div className="bg-green-100 p-6 rounded-lg shadow flex items-center space-x-4">
            <FaMoneyBillWave className="text-green-600 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Payroll</h2>
              <p className="text-gray-600">Manage payroll and salaries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
