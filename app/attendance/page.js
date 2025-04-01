"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  generateEmployeeData, 
  generatePastEmployeeData,
  calculateAttendanceStats
} from "./employeeData";
import { FiCalendar, FiFilter, FiUserCheck, FiUserX, FiClock, FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { BsThreeDotsVertical, BsInfoCircle } from "react-icons/bs";

const AttendanceDashboard = () => {
  const [isClient, setIsClient] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    setIsLoading(true);
    
    const loadAttendanceData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const storedAttendance = JSON.parse(localStorage.getItem("alignhr-attendance") || "{}");
        
        if (!storedAttendance[selectedDate]) {
          let dummyData;
          
          if (selectedDate < today) {
            dummyData = generatePastEmployeeData(selectedDate);
          } else if (selectedDate > today) {
            dummyData = generateEmployeeData(selectedDate).map(emp => ({
              ...emp,
              status: "Pending"
            }));
          } else {
            dummyData = generateEmployeeData(selectedDate).map(emp => ({
              ...emp,
              status: "Pending",
              recordable: true
            }));
          }
            
          storedAttendance[selectedDate] = dummyData;
          localStorage.setItem("alignhr-attendance", JSON.stringify(storedAttendance));
          setAttendance(dummyData);
        } else {
          setAttendance(storedAttendance[selectedDate]);
        }
      } catch (error) {
        console.error("Error loading attendance data:", error);
        setAttendance([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttendanceData();
  }, [selectedDate, isClient]);

  useEffect(() => {
    if (attendance.length > 0) {
      setStats(calculateAttendanceStats(attendance));
    }
  }, [attendance]);

  useEffect(() => {
    if (!isClient || isLoading) return;
    
    const saveAttendanceData = () => {
      try {
        const storedAttendance = JSON.parse(localStorage.getItem("alignhr-attendance") || "{}");
        storedAttendance[selectedDate] = attendance;
        localStorage.setItem("alignhr-attendance", JSON.stringify(storedAttendance));
      } catch (error) {
        console.error("Error saving attendance data:", error);
      }
    };

    saveAttendanceData();
  }, [attendance, selectedDate, isClient, isLoading]);

  const filteredAttendance = useMemo(() => {
    return attendance.filter(emp => filter === "All" || emp.status === filter);
  }, [attendance, filter]);

  const getDateCategory = (date) => {
    const today = new Date().toISOString().split("T")[0];
    if (date < today) return "Past";
    if (date > today) return "Future";
    return "Today";
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const updateAttendanceStatus = (employeeId, newStatus) => {
    setAttendance(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { 
              ...emp, 
              status: newStatus,
              recordedAt: new Date().toISOString(),
              recordedBy: "Current User"
            } 
          : emp
      )
    );
  };

  if (!isClient) return null;

  const dateCategory = getDateCategory(selectedDate);
  const isToday = dateCategory === "Today";
  const isPast = dateCategory === "Past";
  const isFuture = dateCategory === "Future";

  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiUsers className="text-blue-600" />
              AlignHR Attendance
            </h1>
            <p className="text-gray-600 mt-1">Track and manage employee attendance records</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              v2.1
            </span>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100">
              <BsThreeDotsVertical />
            </button>
          </div>
        </header>

        {/* Controls Section */}
        <section className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="w-full md:w-auto">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">{formattedDate}</h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                  <FiCalendar className="text-gray-500 mr-2" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="bg-transparent focus:outline-none text-sm"
                  />
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                  <FiFilter className="text-gray-500 mr-2" />
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="bg-transparent focus:outline-none text-sm"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-1 rounded-lg text-sm ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Table
                  </button>
                  <button 
                    onClick={() => setViewMode("card")}
                    className={`px-3 py-1 rounded-lg text-sm ${viewMode === "card" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Cards
                  </button>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isToday ? "bg-green-100 text-green-800" : 
              isPast ? "bg-gray-100 text-gray-800" : 
              "bg-yellow-100 text-yellow-800"
            }`}>
              {dateCategory}
            </div>
          </div>
        </section>

        {/* Stats Summary */}
        {stats && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Employees</p>
                  <p className="text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FiUsers className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Present</p>
                  <p className="text-2xl font-bold mt-1">{stats.present} <span className="text-sm text-green-600">({stats.presentPercentage}%)</span></p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <FiUserCheck className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Absent</p>
                  <p className="text-2xl font-bold mt-1">{stats.absent} <span className="text-sm text-red-600">({stats.absentPercentage}%)</span></p>
                </div>
                <div className="bg-red-100 p-2 rounded-lg">
                  <FiUserX className="text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold mt-1">{stats.pending} <span className="text-sm text-yellow-600">({stats.pendingPercentage}%)</span></p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <FiClock className="text-yellow-600" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              {viewMode === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-sm text-gray-500">
                        <th className="px-6 py-3 font-medium">Employee</th>
                        <th className="px-6 py-3 font-medium text-center">Department</th>
                        <th className="px-6 py-3 font-medium text-center">Status</th>
                        {isToday && <th className="px-6 py-3 font-medium text-right">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAttendance.length > 0 ? (
                        filteredAttendance.map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-800">{employee.name}</div>
                              <div className="text-xs text-gray-500 mt-1">{employee.employeeId}</div>
                            </td>
                            <td className="px-6 py-4 text-center text-gray-600">{employee.department}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                employee.status === "Present" ? "bg-green-100 text-green-800" : 
                                employee.status === "Absent" ? "bg-red-100 text-red-800" : 
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {employee.status}
                                {employee.recordedAt && (
                                  <span className="ml-1 text-xs">
                                    {new Date(employee.recordedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </span>
                                )}
                              </span>
                            </td>
                            {isToday && (
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => updateAttendanceStatus(employee.id, "Present")}
                                    disabled={employee.status === "Present"}
                                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs ${
                                      employee.status === "Present" 
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                        : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                                  >
                                    <FiCheckCircle className="mr-1" /> Present
                                  </button>
                                  <button
                                    onClick={() => updateAttendanceStatus(employee.id, "Absent")}
                                    disabled={employee.status === "Absent"}
                                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs ${
                                      employee.status === "Absent" 
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                        : "bg-red-600 text-white hover:bg-red-700"
                                    }`}
                                  >
                                    <FiXCircle className="mr-1" /> Absent
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                            No attendance records found for the selected criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {filteredAttendance.length > 0 ? (
                    filteredAttendance.map((employee) => (
                      <div key={employee.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{employee.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{employee.department}</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.status === "Present" ? "bg-green-100 text-green-800" : 
                            employee.status === "Absent" ? "bg-red-100 text-red-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {employee.status}
                          </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Employee ID:</span>
                            <span className="text-gray-700">{employee.employeeId}</span>
                          </div>
                          {employee.recordedAt && (
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Recorded at:</span>
                              <span className="text-gray-700">
                                {new Date(employee.recordedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            </div>
                          )}
                        </div>
                        {isToday && (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                            <button
                              onClick={() => updateAttendanceStatus(employee.id, "Present")}
                              disabled={employee.status === "Present"}
                              className={`inline-flex items-center px-3 py-1 rounded-md text-xs ${
                                employee.status === "Present" 
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                  : "bg-green-600 text-white hover:bg-green-700"
                              }`}
                            >
                              <FiCheckCircle className="mr-1" /> Present
                            </button>
                            <button
                              onClick={() => updateAttendanceStatus(employee.id, "Absent")}
                              disabled={employee.status === "Absent"}
                              className={`inline-flex items-center px-3 py-1 rounded-md text-xs ${
                                employee.status === "Absent" 
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                  : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                            >
                              <FiXCircle className="mr-1" /> Absent
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                      No attendance records found for the selected criteria
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <div className="text-sm text-gray-500">
                Showing {filteredAttendance.length} of {attendance.length} employees
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <BsInfoCircle className="mr-1" />
                {isPast && "Past attendance records cannot be modified"}
                {isFuture && "Future attendance is set to 'Pending' until the actual date"}
                {isToday && "You can mark employees as present or absent"}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AttendanceDashboard;