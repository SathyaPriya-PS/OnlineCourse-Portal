import React from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import {  Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import CoursesMain from './AvailableCourses/CoursesMain';
import StaffMain from './AvailableStaffs/StaffMain';
import AdminQueries from './Queries/AdminQueries';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.clear(); // Optional: clear session storage
  toast.success("Logged out successfully!");
  navigate('/user/signup'); // Redirect to user sign-in page
};
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          
          <ul>
            <li><button onClick={() => navigate('/admin/dashboard')}>Dashboard</button></li>
            <li><button onClick={() => navigate('/admin/courses')}>Available Courses</button></li>
            <li><button onClick={() => navigate('/admin/staffs')}>Available Staffs</button></li>
            <li><button onClick={() => navigate('/admin/queries')}>Queries</button></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CoursesMain />} />
          <Route path="staffs" element={<StaffMain />} />
          <Route path="queries" element={<AdminQueries />} />




        </Routes>
        
      </main>
    </div>
  );
};

export default AdminDashboard;
