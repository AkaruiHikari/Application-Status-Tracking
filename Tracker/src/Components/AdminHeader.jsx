import React from "react";
import { Link, useNavigate } from "react-router-dom";
import phoneIcon from "../assets/core/Phone-Icon.png";
import notificationIcon from "../assets/core/Notification-Icon.png";
import profileIcon from "../assets/core/Profile-Icon.png";
import menuIcon from "../assets/core/Menu-Icon.png";
import logoutIcon from "../assets/core/Logout-Icon.png";

export default function AdminHeader({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-[linear-gradient(to_right,_#6a11cb,_#a044ff)] h-24 flex items-center justify-between pr-10 py-3">
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
        <h1 className="max-sm:ml-3 ml-7 whitespace-nowrap text-3xl text-white font-bold">
          Applicant Notifications
        </h1>
      </div>

      <div className="max-sm:hidden flex items-center gap-4">
        <Link to="/applicants">
          <img
            className="h-5 cursor-pointer filter brightness-0 invert"
            src={notificationIcon}
            alt="Notifications"
          />
        </Link>
        <img
          className="h-5 cursor-pointer filter brightness-0 invert"
          src={profileIcon}
          alt="Profile"
        />
        <img
          className="h-5 cursor-pointer filter brightness-0 invert"
          src={logoutIcon}
          alt="Logout"
          onClick={handleLogout}
          title="Logout"
        />
      </div>
    </header>
  );
}
