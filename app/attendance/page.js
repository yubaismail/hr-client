"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  generateEmployeeData, 
  generatePastEmployeeData,
  calculateAttendanceStats
} from "./employeeData";

const Attendance = () => {
  const [isClient, setIsClient] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load attendance data when date changes
  useEffect(() => {
    if (!isClient) return;
    
    setIsLoading(true);
    
    try {
      const today = new Date().toISOString().split("T")[0];
      const storedAttendance = JSON.parse(localStorage.getItem("attendance") || "{}");
      
      if (!storedAttendance[selectedDate]) {
        let dummyData;
        
        if (selectedDate < today) {
          // Past date - generate historical data
          dummyData = generatePastEmployeeData(selectedDate);
        } else if (selectedDate > today) {
          // Future date - generate expected data with all pending status
          dummyData = generateEmployeeData(selectedDate).map(emp => ({
            ...emp,
            status: "Pending" // Override all statuses to pending for future dates
          }));
        } else {
          // Today - generate data with actionable status
          dummyData = generateEmployeeData(selectedDate).map(emp => ({
            ...emp,
            status: "Pending", // Start everyone as pending
            recordable: true // Flag to indicate attendance can be recorded
          }));
        }
          
        storedAttendance[selectedDate] = dummyData;
        localStorage.setItem("attendance", JSON.stringify(storedAttendance));
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
  }, [selectedDate, isClient]);

  // Calculate stats when attendance changes
  useEffect(() => {
    if (attendance.length > 0) {
      setStats(calculateAttendanceStats(attendance));
    }
  }, [attendance]);

  // Save attendance data when it changes
  useEffect(() => {
    if (!isClient || isLoading) return;
    
    try {
      const storedAttendance = JSON.parse(localStorage.getItem("attendance") || "{}");
      storedAttendance[selectedDate] = attendance;
      localStorage.setItem("attendance", JSON.stringify(storedAttendance));
    } catch (error) {
      console.error("Error saving attendance data:", error);
    }
  }, [attendance, selectedDate, isClient, isLoading]);

  // Filter attendance data based on selected filter
  const filteredAttendance = useMemo(() => {
    return attendance.filter(emp => filter === "All" || emp.status === filter);
  }, [attendance, filter]);

  // Get date category for display purposes
  const getDateCategory = (date) => {
    const today = new Date().toISOString().split("T")[0];
    if (date < today) return "Past";
    if (date > today) return "Future";
    return "Today";
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Handle attendance status change
  const updateAttendanceStatus = (employeeId, newStatus) => {
    setAttendance(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { 
              ...emp, 
              status: newStatus,
              recordedAt: new Date().toISOString(),
              recordedBy: "Current User" // In a real app, this would be the logged-in user
            } 
          : emp
      )
    );
  };

  // Return null during server-side rendering
  if (!isClient) return null;

  const dateCategory = getDateCategory(selectedDate);
  const isToday = dateCategory === "Today";
  const isPast = dateCategory === "Past";
  const isFuture = dateCategory === "Future";

  return (
    <div className="p-3 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-3 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Employee Attendance</h1>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="flex items-center">
            <label htmlFor="date-selector" className="mr-2 text-gray-700 w-16 sm:w-auto">Date:</label>
            <input
              id="date-selector"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none flex-grow"
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="status-filter" className="mr-2 text-gray-700 w-16 sm:w-auto">Status:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Attendance for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isToday ? "bg-green-100 text-green-800" : 
            isPast ? "bg-gray-100 text-gray-800" : 
            "bg-yellow-100 text-yellow-800"
          }`}>
            {dateCategory}
          </span>
        </div>
        
        {/* Stats summary */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-blue-700">Total</div>
              <div className="text-xl md:text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-green-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-green-700">Present</div>
              <div className="text-xl md:text-2xl font-bold">{stats.present} ({stats.presentPercentage}%)</div>
            </div>
            <div className="bg-red-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-red-700">Absent</div>
              <div className="text-xl md:text-2xl font-bold">{stats.absent} ({stats.absentPercentage}%)</div>
            </div>
            <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
              <div className="text-xs md:text-sm text-yellow-700">Pending</div>
              <div className="text-xl md:text-2xl font-bold">{stats.pending} ({stats.pendingPercentage}%)</div>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-pulse text-gray-500">Loading attendance data...</div>
          </div>
        ) : (
          <>
            {/* Header row - visible on tablet and larger screens */}
            <div className="hidden sm:flex bg-gray-50 rounded-md p-3 mb-4 text-sm font-medium text-gray-500">
              <span className="w-1/4">Employee Name</span>
              <span className="w-1/4 text-center">Department</span>
              <span className="w-1/4 text-center">Status</span>
              {isToday && <span className="w-1/4 text-right">Actions</span>}
            </div>
            
            {filteredAttendance.length > 0 ? (
              <ul className="space-y-2">
                {filteredAttendance.map((employee) => (
                  <li 
                    key={employee.id} 
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors gap-2 sm:gap-0"
                  >
                    {/* Mobile view includes labels */}
                    <div className="sm:w-1/4">
                      <div className="font-medium text-gray-800">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.employeeId}</div>
                    </div>
                    
                    <div className="flex justify-between sm:hidden border-b pb-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">Department:</span>
                      <span className="text-gray-600">{employee.department}</span>
                    </div>
                    
                    {/* Desktop view for department */}
                    <span className="hidden sm:block sm:w-1/4 text-center text-gray-600">{employee.department}</span>
                    
                    <div className="flex justify-between items-center sm:hidden border-b pb-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === "Present" ? "bg-green-100 text-green-800" : 
                        employee.status === "Absent" ? "bg-red-100 text-red-800" : 
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {employee.status}
                        {employee.recordedAt && (
                          <span className="block text-xs mt-1">
                            {new Date(employee.recordedAt).toLocaleTimeString()}
                          </span>
                        )}
                      </span>
                    </div>
                    
                    {/* Desktop view for status */}
                    <span className={`hidden sm:block sm:w-1/4 text-center px-2 py-1 rounded-full text-xs font-medium ${
                      employee.status === "Present" ? "bg-green-100 text-green-800" : 
                      employee.status === "Absent" ? "bg-red-100 text-red-800" : 
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {employee.status}
                      {employee.recordedAt && (
                        <span className="block text-xs mt-1">
                          {new Date(employee.recordedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </span>
                    
                    {isToday && (
                      <>
                        {/* Mobile view for actions */}
                        <div className="sm:hidden flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Actions:</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => updateAttendanceStatus(employee.id, "Present")}
                              disabled={employee.status === "Present"}
                              className={`px-2 py-1 text-xs rounded ${
                                employee.status === "Present" 
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => updateAttendanceStatus(employee.id, "Absent")}
                              disabled={employee.status === "Absent"}
                              className={`px-2 py-1 text-xs rounded ${
                                employee.status === "Absent" 
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                  : "bg-red-500 text-white hover:bg-red-600"
                              }`}
                            >
                              Absent
                            </button>
                          </div>
                        </div>
                        
                        {/* Desktop view for actions */}
                        <div className="hidden sm:block sm:w-1/4 text-right space-x-2">
                          <button
                            onClick={() => updateAttendanceStatus(employee.id, "Present")}
                            disabled={employee.status === "Present"}
                            className={`px-2 py-1 text-xs rounded ${
                              employee.status === "Present" 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => updateAttendanceStatus(employee.id, "Absent")}
                            disabled={employee.status === "Absent"}
                            className={`px-2 py-1 text-xs rounded ${
                              employee.status === "Absent" 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No attendance records available for the selected filter.
              </div>
            )}
            
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg text-xs md:text-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-2">
                <span className="text-gray-600">Showing {filteredAttendance.length} of {attendance.length} employees</span>
                {isPast && (
                  <span className="text-blue-600">
                    &#9432; Past attendance records cannot be modified
                  </span>
                )}
                {isFuture && (
                  <span className="text-yellow-600">
                    &#9432; Future attendance is set to "Pending" until the actual date
                  </span>
                )}
              </div>
              
              {isToday && (
                <div className="text-green-600">
                  &#9432; You can mark employees as present or absent using the action buttons
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Attendance;