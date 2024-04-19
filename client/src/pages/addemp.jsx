import React, { useState } from 'react';

const AddEmployeePage = () => {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    // Reset form fields after submission if needed
  };

  // Options for the role dropdown menu
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'director', label: 'Director' }
  ];

  // Function to clear all form fields
  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setDateOfBirth('');
    setPhoneNumber('');
    setIdNumber('');
    setRole('');
    setAddress('');
    setImage(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1">First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block mb-1">Date of Birth</label>
            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="idNumber" className="block mb-1">ID Number</label>
            <input type="text" id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-md px-3 py-2">
              <option value="">Select Role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2"></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block mb-1">Image</label>
            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={clearFields} className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Clear</button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Employee</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;
