import React, { useState } from 'react';
import ViewStaff from './ViewStaff';
import AddStaff from './AddStaff';

const StaffMain = () => {
  const [activeTab, setActiveTab] = useState('view');

  return (
    <div>
      <button onClick={() => setActiveTab('view')}>View Staff</button>
      <button onClick={() => setActiveTab('add')}>Add Staff</button>
      <hr />
      {activeTab === 'view' ? <ViewStaff /> : <AddStaff />}
    </div>
  );
};

export default StaffMain;
