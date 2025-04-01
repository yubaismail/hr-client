"use client";

import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Payroll = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [payrollList, setPayrollList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [editingId, setEditingId] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Extended departments with AlignHR branding
  const departments = [
    "Engineering",
    "Marketing",
    "HR",
    "Finance",
    "Sales",
    "IT",
    "Operations",
    "Customer Support",
    "Legal",
    "Product Management",
    "Research",
    "Design"
  ];

  // Format salary as KES
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Generate 100 dummy employees with AlignHR branding
  const generateDummyData = () => {
    const firstNames = [
      "John", "Sarah", "Michael", "Emily", "Robert", "Jessica", "David", "Jennifer", 
      "James", "Linda", "William", "Elizabeth", "Richard", "Susan", "Joseph", "Mary",
      "Thomas", "Karen", "Charles", "Nancy", "Daniel", "Lisa", "Matthew", "Sandra",
      "Anthony", "Ashley", "Mark", "Kimberly", "Donald", "Donna", "Steven", "Carol",
      "Paul", "Michelle", "Andrew", "Amanda", "Joshua", "Melissa", "Kenneth", "Deborah",
      "Kevin", "Stephanie", "Brian", "Rebecca", "George", "Laura", "Timothy", "Sharon",
      "Ronald", "Cynthia"
    ];
    
    const lastNames = [
      "Smith", "Johnson", "Chen", "Davis", "Wilson", "Brown", "Miller", "Garcia", 
      "Jones", "Williams", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Perez",
      "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson",
      "Moore", "Young", "Allen", "King", "Wright", "Scott", "Green", "Baker",
      "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter",
      "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart",
      "Flores", "Morris", "Nguyen", "Murphy", "Rivera", "Cook", "Rogers", "Morgan",
      "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard"
    ];
    
    const salarySpreads = {
      "Engineering": [75000, 120000],
      "Marketing": [65000, 110000],
      "HR": [60000, 95000],
      "Finance": [80000, 130000],
      "Sales": [70000, 140000],
      "IT": [78000, 125000],
      "Operations": [65000, 100000],
      "Customer Support": [55000, 85000],
      "Legal": [90000, 150000],
      "Product Management": [85000, 135000],
      "Research": [75000, 120000],
      "Design": [70000, 115000]
    };
    
    const employees = [];
    
    for (let i = 1; i <= 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const dept = departments[Math.floor(Math.random() * departments.length)];
      const salaryRange = salarySpreads[dept];
      const salary = Math.floor(
        Math.random() * (salaryRange[1] - salaryRange[0]) + salaryRange[0]
      );
      
      employees.push({
        id: i,
        name: `${firstName} ${lastName}`,
        salary: salary,
        department: dept
      });
    }
    
    return employees;
  };

  // Load dummy data on initial render
  useEffect(() => {
    setPayrollList(generateDummyData());
  }, []);

  // Handle adding new employee to payroll
  const handleAddPayroll = () => {
    if (employeeName.trim() && salary.trim()) {
      const newEmployee = {
        id: payrollList.length + 1,
        name: employeeName,
        salary: parseInt(salary),
        department,
      };
      setPayrollList([...payrollList, newEmployee]);
      setEmployeeName("");
      setSalary("");
    }
  };

  // Handle deleting employee from payroll
  const handleDeleteEmployee = (id) => {
    setPayrollList(payrollList.filter((employee) => employee.id !== id));
    if (selectedEmployee && selectedEmployee.id === id) {
      setIsDetailView(false);
      setSelectedEmployee(null);
    }
  };

  // Handle editing employee details
  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);
    setEmployeeName(employee.name);
    setSalary(employee.salary.toString());
    setDepartment(employee.department);
    setIsDetailView(false);
  };

  // Handle saving edited employee details
  const handleSaveEdit = () => {
    setPayrollList(
      payrollList.map((employee) =>
        employee.id === editingId
          ? {
              ...employee,
              name: employeeName,
              salary: parseInt(salary),
              department,
            }
          : employee
      )
    );
    setEditingId(null);
    setEmployeeName("");
    setSalary("");
    setDepartment("Engineering");
  };

  // View employee details (for mobile)
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailView(true);
  };

  // Filter employees based on search term
  const filteredEmployees = payrollList.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees based on sort selection
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "salary") {
      return a.salary - b.salary;
    } else if (sortBy === "department") {
      return a.department.localeCompare(b.department);
    } else if (sortBy === "department-desc") {
      return b.department.localeCompare(a.department);
    }
    return 0;
  });

  // Calculate total payroll
  const totalPayroll = payrollList.reduce(
    (sum, employee) => sum + employee.salary,
    0
  );

  // Back to list from detail view
  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mr-2">
          AlignHR Payroll
        </h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
          v2.0
        </span>
      </div>

      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">Employee Compensation Management</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-4">
          <div className="w-full sm:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Name
            </label>
            <Input
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter Employee Name"
              className="w-full"
            />
          </div>

          <div className="w-full sm:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Amount (KES)
            </label>
            <Input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter Salary Amount"
              type="number"
              className="w-full"
            />
          </div>

          <div className="w-full sm:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          {editingId ? (
            <Button
              onClick={handleSaveEdit}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleAddPayroll}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add Employee
            </Button>
          )}
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="w-full sm:w-1/2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees by name or department"
            className="w-full"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>

        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Name (A-Z)</option>
            <option value="salary">Salary (Low-High)</option>
            <option value="department">Department (A-Z)</option>
            <option value="department-desc">Department (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border border-gray-300">Employee</th>
              <th className="p-3 text-left border border-gray-300">Salary</th>
              <th className="p-3 text-left border border-gray-300">Department</th>
              <th className="p-3 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300">{employee.name}</td>
                <td className="p-3 border border-gray-300">{formatSalary(employee.salary)}</td>
                <td className="p-3 border border-gray-300">{employee.department}</td>
                <td className="p-3 border border-gray-300">
                  <div className="flex flex-wrap gap-1">
                    <Button
                      onClick={() => handleViewEmployee(employee)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleEditEmployee(employee)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs py-1 px-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-lg font-bold text-right bg-blue-50 p-3 rounded-lg">
        Total Monthly Payroll: <span className="text-blue-700">{formatSalary(totalPayroll)}</span>
      </div>

      {/* Employee Details View */}
      {isDetailView && selectedEmployee && (
        <div className="mt-6 p-4 border border-gray-300 bg-blue-50 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-blue-800">
              Employee Compensation Details
            </h3>
            <button 
              onClick={handleBackToList}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Employee:</span>
              <span>{selectedEmployee.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Monthly Salary:</span>
              <span className="font-semibold">{formatSalary(selectedEmployee.salary)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Department:</span>
              <span>{selectedEmployee.department}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Annual Salary:</span>
              <span className="font-semibold">{formatSalary(selectedEmployee.salary * 12)}</span>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              onClick={() => handleEditEmployee(selectedEmployee)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Edit Compensation
            </Button>
            <Button
              onClick={handleBackToList}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Back to List
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;