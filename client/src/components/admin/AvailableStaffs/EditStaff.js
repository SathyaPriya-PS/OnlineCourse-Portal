import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: '',
    staffId: '',
    course: '',
    experience: '',
    availability: ''
  });

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios.get(`http://localhost:5000/api/admin/staffs/${id}`);
      setStaff(res.data);
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/staffs/${id}`, staff);
      alert('Staff updated successfully!');
      navigate('/admin/staffs');
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <div>
      <h2>Edit Staff</h2>
      <form onSubmit={handleUpdate}>
        <input name="name" value={staff.name} onChange={handleChange} placeholder="Name" required />
        <input name="staffId" value={staff.staffId} onChange={handleChange} placeholder="Staff ID" required />
        <input name="course" value={staff.course} onChange={handleChange} placeholder="Course" required />
        <input name="experience" value={staff.experience} onChange={handleChange} placeholder="Experience" required />
        <input name="availability" value={staff.availability} onChange={handleChange} placeholder="Availability" required />
        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate('/admin/staffs')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStaff;
