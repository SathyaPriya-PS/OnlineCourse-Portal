import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompletedCourses = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/registered-courses/registered/${userEmail}`)
      .then((res) => {
        const today = new Date();

        const filtered = res.data.filter(course => {
          const end = new Date(course.endDate);
          return end < today;
        });

        setCompletedCourses(filtered);
      })
      .catch((err) => console.error('Error fetching completed courses:', err));
  }, [userEmail]);

  return (
    <div>
      <h2>Completed Courses</h2>
      {completedCourses.length === 0 ? (
        <p>No completed courses.</p>
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
            {completedCourses.map((course) => (
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

export default CompletedCourses;
