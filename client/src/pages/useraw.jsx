// RawMaterialPage.js
import React, { useState } from 'react';
import RawMaterialForm from '../components/Rawmaterialform';
import RawMaterialUpdate from '../components/Rawmaterialupdate';

const RawMaterialPage = () => {
  const [rawMaterialData, setRawMaterialData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleRawMaterialSubmit = (data) => {
    setRawMaterialData(data);
    setShowUpdateForm(true); // Show update form after submitting raw material data
    setSubmissionMessage('Raw material data submitted successfully!');
  };

  const handleUpdateSubmit = (data) => {
    // Mock backend submission
    console.log('Updating raw material usage:', data);
    setSubmissionMessage('Raw material usage updated successfully!');
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Raw Material Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Enter Raw Material Data</h2>
          {submissionMessage && <p className="text-green-600 mb-2">{submissionMessage}</p>}
          <RawMaterialForm onSubmit={handleRawMaterialSubmit} disabled={showUpdateForm} />
        </div>
        <div className={showUpdateForm ? 'block' : 'hidden'}>
          <h2 className="text-lg font-semibold mb-2">Update Raw Material Usage</h2>
          <RawMaterialUpdate onSubmit={handleUpdateSubmit} />
        </div>
      </div>
    </div>
  );
};

export default RawMaterialPage;







