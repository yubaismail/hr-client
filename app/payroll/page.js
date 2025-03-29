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

  // Extended departments
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

  // Generate 100 dummy employees
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
      ).toString();
      
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
        salary,
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
    setSalary(employee.salary);
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
              salary,
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
      return parseInt(a.salary) - parseInt(b.salary);
    } else {
      return a.department.localeCompare(b.department);
    }
  });

  // Calculate total payroll
  const totalPayroll = payrollList.reduce(
    (sum, employee) => sum + parseInt(employee.salary),
    0
  );

  // Back to list from detail view
  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-blue-700">
        Payroll Management
      </h1>

      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
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
              Salary Amount
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleAddPayroll}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Employee
            </Button>
          )}
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="w-full sm:w-1/3">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Employees"
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="name">Name</option>
            <option value="salary">Salary</option>
            <option value="department">Department</option>
          </select>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left border border-gray-300">Name</th>
              <th className="p-2 text-left border border-gray-300">Salary</th>
              <th className="p-2 text-left border border-gray-300">Department</th>
              <th className="p-2 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="p-2 border border-gray-300">{employee.name}</td>
                <td className="p-2 border border-gray-300">KES {employee.salary}</td>
                <td className="p-2 border border-gray-300">{employee.department}</td>
                <td className="p-2 border border-gray-300">
                  <Button
                    onClick={() => handleViewEmployee(employee)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3 mr-2"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleEditEmployee(employee)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs py-1 px-3 mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-3"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-lg font-bold text-right">
        Total Payroll: ${totalPayroll.toLocaleString()}
      </div>

      {/* Employee Details View */}
      {isDetailView && selectedEmployee && (
        <div className="mt-6 p-4 border border-gray-300 bg-blue-100 rounded-md">
          <h3 className="text-xl font-semibold mb-3">
            Employee Details: {selectedEmployee.name}
          </h3>
          <div>
            <strong>Salary:</strong> ${selectedEmployee.salary}
          </div>
          <div>
            <strong>Department:</strong> {selectedEmployee.department}
          </div>
          <Button
            onClick={handleBackToList}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to List
          </Button>
        </div>
      )}
    </div>
  );
};

export default Payroll;
