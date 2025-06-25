import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/courses/all')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleRegister = async (course) => {
  const userEmail = localStorage.getItem('userEmail'); // ✅ Must be set during login
  if (!userEmail) {
    alert("Please login first.");
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/user/registered-courses/register', {
      userEmail,
      courseId: course._id,
      title: course.title,
      startDate: course.startDate,
      endDate: course.endDate,
      duration: course.duration,
      amount: course.amount,
    });

    alert("Course registered successfully!");
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    alert("Registration failed: " + (error.response?.data?.msg || "Unknown error"));
  }
};



  return (
    <div>
      <h2>Available Courses</h2>
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
              <th>Action</th>
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
                  <button onClick={() => handleRegister(course)}>Register</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailableCourses;
