import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ApplicantList() {
  // State for search input
  const [search, setSearch] = useState('');
  // State to show/hide status filter
  const [showFilter, setShowFilter] = useState(false);
  // State to hold selected status filters
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  // State to show/hide Add Applicant modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Main applicant list 
  const [applicants, setApplicants] = useState([]);

  // State to hold input values for new applicant form
  const [newApplicant, setNewApplicant] = useState({
    first_name: '',
    last_name: '',
    status: 'Pending',
  });  

  useEffect(() => {
    fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map(a => ({
          id: a.id,
          name: `${a.first_name} ${a.last_name}`, // ✅ Combine first and last name
          status: a.status,
        }));
        setApplicants(formatted);
      })
      .catch((error) => console.error("Error fetching applicants:", error));
  }, []);
  

  // List of available statuses for filter and dropdown
  const statusOptions = ['Pending', 'Rejected', 'Accepted'];

  // Compute filtered applicant list based on search and selected statuses
  const filteredApplicants = useMemo(() => {
    return applicants.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(a.status);
      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatuses, applicants]);

  // Add new applicant to the state list and close modal
  const handleAddApplicant = () => {
    fetch("http://localhost/Application-Status-Tracking/Tracker/php/add_applicant.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newApplicant)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Applicant added successfully.");
          setShowAddModal(false);
          setNewApplicant({ first_name: '', last_name: '', status: 'Pending'});
  
          // Reload updated list
          fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
            .then((response) => response.json())
            .then((data) => {
              const formatted = data.map(a => ({
                id: a.id,
                name: `${a.first_name} ${a.last_name}`,
                status: a.status,
              }));
              setApplicants(formatted);
            });
        } else {
          alert("Failed to add applicant.");
        }
      })
      .catch((error) => console.error("Error adding applicant:", error));
  };
  
  
  const handleUpdateStatus = (id, newStatus) => {
    fetch("http://localhost/Application-Status-Tracking/Tracker/php/update_status.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status: newStatus })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Status updated.");
          // Refresh applicant list
          fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
            .then((response) => response.json())
            .then((data) => {
              const formatted = data.map(a => ({
                id: a.id,
                name: a.applicant_name,
                college: a.college,
                schoolYear: a.school_year,
                program: a.program,
                status: a.status,
              }));
              setApplicants(formatted);
            });
        } else {
          alert("Failed to update status.");
        }
      })
      .catch((error) => console.error("Error updating status:", error));
  };
  

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Applicant List</h1>

      {/* Search Bar and Buttons */}
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
          {/* Open Add Modal */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200"
          >
            <BsThreeDotsVertical className="mr-2" /> Action
          </button>

          {/* Toggle Filter Panel */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200"
          >
            <IoIosArrowDown className="mr-1" /> Filter
          </button>
        </div>
      </div>

      {/* Filter Panel by Status */}
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
                      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
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

      {/* Table Displaying Applicants */}
      <div className="overflow-x-auto border">
        <table className="table-auto w-full text-sm border border-black">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="border border-black px-2 py-1">No.</th>
              <th className="border border-black px-2 py-1">Applicants Name</th>
              <th className="border border-black px-2 py-1">College</th>
              <th className="border border-black px-2 py-1">School Year</th>
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
                <td className="border border-black px-2 py-1">{a.schoolYear}</td>
                <td className="border border-black px-2 py-1">{a.program}</td>
                <td className="border border-black px-2 py-1">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with total count and pagination UI */}
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

      {/* Modal Form to Add Applicant */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
            <h2 className="text-lg font-bold mb-4">Add New Applicant</h2>
            <div className="space-y-3">
            <input
              type="text"
              placeholder="First Name"
              value={newApplicant.first_name}
              onChange={(e) => setNewApplicant({ ...newApplicant, first_name: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={newApplicant.last_name}
              onChange={(e) => setNewApplicant({ ...newApplicant, last_name: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />

            <select
              value={newApplicant.status}
              onChange={(e) => setNewApplicant({ ...newApplicant, status: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleAddApplicant} className="px-3 py-2 bg-purple-600 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
