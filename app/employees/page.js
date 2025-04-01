"use client";

import { useState, useEffect } from "react";
import EmployeeList from "@/components/employees/EmployeeList";
import AddEmployeeModal from "@/components/employees/AddEmployeeModal";
import { Search, PlusCircle, Filter } from "lucide-react";
import { loadEmployeeData } from "@/lib/dataUtils";

export default function EmployeesPage() {
  // List of realistic names for employees
  const firstNames = ["Michael", "Sarah", "David", "Emma", "John", "Olivia", "James", "Sophia", "Robert", "Ava", 
                      "William", "Isabella", "Daniel", "Mia", "Richard", "Charlotte", "Thomas", "Amelia", "Matthew", 
                      "Harper", "Alexandra", "Benjamin", "Natalie", "Christopher", "Elizabeth", "Andrew", "Grace", 
                      "Joshua", "Lily", "Ryan", "Victoria", "Brandon", "Sofia", "Jacob", "Chloe", "Kevin", "Luna", 
                      "Justin", "Zoe", "Brian", "Hannah", "Jason", "Stella", "Tyler", "Scarlett"];
                      
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", 
                    "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", 
                    "Wright", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", 
                    "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres"];

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await loadEmployeeData();
      // Assign realistic names to all employees
      const processedEmployees = data.map((emp, index) => {
        // Generate a unique realistic name for each employee
        const randomFirstNameIndex = index % firstNames.length;
        const randomLastNameIndex = (index * 3) % lastNames.length; // Use different multiplication to avoid patterns
        
        const randomFirstName = firstNames[randomFirstNameIndex];
        const randomLastName = lastNames[randomLastNameIndex];
        
        return {
          ...emp,
          first_name: randomFirstName,
          last_name: randomLastName,
          name: `${randomFirstName} ${randomLastName}`,
          position: emp.position || generateRandomPosition(emp.department || "General"),
          hire_date: emp.hire_date || generateRandomHireDate(),
          email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@company.com`
        };
      });
      setEmployees(processedEmployees);
    }
    fetchData();
  }, []);

  // Generate random position titles based on department
  const generateRandomPosition = (department) => {
    const positions = {
      "Engineering": ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "QA Engineer", "Engineering Manager"],
      "Marketing": ["Marketing Specialist", "Content Strategist", "SEO Specialist", "Social Media Manager", "Marketing Director"],
      "Sales": ["Sales Representative", "Account Executive", "Sales Manager", "Business Development Manager"],
      "HR": ["HR Specialist", "Recruiter", "HR Manager", "Talent Acquisition Specialist"],
      "Finance": ["Financial Analyst", "Accountant", "Finance Manager", "Controller"],
      "Product": ["Product Manager", "Product Owner", "UX Designer", "UI Designer", "Product Director"],
      "Customer Support": ["Support Specialist", "Customer Success Manager", "Technical Support Engineer"],
      "General": ["Analyst", "Specialist", "Coordinator", "Manager", "Director"]
    };
    
    const deptPositions = positions[department] || positions["General"];
    return deptPositions[Math.floor(Math.random() * deptPositions.length)];
  };

  // Generate random hire date (between 1 and 10 years ago)
  const generateRandomHireDate = () => {
    const today = new Date();
    const years = Math.floor(Math.random() * 9) + 1; // 1-10 years
    const pastDate = new Date(today);
    pastDate.setFullYear(today.getFullYear() - years);
    
    // Randomize month and day
    pastDate.setMonth(Math.floor(Math.random() * 12));
    pastDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    return pastDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Function to delete an employee
  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
  };

  // Function to add a new employee
  const handleAddEmployee = (newEmployee) => {
    // Generate a random name for the new employee
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { 
        id: Date.now(),
        first_name: randomFirstName,
        last_name: randomLastName,
        name: `${randomFirstName} ${randomLastName}`,
        email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@company.com`,
        ...newEmployee 
      }
    ]);
    setShowAddModal(false);
  };

  const departments = Array.from(new Set(employees.map(emp => emp?.department).filter(Boolean)));

  const filteredEmployees = employees.filter(emp =>
    (emp?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (departmentFilter === "" || emp?.department === departmentFilter)
  );

  return (
    <section className="p-3 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        
        {/* Header Section - Responsive Stack on Mobile */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Employees</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Manage employee records, details, and performance from this section.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white flex items-center justify-center px-4 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
          >
            <PlusCircle size={20} className="mr-2" /> Add Employee
          </button>
        </div>

        {/* Search & Filter Section - Responsive Stack */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          {/* Mobile: Filter Toggle Button */}
          <button 
            className="sm:hidden flex items-center justify-center px-4 py-2 border rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          
          {/* Department Filter - Hidden on mobile until toggled */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={`${showFilters ? 'block' : 'hidden'} sm:block px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Employee List - Already uses the full width */}
        <div className="mt-6 overflow-x-auto">
          <EmployeeList employees={filteredEmployees} onDelete={handleDeleteEmployee} />
        </div>

        {/* Employee Count */}
        <div className="mt-4 text-gray-600 text-sm sm:text-base">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEmployee}
        />
      )}
    </section>
  );
}