import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OngoingCourses = () => {
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/registered-courses/registered/${userEmail}`);
        const today = new Date();

        const filtered = res.data.filter(course => {
          const start = new Date(course.startDate);
          const end = new Date(course.endDate);
          return start <= today && today <= end;
        });

        setOngoingCourses(filtered);
      } catch (err) {
        console.error('Error fetching ongoing courses:', err);
      }
    };

    if (userEmail) fetchCourses();
  }, [userEmail]);

  return (
    <div>
      <h2>Ongoing Courses</h2>
      {ongoingCourses.length === 0 ? (
        <p>No ongoing courses at the moment.</p>
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
            {ongoingCourses.map((course) => (
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

export default OngoingCourses;
