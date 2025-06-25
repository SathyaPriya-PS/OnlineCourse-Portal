import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFeedback = () => {
  const [queries, setQueries] = useState([]);
  const userEmail = localStorage.getItem('userEmail'); // make sure this is stored on login

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/post-feedback/all');
        // Filter only this user's feedbacks
        const userFeedbacks = res.data.filter(q => q.userEmail === userEmail);
        setQueries(userFeedbacks);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };

    fetchQueries();
  }, [userEmail]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Feedback and Admin Responses</h2>
      {queries.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        queries.map((q) => (
          <div key={q._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
            <p><strong>College:</strong> {q.college}</p>
            <p><strong>Department:</strong> {q.department}</p>
            <p><strong>Your Query:</strong> {q.query}</p>
            <p><strong>Admin Response:</strong> {q.adminResponse || 'No response yet.'}</p>
            <p><small><strong>Posted on:</strong> {new Date(q.postedAt).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewFeedback;
