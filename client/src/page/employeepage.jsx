import React, { useState } from 'react';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([
    { id: '1', fullName: 'John Doe', role: 'Admin', status: 'Active' },
    { id: '2', fullName: 'Jane Smith', role: 'Manager', status: 'Inactive' },
    // Add more employees as needed
  ]);

  const toggleStatus = (id) => {
    setEmployees(employees.map(employee => {
      if (employee.id === id) {
        return { ...employee, status: employee.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return employee;
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">Employees</h1>
        

        {/* Add New Employee Button */}
        <div className="flex justify-end mb-8">
         <p className="text-lg font-semibold mb-4 text-center">To Add Employee</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4  ml-3rounded">
            Add
          </button>
        </div>

        {/* Employee Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 border border-gray-300">EMP.ID</th>
                <th className="py-3 px-6 border border-gray-300">Full Name</th>
                <th className="py-3 px-6 border border-gray-300">Role</th>
                <th className="py-3 px-6 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id} className="text-center">
                  <td className="py-3 px-6 border border-gray-300">{employee.id}</td>
                  <td className="py-3 px-6 border border-gray-300">{employee.fullName}</td>
                  <td className="py-3 px-6 border border-gray-300">{employee.role}</td>
                  <td className="py-3 px-6 border border-gray-300">
                    <button
                      onClick={() => toggleStatus(employee.id)}
                      className={`py-1 px-4 rounded w-24 ${
                        employee.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                      } text-white transition duration-300`}
                    >
                      {employee.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
