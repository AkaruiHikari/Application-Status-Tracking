import React from 'react'
import Logo from '../assets/Images/Logo.png'
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // or "/"
  };

  return (
    <header className='bg-purple-700 text-white px-7 py-2 flex justify-between items-center '>
      <div className="flex items-center gap-2">
        <img className='h-15 w-auto' src={Logo} alt="Logo" />
        <span className="font-bold text-sm uppercase">Tom Yang University</span>
      </div>

      <div className="flex items-center gap-4 text-lg">
        <Link to="/profile">
          <FaUser className="cursor-pointer" />
        </Link>
        <button onClick={handleLogout}>
          <FaSignOutAlt className="cursor-pointer" title="Logout" />
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
