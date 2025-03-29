import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import employeeService from '../../services/employeeService';

const EmployeeForm = ({ employeeId = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    salary: ''
  });

  useEffect(() => {
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const data = await employeeService.getEmployeeById(employeeId);
      setFormData({
        name: data.name || '',
        position: data.position || '',
        salary: data.salary || ''
      });
    } catch (err) {
      setError('Failed to fetch employee data. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim() || !formData.position.trim()) {
      setError('Name and Position cannot be empty.');
      setLoading(false);
      return;
    }

    if (formData.salary < 0 || isNaN(formData.salary)) {
      setError('Salary must be a valid number and not negative.');
      setLoading(false);
      return;
    }

    try {
      if (employeeId) {
        await employeeService.updateEmployee(employeeId, formData);
      } else {
        await employeeService.createEmployee(formData);
      }
      router.replace('/dashboard/employees');
    } catch (err) {
      setError(err.message || 'Failed to save employee data. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading && employeeId) return <div className="p-4">Loading employee data...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{employeeId ? 'Edit Employee' : 'Add Employee'}</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {error}
          <button className="float-right text-red-900 font-bold" onClick={() => setError('')}>×</button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div>
          <label className="block font-medium">Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <div>
          <label className="block font-medium">Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
            required
            min="0"
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : (employeeId ? 'Update Employee' : 'Add Employee')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
