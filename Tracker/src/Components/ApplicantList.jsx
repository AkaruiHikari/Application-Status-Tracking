import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';




export default function ApplicantList() {
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);




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

  const statusOptions = [
    'Pending', 'Under Review', 'Missing', 'Rejected', 'Accepted', 'Overdue'
  ];

  
  const filteredApplicants = applicants.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(a.status);
    return matchesSearch && matchesStatus;
  });


  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Applicant List</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicants..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800">
            <FaSearch size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
        <button
            
            className="flex items-center border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200"
          >
            <BsThreeDotsVertical className="mr-2" /> Action
          </button>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200"
          >
            <IoIosArrowDown className="mr-1" /> Filter
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="mb-4 bg-white p-4 border rounded shadow-sm text-sm">
          <p className="font-semibold mb-2 text-gray-700">Filter by Status:</p>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((status) => (
              <label key={status} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() =>
                    setSelectedStatuses((prev) =>
                      prev.includes(status)
                        ? prev.filter((s) => s !== status)
                        : [...prev, status]
                    )
                  }
                  className="accent-purple-600"
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}

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
