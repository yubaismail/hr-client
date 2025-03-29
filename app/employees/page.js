"use client";

import { useState, useEffect } from "react";
import EmployeeList from "@/components/employees/EmployeeList";
import AddEmployeeModal from "@/components/employees/AddEmployeeModal"; // ✅ Import modal
import { Search, PlusCircle } from "lucide-react";
import { loadEmployeeData } from "@/lib/dataUtils";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await loadEmployeeData();
      setEmployees(data);
    }
    fetchData();
  }, []);

  // Function to delete an employee
  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
  };

  // Function to add a new employee
  const handleAddEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { id: Date.now(), ...newEmployee } // ✅ Ensure unique ID
    ]);
    setShowAddModal(false); // ✅ Close modal after adding
  };

  const departments = Array.from(new Set(employees.map(emp => emp?.department).filter(Boolean)));

  const filteredEmployees = employees.filter(emp =>
    (emp?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (departmentFilter === "" || emp?.department === departmentFilter)
  );

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
            <p className="text-gray-600 mt-2">
              Manage employee records, details, and performance from this section.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <PlusCircle size={20} className="mr-2" /> Add Employee
          </button>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-6 flex space-x-4">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Employee List */}
        <div className="mt-6">
          <EmployeeList employees={filteredEmployees} onDelete={handleDeleteEmployee} />
        </div>

        {/* Employee Count */}
        <div className="mt-4 text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEmployee} // ✅ Corrected function
        />
      )}
    </section>
  );
}
