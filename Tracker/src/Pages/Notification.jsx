import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import NotificationPanel from '../Components/NotificationPanel';

function Notification() {
  const currentUserId = 1; // WALA PANG ACC SO UNG CURRENTA CC IS 1

  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Tom Yang University', status: 'Accepted', notification: 'HELLO' },
    { id: 2, name: 'Tom Yang University', status: 'Under Review', notification: '' },
    { id: 3, name: 'Schedule of Interview', status: 'Interview Scheduled', notification: '' },
    { id: 4, name: 'The missing document has been received', status: 'Under Review', notification: '' },
    { id: 5, name: 'Missing Documents Duedate', status: 'Overdue', notification: '' },
    { id: 6, name: 'Missing Document', status: 'Reviewed', notification: '' },
    { id: 7, name: 'Document On Review', status: 'Under Review', notification: '' },
    { id: 8, name: 'Documents Submitted', status: 'Pending Submission', notification: '' },
  ]);

  // Get only the current user's notifications
  const userNotifications = applicants.filter(a => a.id === currentUserId);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <NotificationPanel applicants={userNotifications} />
        </main>
      </div>
    </div>
  );
}

export default Notification;
