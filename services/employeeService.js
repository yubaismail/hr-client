// services/employeeService.js
import api from '../utils/api';

const API_BASE = "/api/v1/employees"; // Matches backend API path

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
});

const employeeService = {
  getAllEmployees: async () => {
    try {
      const response = await api.get(API_BASE, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employees' };
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`${API_BASE}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee' };
    }
  },

  createEmployee: async (employeeData) => {
    try {
      const response = await api.post(API_BASE, employeeData, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create employee' };
    }
  },

  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`${API_BASE}/${id}`, employeeData, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update employee' };
    }
  },

  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`${API_BASE}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete employee' };
    }
  }
};

export default employeeService;
