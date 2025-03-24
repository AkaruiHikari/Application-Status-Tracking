import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function ApplicantList() {
  const [search, setSearch] = useState('');

  // Placeholder for backend fetched data
  const applicants = [
    { id: 1, name: 'Carpio, Aleck Joy', college: 'College of Technology', program: 'Bachelor of Science in Information Technology', status: 'Pending' },
    { id: 2, name: 'Dela Cruz, Juan', college: 'College of Business Administration', program: 'Bachelor of Science in Business Administration', status: 'Pending' },
    { id: 3, name: 'Dela Cruz, Juan', college: 'College of Education', program: 'Bachelor of Secondary Education', status: 'Under Review' },
    { id: 4, name: 'Del Valle, Maxpein Zin', college: 'College of Education', program: 'Bachelor of Special Needs Education', status: 'Under Review' },
    { id: 5, name: 'Dondoyano, Carl Joshua', college: 'College of Technology', program: 'Bachelor of Science in Information Technology', status: 'Missing' },
    { id: 6, name: 'Ignacio, Mark Eleazar', college: 'College of Technology', program: 'Bachelor of Science in Information Technology', status: 'Rejected' },
    { id: 7, name: 'Ondevilla, Zadkiel', college: 'College of Technology', program: 'Bachelor of Science in Information Technology', status: 'Accepted' },
    { id: 8, name: 'Salinas, Julius Louise', college: 'College of Technology', program: 'Bachelor of Science in Information Technology', status: 'Accepted' },
    { id: 9, name: 'Quivolok, Apolthar', college: 'College of Business Administration', program: 'Bachelor of Science in Business Administration', status: 'Overdue' },
    
  ];

  const filteredApplicants = applicants.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Applicant List</h1>
      <div className="relative max-w-md w-full mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applicants..."
          className="w-full border border-gray-300 px-4 py-2 rounded-lg "
        />
        <button className="absolute right-5 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800">
          <FaSearch size={18} />
        </button>
      </div>

      <div className="overflow-x-auto border">
        <table className="table-auto w-full text-sm border border-black">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="border border-black px-2 py-1">No.</th>
              <th className="border border-black px-2 py-1">Applicants Name</th>
              <th className="border border-black px-2 py-1">College</th>
              <th className="border border-black px-2 py-1">Program</th>
              <th className="border border-black px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((a, index) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="border border-black px-2 py-1">{index + 1}</td>
                <td className="border border-black px-2 py-1">{a.name}</td>
                <td className="border border-black px-2 py-1">{a.college}</td>
                <td className="border border-black px-2 py-1">{a.program}</td>
                <td className="border border-black px-2 py-1">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between text-sm items-center">
        <div className="flex items-center">
          <span className="font-bold mr-1  border border-black px-2 py-1">{filteredApplicants.length}</span>
          <span className="font-bold">Records</span>
        </div>
      
        <div className="flex gap-2 items-center">
          <button className="px-2 py-1 bg-gray-200 border">&lt;</button>
          <span>Page</span>
          <button className="px-2 py-1 bg-gray-200 border">&gt;</button>
        </div>
      </div>
    </div>
  );
}
