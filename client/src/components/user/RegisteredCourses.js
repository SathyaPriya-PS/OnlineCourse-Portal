import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisteredCourses = () => {
  const [courses, setCourses] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
  console.log("Fetching courses for:", userEmail); // Check if it's correct
  axios.get(` http://localhost:5000/api/user/registered-courses/registered/${userEmail}`)
    .then((res) => {
      console.log("Fetched registered courses:", res.data); // See what it returns
      setCourses(res.data);
    })
    .catch((err) => console.error('Error fetching registered courses:', err));
}, [userEmail]);

  return (
    <div>
      <h2>Registered Courses</h2>
      {courses.length === 0 ? (
        <p>No courses registered yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Amount</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegisteredCourses;
