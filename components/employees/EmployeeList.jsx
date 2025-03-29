export default function EmployeeList({ employees, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Department</th>
            <th className="py-2 px-4 text-center">Actions</th> {/* New Column for Delete */}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="py-2 px-4">{employee.first_name} {employee.last_name}</td>
                <td className="py-2 px-4">{employee.email}</td>
                <td className="py-2 px-4">{employee.department}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
