"use client";

import { FaUserTie, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header Section */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Dashboard</h1>
        <p className="text-lg text-gray-500">
          Manage your employees, attendance, and payroll efficiently.
        </p>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Employees */}
        <Link href="/employees" className="block">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-gray-200 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full text-blue-500">
                <FaUserTie size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Employees</h2>
                <p className="text-gray-500">View and manage employees</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Attendance */}
        <Link href="/attendance" className="block">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-gray-200 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full text-green-500">
                <FaCalendarCheck size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Attendance</h2>
                <p className="text-gray-500">Track employee attendance</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Payroll */}
        <Link href="/payroll" className="block">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-gray-200 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-4 rounded-full text-yellow-500">
                <FaMoneyBillWave size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Payroll</h2>
                <p className="text-gray-500">Manage payroll and salaries</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
