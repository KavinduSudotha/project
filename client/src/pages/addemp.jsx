import React, { useState } from 'react';

const AddEmp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [telNo, setTelNo] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleTelNoChange = (e) => {
        setTelNo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the form submission
        console.log('Submitted:', firstName, lastName, telNo);
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={handleFirstNameChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                </label>
                <br />
                <label>
                    Tel No:
                    <input type="text" value={telNo} onChange={handleTelNoChange} />
                </label>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddEmp;