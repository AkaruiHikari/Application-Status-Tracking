import React from 'react'
import Logo from '../assets/Images/Logo.png'
import { FaPhone, FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';





function Header() {
  return (
    <header className='bg-purple-700 text-white px-7 py-2 flex justify-between items-center '>
        <div className="flex items-center gap-2">
            <img className='h-15 w-auto' src={Logo} alt="" />

            <span className="font-bold text-sm uppercase">Tom Yang University</span>

        </div>

        <div className="flex items-center gap-4 text-lg">
            <Link to="/contact">
                <FaPhone className="cursor-pointer" />
            </Link>
            <Link to="/notification">
                <FaBell className="cursor-pointer" />
            </Link>
            <Link to="/profile">
                <FaUser className="cursor-pointer" />
            </Link>
        </div>
    </header>
  )
}

export default Header