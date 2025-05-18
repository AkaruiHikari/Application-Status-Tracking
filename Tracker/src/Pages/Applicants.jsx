
import ApplicantList from '../Components/ApplicantList';
import AdminSideBar from '../Components/AdminSideBar';
import AdminHeader from '../Components/AdminHeader';
import React, { useState } from 'react';


export default function Applicants() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
   return (
     <div className="flex h-screen">
       {/* Sidebar */}
       <div className={`sm:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
         <AdminSideBar />
       </div>
 
       {/* Main content area */}
       <div className="flex-1 flex flex-col">
         <AdminHeader toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
         <main className="flex-1 overflow-auto bg-gray-50 p-4">
           <ApplicantList />
         </main>
       </div>
     </div>
   );
}