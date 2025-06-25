import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/staffs/all');
      setStaffs(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this staff?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/staffs/${id}`);
      fetchStaffs();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/admin/edit-staff/${id}`);
  };

  return (
    <div>
      <h3>Available Staffs</h3>
      {staffs.length === 0 ? (
        <p>No staff members found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff ID</th>
              <th>Course</th>
              <th>Experience</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.staffId}</td>
                <td>{staff.course}</td>
                <td>{staff.experience}</td>
                <td>{staff.availability}</td>
                <td>
                  <button onClick={() => handleEditClick(staff._id)}>Edit</button>
                  <button onClick={() => handleDeleteClick(staff._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStaff;
