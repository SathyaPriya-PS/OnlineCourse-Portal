// src/components/admin/AvailableCourses/CoursesMain.js
import React, { useState } from 'react';
import ViewCourse from './ViewCourse';
import AddCourse from './AddCourse';
//import './CoursesMain.css';

const CoursesMain = () => {
  const [activeTab, setActiveTab] = useState('view');

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>

      <div className="sub-nav">
        <button onClick={() => setActiveTab('view')} className={activeTab === 'view' ? 'active' : ''}>View Courses</button>
        <button onClick={() => setActiveTab('add')} className={activeTab === 'add' ? 'active' : ''}>Add Course</button>
      </div>

      <div className="content">
        {activeTab === 'view' && <ViewCourse />}
        {activeTab === 'add' && <AddCourse />}
      </div>
    </div>
  );
};

export default CoursesMain;
