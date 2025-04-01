"use client";

import { 
  FaUserTie, 
  FaCalendarCheck, 
  FaMoneyBillWave, 
  FaFileExport,
  FaUserClock,
  FaCog, 
  FaBell,
  FaUsers,
  FaFileAlt,
  FaChartBar
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [stats, setStats] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);

    // Simulate API call
    setTimeout(() => {
      setStats({
        totalEmployees: 142,
        presentToday: 118,
        payrollPending: 7,
        departments: [
          { name: "Engineering", headcount: 42 },
          { name: "Marketing", headcount: 18 },
          { name: "Sales", headcount: 24 },
          { name: "HR", headcount: 12 },
          { name: "Operations", headcount: 28 }
        ]
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const generateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportGenerated(true);
      setTimeout(() => setReportGenerated(false), 5000);
    }, 2500);
  };

  // Loading skeleton component
  const LoadingSkeleton = ({ className }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Align<span className="text-blue-600">HR</span></h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-gray-700 relative"
              >
                <FaBell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Notifications</p>
                  </div>
                  {[
                    "New employee onboarding scheduled",
                    "3 pending leave requests",
                    "Payroll processing reminder"
                  ].map((notification, index) => (
                    <div key={index} className="px-4 py-2 hover:bg-gray-50">
                      <p className="text-sm text-gray-700">{notification}</p>
                      <p className="text-xs text-gray-500 mt-1">Today, {currentTime}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaCog size={20} />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    System Settings
                  </Link>
                  <Link href="/preferences" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    User Preferences
                  </Link>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">AD</div>
                <span className="text-gray-700 font-medium">Admin</span>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Profile
                  </Link>
                  <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
            <div className="flex items-center text-gray-500">
              <IoMdTime className="mr-2" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span className="mx-2">•</span>
              <span>{currentTime}</span>
            </div>
          </div>
          <button 
            onClick={generateReport}
            disabled={isGeneratingReport}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${isGeneratingReport ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white mt-4 md:mt-0`}
          >
            {isGeneratingReport ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <FaFileExport className="mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>

        {reportGenerated && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex justify-between items-center">
            <span>Report generated successfully!</span>
            <button onClick={() => setReportGenerated(false)} className="text-green-700 hover:text-green-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Employees</p>
                {stats ? (
                  <>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.totalEmployees}</h3>
                    <p className="text-green-500 text-sm mt-1 flex items-center">
                      <span>↑ 8.2%</span>
                      <span className="ml-1">from last month</span>
                    </p>
                  </>
                ) : (
                  <div className="mt-2 space-y-2">
                    <LoadingSkeleton className="h-8 w-24" />
                    <LoadingSkeleton className="h-4 w-32" />
                  </div>
                )}
              </div>
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <FaUsers size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Present Today</p>
                {stats ? (
                  <>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.presentToday}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.round((stats.presentToday / stats.totalEmployees) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      {Math.round((stats.presentToday / stats.totalEmployees) * 100)}% attendance rate
                    </p>
                  </>
                ) : (
                  <div className="mt-2 space-y-2">
                    <LoadingSkeleton className="h-8 w-24" />
                    <LoadingSkeleton className="h-2 w-full" />
                    <LoadingSkeleton className="h-4 w-32" />
                  </div>
                )}
              </div>
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaUserClock size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Payroll Pending</p>
                {stats ? (
                  <>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">{stats.payrollPending}</h3>
                    <p className="text-yellow-500 text-sm mt-1 flex items-center">
                      <span>Requires approval</span>
                    </p>
                  </>
                ) : (
                  <div className="mt-2 space-y-2">
                    <LoadingSkeleton className="h-8 w-24" />
                    <LoadingSkeleton className="h-4 w-32" />
                  </div>
                )}
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
                <FaMoneyBillWave size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access - All Pages Included */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/employees" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-200 transition-all hover:shadow-md h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FaUserTie size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Employees</h3>
                    <p className="text-gray-500 text-sm">Manage employee records</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/attendance" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-green-200 transition-all hover:shadow-md h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <FaCalendarCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Attendance</h3>
                    <p className="text-gray-500 text-sm">Track employee attendance</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/payroll" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-yellow-200 transition-all hover:shadow-md h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">Payroll</h3>
                    <p className="text-gray-500 text-sm">Process employee payments</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/performance" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-200 transition-all hover:shadow-md h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <FaChartBar size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Performance</h3>
                    <p className="text-gray-500 text-sm">Employee performance reviews</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/documents" className="group">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-red-200 transition-all hover:shadow-md h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <FaFileAlt size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors">Documents</h3>
                    <p className="text-gray-500 text-sm">Company documents</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Department Distribution</h2>
            <Link href="/departments" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {stats ? (
              stats.departments.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-gray-500">{dept.headcount} employees</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(dept.headcount / stats.totalEmployees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <LoadingSkeleton className="h-4 w-24" />
                      <LoadingSkeleton className="h-4 w-12" />
                    </div>
                    <LoadingSkeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { 
                id: 1, 
                action: "New employee onboarded", 
                details: "Sarah Johnson joined as Marketing Specialist", 
                time: "10 minutes ago",
                icon: <FaUserTie className="text-blue-500" />,
                color: "bg-blue-100"
              },
              { 
                id: 2, 
                action: "Payroll processed", 
                details: "March payroll completed for 142 employees", 
                time: "2 hours ago",
                icon: <FaMoneyBillWave className="text-yellow-500" />,
                color: "bg-yellow-100"
              },
              { 
                id: 3, 
                action: "Performance review completed", 
                details: "Annual review for Michael Smith (Engineering)", 
                time: "5 hours ago",
                icon: <FaChartBar className="text-purple-500" />,
                color: "bg-purple-100"
              }
            ].map(activity => (
              <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`${activity.color} p-2 rounded-lg`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{activity.action}</h4>
                  <p className="text-gray-500 text-sm">{activity.details}</p>
                </div>
                <div className="text-gray-400 text-sm whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}