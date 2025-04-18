import React from 'react'
import AdminSideBar from '../Components/AdminSideBar'
import ApplicantList from '../Components/ApplicantList'
import AdminHeader from '../Components/AdminHeader'

export default function AdminSide() {
  return (
    <div className="flex flex-col h-screen">
    <AdminHeader />
    <div className="flex flex-1 overflow-hidden">
        <AdminSideBar />
        {/* Main content area */}   
      <main className="flex-1 overflow-auto bg-gray-50 p-4">
        <ApplicantList />
      </main>
    </div>
  </div>
  )
}

