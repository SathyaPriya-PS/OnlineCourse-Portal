// ViewCourse.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    duration: '',
    amount: '',
    jobAvailability: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/courses/all');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/courses/delete/${id}`);
        fetchCourses(); // Refresh list
        alert('Course deleted!');
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course._id);
    setEditFormData({
      title: course.title,
      startDate: course.startDate?.substring(0, 10),
      endDate: course.endDate?.substring(0, 10),
      duration: course.duration,
      amount: course.amount,
      jobAvailability: course.jobAvailability,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/courses/update/${editingCourse}`, editFormData);
      alert('Course updated successfully!');
      setEditingCourse(null);
      fetchCourses(); // Refresh list
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h3>Available Courses</h3>

      {editingCourse ? (
        <form onSubmit={handleUpdate}>
          <h4>Edit Course</h4>
          <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} required />
          <input type="date" name="startDate" value={editFormData.startDate} onChange={handleEditChange} required />
          <input type="date" name="endDate" value={editFormData.endDate} onChange={handleEditChange} required />
          <input type="text" name="duration" value={editFormData.duration} onChange={handleEditChange} required />
          <input type="number" name="amount" value={editFormData.amount} onChange={handleEditChange} required />
          <input type="text" name="jobAvailability" value={editFormData.jobAvailability} onChange={handleEditChange} required />
          <button type="submit">Update Course</button>
          <button type="button" onClick={() => setEditingCourse(null)}>Cancel</button>
        </form>
      ) : (
        <>
          {courses.length === 0 ? (
            <p>No courses available.</p>
          ) : (
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Amount</th>
                  <th>Job Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.startDate?.substring(0, 10)}</td>
                    <td>{course.endDate?.substring(0, 10)}</td>
                    <td>{course.duration}</td>
                    <td>{course.amount}</td>
                    <td>{course.jobAvailability}</td>
                    <td>
                      <button onClick={() => handleEditClick(course)}>Edit</button>
                      <button onClick={() => handleDelete(course._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ViewCourse;
