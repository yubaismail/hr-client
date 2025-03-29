"use client";

import { useState } from "react";

export default function AddEmployeeModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
