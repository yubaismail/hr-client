// services/employeeService.js
import api from '../utils/api';

const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await api.get('/employees');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employees' };
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee' };
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create employee' };
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update employee' };
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete employee' };
    }
  }
};

export default employeeService;