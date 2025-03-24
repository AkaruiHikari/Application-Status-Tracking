import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

function Notification() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="p-6 w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">NOTIFICATION</h2>
            <div className="bg-white shadow rounded p-6 text-center text-gray-500">
              No notifications available.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notification;
