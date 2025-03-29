"use client";

import { useState, useEffect } from "react";
import { loadEmployeeData } from "@/lib/dataUtils";
import { CheckCircle, XCircle, PlusCircle } from "lucide-react";

export default function PerformanceReviewPage() {
  const [employees, setEmployees] = useState([]);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await loadEmployeeData();
      setEmployees(Array.isArray(data) ? data : []);
    }
    fetchData();
  }, []);

  // Handle review submission
  const handleReviewChange = (id, field, value) => {
    setReviews((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">Performance Review</h1>
        <p className="text-gray-600 mt-2">Evaluate employee performance, track absences, and provide feedback.</p>

        {/* Employee Performance Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Employee</th>
                <th className="border p-3 text-left">Department</th>
                <th className="border p-3 text-center">Presence</th>
                <th className="border p-3 text-center">Absences</th>
                <th className="border p-3 text-center">Performance</th>
                <th className="border p-3 text-left">Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border">
                  <td className="p-3">{emp.first_name} {emp.last_name}</td>
                  <td className="p-3">{emp.department || "N/A"}</td>
                  <td className="p-3 text-center">
                    <CheckCircle size={20} className="text-green-500 inline" />
                  </td>
                  <td className="p-3 text-center">
                    <XCircle size={20} className="text-red-500 inline" />
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={reviews[emp.id]?.performance || "Good"}
                      onChange={(e) => handleReviewChange(emp.id, "performance", e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Needs Improvement">Needs Improvement</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      placeholder="Add comments..."
                      value={reviews[emp.id]?.comments || ""}
                      onChange={(e) => handleReviewChange(emp.id, "comments", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Review Button */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            <PlusCircle className="mr-2" size={20} />
            Submit Reviews
          </button>
        </div>
      </div>
    </section>
  );
}
