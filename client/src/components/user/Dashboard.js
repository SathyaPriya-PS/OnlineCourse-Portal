import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Optional external CSS for styling

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/user/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>User Dashboard</h3>
        <nav>
          <ul>
            <li><button onClick={() => navigate('/user/registered-courses')}>Registered Courses</button></li>
            <li><button onClick={() => navigate('/user/available-courses')}>Available Courses</button></li>
            <li><button onClick={() => navigate('/user/ongoing-courses')}>Ongoing Courses</button></li>
            <li><button onClick={() => navigate('/user/completed-courses')}>Completed Courses</button></li>
            <li><button onClick={() => navigate('/user/post-feedback')}>Post Feedback</button></li>
            <li> <button onClick={() => navigate('/user/view-feedback')}>ViewFeedback</button></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <h2>Welcome to your Dashboard</h2>
        <p>Select a section from the left menu.</p>
        {/* Here, you can conditionally render components based on selected route */}
      </main>
    </div>
  );
};

export default Dashboard;
