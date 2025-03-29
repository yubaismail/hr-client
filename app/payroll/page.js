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
  };

  // Handle editing employee details
  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);
    setEmployeeName(employee.name);
    setSalary(employee.salary);
    setDepartment(employee.department);
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Payroll Management
      </h1>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
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

          <div className="flex-1">
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

          <div className="flex-1">
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
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleAddPayroll}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Employee
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 mr-4">
            <Input
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="name">Name</option>
              <option value="salary">Salary</option>
              <option value="department">Department</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedEmployees.length > 0 ? (
                  sortedEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${parseInt(employee.salary).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">Summary</div>
          <div className="text-xl font-bold">
            Total Payroll: ${totalPayroll.toLocaleString()}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Total Employees: {payrollList.length}
        </div>
      </div>
    </div>
  );
};

export default Payroll;