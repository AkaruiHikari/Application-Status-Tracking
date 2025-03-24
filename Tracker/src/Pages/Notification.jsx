import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import NotificationPanel from '../Components/NotificationPanel';

function Notification() {
  const currentUserName = "Andrei Rosca"; // ✨ The name you want to filter by

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map(a => ({
          id: a.id,
          name: a.applicant_name,
          status: a.status,
          notification: a.notification
        }));
        setApplicants(formatted);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const userNotifications = applicants.filter(a =>
    a.name === currentUserName && a.notification && a.notification.trim() !== ""
  );

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
