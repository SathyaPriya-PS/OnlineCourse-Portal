// src/components/admin/AvailableCourses/AddCourse.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    duration: '',
    amount: '',
    jobAvailability: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/courses/add', formData);
      alert('Course added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Course</h3>
      <input type="text" name="title" placeholder="Course Title" onChange={handleChange} required />
      <input type="date" name="startDate" placeholder="Start Date" onChange={handleChange} required />
      <input type="date" name="endDate" placeholder="End Date" onChange={handleChange} required />
      <input type="text" name="duration" placeholder="Course Duration" onChange={handleChange} required />
      <input type="number" name="amount" placeholder="Course Amount" onChange={handleChange} required />
      <input type="text" name="jobAvailability" placeholder="Job Availability" onChange={handleChange} required />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
