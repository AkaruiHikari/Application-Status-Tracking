import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import phoneIcon from "../assets/core/Phone-Icon.png";
import notificationIcon from "../assets/core/Notification-Icon.png";
import profileIcon from "../assets/core/Profile-Icon.png";
import menuIcon from "../assets/core/Menu-Icon.png";
import logoutIcon from "../assets/core/Logout-Icon.png";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-[linear-gradient(to_right,_#6a11cb,_#a044ff)] h-24 flex items-center justify-between pr-10 py-3 relative z-10">
      <div className="flex items-center">
        <button
          id="menu-button"
          className="sm:hidden ml-3 p-3 min-w-11 transition-colors duration-300 rounded-md hover:bg-[rgba(0,_0,_0,_0.3)]"
          onClick={toggleSidebar}
        >
          <img
            className="h-5 cursor-pointer filter brightness-0 invert"
            src={menuIcon}
            alt="Menu"
          />
        </button>
        <h1 className="max-sm:ml-3 ml-7 whitespace-nowrap text-ellipsis text-3xl text-white font-bold">
          Applicant Notifications
        </h1>
      </div>
      <div className="max-sm:hidden flex">
        <Link to="/notification">
          <img
            className="h-5 ml-5 cursor-pointer filter brightness-0 invert"
            src={notificationIcon}
            alt="Notifications"
          />
        </Link>
        <img
          className="h-5 ml-5 cursor-pointer filter brightness-0 invert"
          src={profileIcon}
          alt="Profile"
        />
        <img
          className="h-5 ml-5 cursor-pointer filter brightness-0 invert"
          src={logoutIcon}
          alt="Logout"
          onClick={() => setShowLogoutModal(true)}
          title="Logout"
        />
      </div>

      {showLogoutModal && (
        <div
          className="absolute top-28 right-10 z-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div className="backdrop-blur-md bg-white/70 p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 id="logout-title" className="text-xl font-semibold mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}