import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import ApplicantList from '../Components/ApplicantList';

export default function Applicants() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <ApplicantList />
        </main>
      </div>
    </div>
  );
}