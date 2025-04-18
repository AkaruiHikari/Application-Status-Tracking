import { FaHome, FaUserFriends, FaGraduationCap, FaClipboardList, FaCalendarAlt, FaFileAlt, FaCheckCircle, FaUsersCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import React from 'react';


const menuItems = [
  { label: 'Home', icon: <FaHome />, path: '/' }
  
];

export default function Sidebar() {
  return (
    <aside className="w-50 h-screen bg-gradient-to-b from-purple-700 to-purple-400 text-white flex flex-col">
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 hover:bg-purple-600 transition 
            ${isActive ? 'bg-white text-purple-700 font-semibold' : ''}`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
