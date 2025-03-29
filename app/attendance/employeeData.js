// employeeData.js
import { faker } from '@faker-js/faker';

// Departments in the company
const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Product",
  "Customer Support",
  "Operations",
  "Research",
  "Legal"
];

// Status options for attendance
const STATUS_OPTIONS = ["Present", "Absent", "Pending"];

/**
 * Seed the random generator based on date to ensure consistent data
 * @param {string} dateString - ISO date string to use as seed
 * @returns {void}
 */
const seedRandomGenerator = (dateString) => {
  // Convert date to a numeric seed
  const dateSeed = new Date(dateString).getTime();
  faker.seed(dateSeed);
};

/**
 * Generate a random number of employees between min and max
 * @param {number} min - Minimum number of employees
 * @param {number} max - Maximum number of employees
 * @returns {number} - Random number of employees
 */
const getRandomEmployeeCount = (min = 80, max = 120) => {
  return Math.floor(min + faker.number.float() * (max - min));
};

/**
 * Generate an employee with random data
 * @param {number} id - Employee ID 
 * @param {string} date - Date for which to generate attendance
 * @returns {Object} - Employee data object
 */
const generateEmployee = (id, date) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    department: faker.helpers.arrayElement(DEPARTMENTS),
    status: faker.helpers.arrayElement(STATUS_OPTIONS),
    checkInTime: faker.date.recent({ refDate: new Date(date) }).toISOString(),
    avatar: faker.image.avatar(),
    employeeId: faker.string.alphanumeric(6).toUpperCase()
  };
};

/**
 * Generate employees for future or current dates
 * @param {string} date - ISO date string
 * @returns {Array} - Array of employee objects
 */
export const generateEmployeeData = (date) => {
  seedRandomGenerator(date);
  
  const employeeCount = getRandomEmployeeCount();
  const employees = [];
  
  for (let i = 0; i < employeeCount; i++) {
    employees.push(generateEmployee(i + 1, date));
  }
  
  return employees;
};

/**
 * Generate employees for past dates with consistent attendance patterns
 * @param {string} date - ISO date string for a past date
 * @returns {Array} - Array of employee objects with historically consistent attendance
 */
export const generatePastEmployeeData = (date) => {
  seedRandomGenerator(date);
  
  // For past dates, always generate 100 employees for consistency
  const employees = [];
  const dayOfWeek = new Date(date).getDay();
  const dateObj = new Date(date);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Generate 100 fixed employees
  for (let i = 0; i < 100; i++) {
    const employee = generateEmployee(i + 1, date);
    
    // Adjust attendance patterns based on historical patterns
    if (i < 70) {
      // 70% regular employees
      if (isWeekend) {
        // Weekends - mostly absent
        employee.status = faker.number.float() < 0.2 ? "Present" : "Absent";
      } else {
        // Weekdays - mostly present
        employee.status = faker.number.float() < 0.8 ? "Present" : "Absent";
      }
    } else if (i < 85) {
      // 15% shift workers - random pattern
      employee.status = faker.helpers.arrayElement(STATUS_OPTIONS);
    } else {
      // 15% remote workers - higher presence rate regardless of day
      employee.status = faker.number.float() < 0.9 ? "Present" : "Absent";
    }
    
    // Add recorded information for past attendance
    const recordHour = 8 + Math.floor(faker.number.float() * 2); // Between 8-10 AM
    const recordMin = Math.floor(faker.number.float() * 60);
    
    dateObj.setHours(recordHour, recordMin);
    
    employee.recordedAt = dateObj.toISOString();
    employee.recordedBy = faker.helpers.arrayElement([
      "System Admin",
      "HR Manager",
      "Department Head",
      "Self Check-in"
    ]);
    
    // No longer editable since it's in the past
    employee.editable = false;
    
    employees.push(employee);
  }
  
  return employees;
};

/**
 * Export a function to get employee by ID from any dataset
 * @param {Array} employees - Array of employee objects
 * @param {number} id - Employee ID to find
 * @returns {Object|null} - Employee object or null if not found
 */
export const getEmployeeById = (employees, id) => {
  return employees.find(emp => emp.id === id) || null;
};

/**
 * Calculate attendance statistics
 * @param {Array} employees - Array of employee objects
 * @returns {Object} - Object containing attendance statistics
 */
export const calculateAttendanceStats = (employees) => {
  const total = employees.length;
  const present = employees.filter(emp => emp.status === "Present").length;
  const absent = employees.filter(emp => emp.status === "Absent").length;
  const pending = employees.filter(emp => emp.status === "Pending").length;
  
  return {
    total,
    present,
    absent,
    pending,
    presentPercentage: total > 0 ? Math.round((present / total) * 100) : 0,
    absentPercentage: total > 0 ? Math.round((absent / total) * 100) : 0,
    pendingPercentage: total > 0 ? Math.round((pending / total) * 100) : 0
  };
};

/**
 * Get historical attendance summary for an employee
 * @param {string} employeeId - Employee ID to get history for
 * @param {Object} allAttendanceData - Object containing all attendance data keyed by date
 * @param {number} days - Number of days to look back
 * @returns {Object} - Object containing attendance history
 */
export const getEmployeeAttendanceHistory = (employeeId, allAttendanceData, days = 30) => {
  const history = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    
    if (allAttendanceData[dateString]) {
      const employeeRecord = allAttendanceData[dateString].find(emp => emp.employeeId === employeeId);
      
      if (employeeRecord) {
        history.push({
          date: dateString,
          status: employeeRecord.status,
          recordedAt: employeeRecord.recordedAt,
          recordedBy: employeeRecord.recordedBy
        });
      }
    }
  }
  
  return {
    employeeId,
    history,
    summary: {
      totalDays: history.length,
      presentDays: history.filter(day => day.status === "Present").length,
      absentDays: history.filter(day => day.status === "Absent").length,
      pendingDays: history.filter(day => day.status === "Pending").length
    }
  };
};