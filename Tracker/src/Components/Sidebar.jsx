import React from "react";

import Logo from '../assets/core/TomYang-Logo.png';
import MenuIcon from '../assets/core/Menu-Icon.png';
import PhoneIcon from '../assets/core/Phone-Icon.png';
import NotificationIcon from '../assets/core/Notification-Icon.png';
import ProfileIcon from '../assets/core/Profile-Icon.png';
import DashboardIcon from '../assets/core/Dashboard-Icon.png';
import CriteriaIcon from '../assets/core/Criteria-Icon.png';
import ApplicationsIcon from '../assets/core/Applications-Icon.png';
import DocumentsIcon from '../assets/core/Documents-Icon.png';
import InterviewSchedulingIcon from '../assets/core/InterviewScheduling-Icon.png';
import TestSchedulingIcon from '../assets/core/TestScheduling-Icon.png';
import AdmissionResultIcon from '../assets/core/AdmissionResult-Icon.png';
import FAQIcon from '../assets/core/FAQ-Icon.png';

const menuItems = [
  { icon: DashboardIcon, label: "Applicant Dashboard" },
  { icon: CriteriaIcon, label: "Admission Criteria" },
  { icon: ApplicationsIcon, label: "Application Form" },
  { icon: DocumentsIcon, label: "Document Requirements" },
  { icon: InterviewSchedulingIcon, label: "Interview Schedule" },
  { icon: TestSchedulingIcon, label: "Admission Test" },
  { icon: AdmissionResultIcon, label: "Admission Result" },
  { icon: FAQIcon, label: "FAQs" },
  { icon: PhoneIcon, label: "Feedback & Survey", className: "sm:hidden" },
];

const bottomItems = [
  { icon: NotificationIcon, label: "Notifications" },
  { icon: ProfileIcon, label: "My Profile" },
];

export default function Sidebar() {
  return (
    <aside className="h-full max-sm:w-0 max-sm:px-0 w-20 bg-[linear-gradient(to_bottom,_#6a11cb,_#a044ff)] text-white pt-3 pb-4 flex flex-col gap-4 transition-[width] duration-300 ease-in-out overflow-auto sm:hover:w-72 sm:hover:items-start group">
      <nav className="flex flex-col w-full overflow-auto">
        <div className="text-white flex items-center whitespace-nowrap overflow-hidden transition-colors duration-300 rounded-md pt-3 pb-2 font-bold text-xl leading-[1.2]">
          <img className="ml-4 mr-2 w-12 h-auto max-w-none" src={Logo} alt="Logo" />
          <span
            name="sidebar-text"
            className="opacity-0 transition-[opacity,margin-left] duration-300 ease-in-out ml-0 sm:group-hover:opacity-100 sm:group-hover:ml-1"
          >
            TOM YANG<br />UNIVERSITY
          </span>
        </div>
        <div className="mt-3 overflow-y-auto overflow-x-hidden">
          {menuItems.map(({ icon, label, className = "" }, idx) => (
            <a
              key={idx}
              href="#"
              className={`mb-2 ml-4 mr-6 text-white flex items-center font-medium whitespace-nowrap overflow-hidden p-3 transition-colors duration-300 rounded-md hover:bg-[rgba(0,_0,_0,_0.3)] ${className}`}
            >
              <img
                className="w-5 transition-[margin] duration-300 ease-in-out sm:group-hover:mr-3 max-w-none"
                src={icon}
                alt={label}
              />
              <span
                name="sidebar-text"
                className="text-base opacity-0 transition-[opacity,margin-left] duration-300 ease-in-out ml-0 sm:group-hover:opacity-100 sm:group-hover:ml-1"
              >
                {label}
              </span>
            </a>
          ))}
        </div>
      </nav>
      <nav className="flex flex-col w-full mt-auto overflow-x-hidden">
        {bottomItems.map(({ icon, label }, idx) => (
          <a
            key={idx}
            href="#"
            className="sm:hidden mt-2 ml-4 mr-6 text-white flex items-center font-medium whitespace-nowrap overflow-hidden p-3 transition-colors duration-300 rounded-md hover:bg-[rgba(0,_0,_0,_0.3)]"
          >
            <img
              className="w-5 transition-[margin] duration-300 ease-in-out sm:group-hover:mr-3 max-w-none"
              src={icon}
              alt={label}
            />
            <span
              name="sidebar-text"
              className="text-base opacity-0 transition-[opacity,margin-left] duration-300 ease-in-out ml-0 sm:group-hover:opacity-100 sm:group-hover:ml-1"
            >
              {label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
