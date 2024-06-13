import React, { useState } from 'react';
import { TextField, Button, MenuItem, Switch, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

const roles = ['Director', 'Manager', 'Supervisor'];

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    mobileNumber: '',
    status: true,
  });

  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const Userid = decodedToken.userid;

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const mobilePattern = /^[0-9]{10,12}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;

    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordPattern.test(formData.password)) {
      tempErrors.password = "Password must be 8-15 characters, include at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!formData.role) tempErrors.role = "Role is required";
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Email must be a valid Gmail address";
    }
    if (!formData.mobileNumber) {
      tempErrors.mobileNumber = "Mobile number is required";
    } else if (!mobilePattern.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = "Mobile number must be 10-12 digits";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3001/admin/users', {
          ...formData,
          status: formData.status ? 'active' : 'inactive',
          admin_id: Userid, // hardcoded admin_id
        });
        Swal.fire({
          title: " Success!",
          text: "User added successfully!",
          icon: "success"
        });
        setFormData({
          username: '',
          password: '',
          role: '',
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          mobileNumber: '',
          status: true,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Contact the technical administrator</a>'
        });
        console.error(error);
      }
    }
  };

  return (
    <form className="max-w-lg mx-auto p-4" onSubmit={handleSubmit}>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.role}
        helperText={errors.role}
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Mobile Number"
        name="mobileNumber"
        type="tel"
        value={formData.mobileNumber}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.mobileNumber}
        helperText={errors.mobileNumber}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.status}
            onChange={handleChange}
            name="status"
            color="primary"
          />
        }
        label={
          <Typography style={{ color: formData.status ? 'green' : 'red' }}>
            {formData.status ? 'Active' : 'Inactive'}
          </Typography>
        }
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Add User
      </Button>
    </form>
  );
};

export default UserForm;
