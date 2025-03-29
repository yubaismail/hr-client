export const loadEmployeeData = async () => {
  return [
    { id: 1, first_name: "John", last_name: "Doe", email: "john.doe@example.com", department: "IT", position: "Manager", salary: 50000 },
    { id: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", department: "HR", position: "Developer", salary: 40000 },
    { id: 3, first_name: "Alice", last_name: "Williams", email: "alice@example.com", department: "IT", position: "Software Engineer", salary: 60000 },
    { id: 4, first_name: "Bob", last_name: "Johnson", email: "bob@example.com", department: "HR", position: "HR Specialist", salary: 45000 },
    { id: 5, first_name: "Charlie", last_name: "Brown", email: "charlie@example.com", department: "Finance", position: "Accountant", salary: 55000 },
    // Adding more employees up to 100...
    ...Array.from({ length: 95 }, (_, i) => ({
      id: i + 6,
      first_name: `Employee${i + 6}`,
      last_name: `Last${i + 6}`,
      email: `employee${i + 6}@example.com`,
      department: ["IT", "HR", "Finance", "Marketing", "Sales"][Math.floor(Math.random() * 5)],
      position: ["Manager", "Developer", "Analyst", "HR Specialist", "Consultant"][Math.floor(Math.random() * 5)],
      salary: Math.floor(Math.random() * 40000) + 35000, // Salary between 35,000 - 75,000
    })),
  ];
};

export class Employee {
  constructor(id, first_name, last_name, email, department, position, salary) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.department = department;
    this.position = position;
    this.salary = salary;
  }
}
