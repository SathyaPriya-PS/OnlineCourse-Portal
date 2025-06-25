import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CoursesMain from './components/admin/AvailableCourses/CoursesMain';
import StaffMain from './components/admin/AvailableStaffs/StaffMain';
import ViewStaff from './components/admin/AvailableStaffs/ViewStaff';
import EditStaff from './components/admin/AvailableStaffs/EditStaff';
import Signup from './components/user/signup';
import Login from './components/user/Login';
import Dashboard from './components/user/Dashboard';
import RegisteredCourses from './components/user/RegisteredCourses';
import AvailableCourses from './components/user/AvailableCourses';
import OngoingCourses from './components/user/OngoingCourses';
import CompletedCourses from './components/user/CompletedCourses';
import PostFeedback from './components/user/PostFeedback';
import ViewFeedback from './components/user/ViewFeedback';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<CoursesMain />} />
        <Route path="/admin/staffs" element={<StaffMain />} />
        <Route path="/admin/edit-staff/:id" element={<EditStaff />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/viewstaff" element={<ViewStaff />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/registered-courses" element={<RegisteredCourses />} />
        <Route path="/user/available-courses" element={<AvailableCourses />} />
        <Route path="/user/ongoing-courses" element={<OngoingCourses />} />
        <Route path="/user/completed-courses" element={<CompletedCourses />} />
        <Route path="/user/post-feedback" element={<PostFeedback />} />
        <Route path="/user/view-feedback" element={<ViewFeedback />} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
