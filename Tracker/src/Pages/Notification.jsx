

import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import NotificationPanel from '../Components/NotificationPanel';


export default function AdminSide() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const email = localStorage.getItem("email"); // get email from localStorage
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`sm:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <NotificationPanel email={email} /> {/* pass email properly */}
        </main>
      </div>
    </div>
  );
}

