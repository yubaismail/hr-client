import React from "react";
import { XCircle } from "lucide-react";

export default function DeleteEmployeeModal({ isOpen, onClose, onDelete, employee }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete <span className="font-bold">{employee.first_name} {employee.last_name}</span>?
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(employee.id);
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
