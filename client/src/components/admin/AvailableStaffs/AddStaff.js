import React, { useState } from 'react';
import axios from 'axios';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: '',
    staffId: '',
    course: '',
    experience: '',
    availability: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const response = await axios.post('http://localhost:5000/api/admin/staffs/add', formData);
      alert('Course added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Staff</h3>
      <input type="text" name="name" placeholder="Staff Name" onChange={handleChange} required />
      <input type="text" name="staffId" placeholder="Staff ID" onChange={handleChange} required />
      <input type="text" name="course" placeholder="Course" onChange={handleChange} required />
      <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
      <input type="text" name="availability" placeholder="Availability" onChange={handleChange} required />
      <button type="submit">Add Staff</button>
    </form>
  );
};

export default AddStaff;
