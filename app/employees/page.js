"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import EmployeeList from "@/components/employees/EmployeeList";
import AddEmployeeModal from "@/components/employees/AddEmployeeModal";
import { Search, PlusCircle, Filter, X } from "lucide-react";
import { loadEmployeeData } from "@/lib/dataUtils";

const FIRST_NAMES = [
  "Michael", "Sarah", "David", "Emma", "John", "Olivia", "James", "Sophia", "Robert", "Ava",
  "William", "Isabella", "Daniel", "Mia", "Richard", "Charlotte", "Thomas", "Amelia", "Matthew",
  "Harper", "Alexandra", "Benjamin", "Natalie", "Christopher", "Elizabeth", "Andrew", "Grace",
  "Joshua", "Lily", "Ryan", "Victoria", "Brandon", "Sofia", "Jacob", "Chloe", "Kevin", "Luna",
  "Justin", "Zoe", "Brian", "Hannah", "Jason", "Stella", "Tyler", "Scarlett"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
  "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez",
  "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King",
  "Wright", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell",
  "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres"
];

const DEPARTMENT_POSITIONS = {
  "Engineering": ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "QA Engineer", "Engineering Manager"],
  "Marketing": ["Marketing Specialist", "Content Strategist", "SEO Specialist", "Social Media Manager", "Marketing Director"],
  "Sales": ["Sales Representative", "Account Executive", "Sales Manager", "Business Development Manager"],
  "HR": ["HR Specialist", "Recruiter", "HR Manager", "Talent Acquisition Specialist"],
  "Finance": ["Financial Analyst", "Accountant", "Finance Manager", "Controller"],
  "Product": ["Product Manager", "Product Owner", "UX Designer", "UI Designer", "Product Director"],
  "Customer Support": ["Support Specialist", "Customer Success Manager", "Technical Support Engineer"],
  "General": ["Analyst", "Specialist", "Coordinator", "Manager", "Director"]
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await loadEmployeeData();
        
        const processedEmployees = data.map((emp, index) => {
          const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
          const lastName = LAST_NAMES[(index * 3) % LAST_NAMES.length];
          const department = emp.department || "General";
          
          return {
            ...emp,
            id: emp.id || `emp-${Date.now()}-${index}`,
            first_name: firstName,
            last_name: lastName,
            name: `${firstName} ${lastName}`,
            position: emp.position || generateRandomPosition(department),
            hire_date: emp.hire_date || generateRandomHireDate(),
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
            department
          };
        });
        
        setEmployees(processedEmployees);
      } catch (err) {
        setError("Failed to load employee data. Please try again later.");
        console.error("Error loading employee data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const generateRandomPosition = (department) => {
    const positions = DEPARTMENT_POSITIONS[department] || DEPARTMENT_POSITIONS["General"];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  const generateRandomHireDate = () => {
    const today = new Date();
    const years = Math.floor(Math.random() * 9) + 1;
    const pastDate = new Date(today);
    pastDate.setFullYear(today.getFullYear() - years);
    pastDate.setMonth(Math.floor(Math.random() * 12));
    pastDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    return pastDate.toISOString().split('T')[0];
  };

  const handleDeleteEmployee = useCallback((id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }, []);

  const handleAddEmployee = useCallback((newEmployee) => {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    
    setEmployees(prev => [
      ...prev,
      { 
        id: `emp-${Date.now()}`,
        first_name: firstName,
        last_name: lastName,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
        hire_date: new Date().toISOString().split('T')[0],
        ...newEmployee 
      }
    ]);
    setShowAddModal(false);
  }, []);

  const departments = useMemo(() => 
    Array.from(new Set(employees.map(emp => emp?.department).filter(Boolean))).sort()
  , [employees]);

  const filteredEmployees = useMemo(() => 
    employees.filter(emp => {
      const matchesSearch = 
        emp?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.position?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        departmentFilter === "" || emp?.department === departmentFilter;
      
      return matchesSearch && matchesDepartment;
    })
  , [employees, searchTerm, departmentFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Comprehensive overview and administration of your workforce
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button
              className="sm:hidden flex items-center gap-1 text-sm text-gray-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide" : "Filters"}
            </button>
          </div>
          
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              {(searchTerm || departmentFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  <X className="h-5 w-5" />
                  Clear filters
                </button>
              )}
            </div>
            
            {departmentFilter && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filter:</span>
                <div className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {departmentFilter}
                  <button 
                    onClick={() => setDepartmentFilter("")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Employee Directory</h2>
                <p className="text-sm text-gray-600">
                  {filteredEmployees.length} {filteredEmployees.length === 1 ? "employee" : "employees"} found
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Total employees: {employees.length}
              </p>
            </div>
          </div>
          
          <div className="p-2 sm:p-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 w-full bg-gray-100 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : (
              <EmployeeList 
                employees={filteredEmployees} 
                onDelete={handleDeleteEmployee}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEmployee}
          departments={departments}
        />
      )}
    </div>
  );
}