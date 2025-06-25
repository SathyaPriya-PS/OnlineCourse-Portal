import React, { useState } from 'react';
import axios from 'axios';

const PostFeedback = () => {
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [query, setQuery] = useState('');
  const userEmail = localStorage.getItem('userEmail'); // Ensure userEmail is stored at login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/post-feedback/add/all', {
        userEmail,
        college,
        department,
        query
      });
      alert("Feedback submitted successfully!");
      setCollege('');
      setDepartment('');
      setQuery('');
    } catch (err) {
      alert("Failed to submit feedback.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Post Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="College Name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostFeedback;
