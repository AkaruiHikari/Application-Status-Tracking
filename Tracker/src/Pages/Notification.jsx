import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import NotificationPanel from '../Components/NotificationPanel';

export default function Notification() {
  const email = localStorage.getItem("email"); // get email from localStorage

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <NotificationPanel email={email} /> {/* pass email properly */}
        </main>
      </div>
    </div>
  );
}
