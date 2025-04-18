import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../assets/Images/Logo.png'


export default function LoginPage() {
  const [role, setRole] = useState('admin')

  const handleRoleChange = (newRole) => setRole(newRole)

  return (
    <div className="flex h-screen bg-gradient-to-b from-purple-800 to-purple-400">
      <div className="m-auto w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <img
            src={Logo}
            alt="University Logo"
            className="w-40 h-30 mb-2"
          />
          <h1 className="text-3xl font-bold text-center text-purple-700">
            TOM YANG UNIVERSITY
          </h1>
        </motion.div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium border ${role === 'admin' ? 'bg-purple-700 text-white' : 'text-purple-700 border-purple-700'}`}
            onClick={() => handleRoleChange('admin')}
          >
            Admin
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium border ${role === 'student' ? 'bg-purple-700 text-white' : 'text-purple-700 border-purple-700'}`}
            onClick={() => handleRoleChange('student')}
          >
            Student
          </button>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-purple-600 focus:border-purple-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition duration-200"
          >
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>
      </div>
    </div>
  )
}