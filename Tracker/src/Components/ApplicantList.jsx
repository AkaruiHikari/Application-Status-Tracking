import { useState, useMemo, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';

export default function ApplicantList() {
  const currentYear = new Date().getFullYear();
  const autoSchoolYear = `${currentYear}-${currentYear + 4}`;

  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('');
  const [selectedFirstCourse, setSelectedFirstCourse] = useState('');
  const [selectedSecondCourse, setSelectedSecondCourse] = useState('');
  const [sortByName, setSortByName] = useState(''); // 'asc' or 'desc'
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusOptions] = useState([
    "Submitted",
    "Under Review",
    "Reviewed",
    "Approved",
    "Rejected",
    "Cancelled",
    "Scheduled",
    "Interview Completed"
  ]);
  const [applicants, setApplicants] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [newStatus, setNewStatus] = useState('Pending');
  const [notifySubject, setNotifySubject] = useState('');
  const [notifyStatus, setNotifyStatus] = useState('Pending');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentApplicant, setAppointmentApplicant] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    notes: '',
    type: 'Interview'
  });

  const handleDeleteApplicant = (id) => {
  if (!window.confirm("Are you sure you want to delete this applicant?")) return;

  fetch("http://localhost/Application-Status-Tracking/Tracker/php/delete_applicant.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Applicant deleted.");
        setApplicants(applicants.filter(a => a.id !== id));
      } else {
        alert("Failed to delete applicant.");
      }
    })
    .catch(error => console.error("Delete error:", error));
};


  const openAppointmentModal = (applicant) => {
    setAppointmentApplicant(applicant);
    setShowAppointmentModal(true);
  };

  const handleScheduleAppointment = (e) => {
    e.preventDefault();

    const { date, startTime, endTime, location, notes, type } = appointmentData;
    const email = appointmentApplicant?.email_address;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const subject = `${type} on ${formattedDate}`;
    const message = `Your appointed date and time is: ${date} from ${startTime} to ${endTime} at ${location}. ${notes}`;
    const status = "Scheduled";

    // Send appointment notification
    fetch('http://localhost/Application-Status-Tracking/Tracker/php/send_notification.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: email,
        subject,
        status,
        message
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Appointment scheduled and notification sent.");
          setShowAppointmentModal(false);
          setAppointmentData({
            date: '',
            time: '',
            location: '',
            notes: '',
            type: 'Interview'
          });
        } else {
          alert("Failed to send appointment notification.");
        }
      })
      .catch((error) => {
        console.error("Error scheduling appointment:", error);
      });
  };



  const openNotifyModal = (email) => {
    setSelectedEmail(email);
    setShowNotifyModal(true);
  };

  const courseOptions = [
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Electrical Engineering",
    "Bachelor of Science in Business Administration",
    "Bachelor of Arts in Psychology",
    "Bachelor of Arts in Political Science",
    "Bachelor of Arts in Communication",
  ];

  const [newApplicant, setNewApplicant] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    extension_name: 'N/A',
    birthday: '',
    country_of_birth: '',
    age: '',
    sex: 'Male',
    blood_type: 'A+',
    civil_status: 'Single',
    religious_affiliation: '',
    citizenship: '',
    number_of_siblings: '',
    email_address: '',
    contact_number: '',
    first_course: '',
    second_course: '',
    school_year: autoSchoolYear,
    status: 'Pending',
  });

  useEffect(() => {
    fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
      .then((response) => response.json())
      .then((data) => {
        const formatted = data.map(a => ({
          id: a.id,
          name: `${a.first_name} ${a.last_name}`,
          first_course: a.first_course,
          second_course: a.second_course,
          school_year: a.school_year,
          status: a.status,
          email_address: a.email_address
        }));
        setApplicants(formatted);
      })
      .catch((error) => console.error("Error fetching applicants:", error));
  }, []);

  const handleSendNotification = (e) => {
    e.preventDefault();
    fetch('http://localhost/Application-Status-Tracking/Tracker/php/send_notification.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: selectedEmail,
        subject: notifySubject,
        status: notifyStatus,
        message: notifyMessage
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Notification sent successfully!');
          setShowNotifyModal(false);
          setNotifyMessage('');
        } else {
          alert('Failed to send notification.');
        }
      })
      .catch(error => console.error('Error sending notification:', error));
  };

  const filteredApplicants = useMemo(() => {
    return applicants.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(a.status);
      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatuses, applicants]);

  const handleAddApplicant = (e) => {
    if (e) e.preventDefault();
    if (!newApplicant.first_name || !newApplicant.last_name || !newApplicant.status) {
      alert("Please fill out First Name, Last Name, and select Status.");
      return;
    }

    fetch("http://localhost/Application-Status-Tracking/Tracker/php/add_applicant.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApplicant)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Applicant added successfully.");
          setShowAddModal(false);
          setNewApplicant({
            first_name: '',
            middle_name: '',
            last_name: '',
            extension_name: 'N/A',
            birthday: '',
            country_of_birth: '',
            age: '',
            sex: 'Male',
            blood_type: 'A+',
            civil_status: 'Single',
            religious_affiliation: '',
            citizenship: '',
            number_of_siblings: '',
            email_address: '',
            contact_number: '',
            first_course: '',
            second_course: '',
            school_year: autoSchoolYear,
            status: 'Pending',
          });

          // Reload updated list
          fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
            .then((response) => response.json())
            .then((data) => {
              const formatted = data.map(a => ({
                id: a.id,
                name: `${a.first_name} ${a.last_name}`,
                first_course: a.first_course,
                second_course: a.second_course,
                school_year: a.school_year,
                status: a.status,
                email_address: a.email_address
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Status updated.");
          fetch("http://localhost/Application-Status-Tracking/Tracker/php/get_applicants.php")
            .then((response) => response.json())
            .then((data) => {
              const formatted = data.map(a => ({
                id: a.id,
                name: `${a.first_name} ${a.last_name}`,
                first_course: a.first_course,
                second_course: a.second_course,
                school_year: a.school_year,
                status: a.status,
                email_address: a.email_address
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
            <FaUserPlus className="mr-2" />Add Applicant
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
          {/* Add these inside your filter panel after Filter by Status: */}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <select
              value={selectedSchoolYear}
              onChange={(e) => setSelectedSchoolYear(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">All School Years</option>
              {[...new Set(applicants.map(a => a.school_year))].map((year, idx) => (
                <option key={idx} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedFirstCourse}
              onChange={(e) => setSelectedFirstCourse(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">All First Courses</option>
              {courseOptions.map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
              ))}
            </select>

            <select
              value={selectedSecondCourse}
              onChange={(e) => setSelectedSecondCourse(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">All Second Courses</option>
              {courseOptions.map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
              ))}
            </select>

            <select
              value={sortByName}
              onChange={(e) => setSortByName(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Name: Default</option>
              <option value="asc">Name: A-Z</option>
              <option value="desc">Name: Z-A</option>
            </select>
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
              <th className="border border-black px-2 py-1">First Course</th>
              <th className="border border-black px-2 py-1">Second Course</th>
              <th className="border border-black px-2 py-1">School Year</th>
              <th className="border border-black px-2 py-1">Status</th>
              <th className="border border-black px-2 py-1">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((a, index) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="border border-black px-2 py-1">{index + 1}</td>
                <td className="border border-black px-2 py-1">{a.name}</td>
                <td className="border border-black px-2 py-1">{a.first_course}</td>
                <td className="border border-black px-2 py-1">{a.second_course}</td>
                <td className="border border-black px-2 py-1">{a.school_year}</td>
                <td className="border border-black px-2 py-1">{a.status}</td>
                <td className="border border-black px-2 py-1 w-[120px]">
                
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => openNotifyModal(a.email_address)}
                      className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                    >
                      Notify
                    </button>
                    <button
                      onClick={() => {
                        setSelectedApplicantId(a.id);
                        setNewStatus(a.status);
                        setShowUpdateModal(true);
                      }}
                      className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                      Update
                    </button>
                   <button
                      onClick={() => openAppointmentModal(a)}
                      className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                      Schedule
                    </button>
                    <button
                      onClick={() => handleDeleteApplicant(a.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
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
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl">
              <h2 className="text-lg font-bold mb-4">Add New Applicant</h2>
              <form onSubmit={handleAddApplicant}>
              <div className="space-y-3 max-h-[80vh] overflow-y-auto">

                <input type="text" placeholder="First Name" value={newApplicant.first_name}
                  onChange={(e) => setNewApplicant({ ...newApplicant, first_name: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="text" placeholder="Middle Name" value={newApplicant.middle_name}
                  onChange={(e) => setNewApplicant({ ...newApplicant, middle_name: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="text" placeholder="Last Name" value={newApplicant.last_name}
                  onChange={(e) => setNewApplicant({ ...newApplicant, last_name: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <select value={newApplicant.extension_name}
                  onChange={(e) => setNewApplicant({ ...newApplicant, extension_name: e.target.value })}
                  className="w-full border px-3 py-2 rounded">
                  <option value="N/A">No Extension</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                </select>

                <input type="date" placeholder="Birthday" value={newApplicant.birthday}
                  onChange={(e) => setNewApplicant({ ...newApplicant, birthday: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="text" placeholder="Country of Birth" value={newApplicant.country_of_birth}
                  onChange={(e) => setNewApplicant({ ...newApplicant, country_of_birth: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="number" placeholder="Age" value={newApplicant.age}
                  onChange={(e) => setNewApplicant({ ...newApplicant, age: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <select value={newApplicant.sex}
                  onChange={(e) => setNewApplicant({ ...newApplicant, sex: e.target.value })}
                  className="w-full border px-3 py-2 rounded">
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <select value={newApplicant.blood_type}
                  onChange={(e) => setNewApplicant({ ...newApplicant, blood_type: e.target.value })}
                  className="w-full border px-3 py-2 rounded">
                  <option value="">Blood Type</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                </select>

                <select value={newApplicant.civil_status}
                  onChange={(e) => setNewApplicant({ ...newApplicant, civil_status: e.target.value })}
                  className="w-full border px-3 py-2 rounded">
                  <option value="">Civil Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>

                <input type="text" placeholder="Religious Affiliation" value={newApplicant.religious_affiliation}
                  onChange={(e) => setNewApplicant({ ...newApplicant, religious_affiliation: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="text" placeholder="Citizenship" value={newApplicant.citizenship}
                  onChange={(e) => setNewApplicant({ ...newApplicant, citizenship: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="number" placeholder="Number of Siblings" value={newApplicant.number_of_siblings}
                  onChange={(e) => setNewApplicant({ ...newApplicant, number_of_siblings: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="text" placeholder="Email Address" value={newApplicant.email_address}
                  onChange={(e) => setNewApplicant({ ...newApplicant, email_address: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />

                <input type="text" placeholder="Contact Number" value={newApplicant.contact_number}
                  onChange={(e) => setNewApplicant({ ...newApplicant, contact_number: e.target.value })}
                  className="w-full border px-3 py-2 rounded" />
                  
                  <select
                    value={newApplicant.first_course}
                    onChange={(e) => setNewApplicant({ ...newApplicant, first_course: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select First Course</option>
                    {courseOptions.map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </select>

                  <select
                    value={newApplicant.second_course}
                    onChange={(e) => setNewApplicant({ ...newApplicant, second_course: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Select Second Course</option>
                    {courseOptions.map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </select>
                  
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
                <button type="submit" className="px-3 py-2 bg-purple-600 text-white rounded"> Add </button>
              </div>
              </form>
            </div>
          </div>
        )}

       {/* Notification Modal */}
        {showNotifyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl">
              <h2 className="text-lg font-bold mb-4">Send Notification</h2>
              <form onSubmit={handleSendNotification}>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={selectedEmail || ''}
                    disabled
                    className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={notifySubject}
                    onChange={(e) => setNotifySubject(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <select
                    value={notifyStatus}
                    onChange={(e) => setNotifyStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <textarea
                    placeholder="Type your message here..."
                    value={notifyMessage}
                    onChange={(e) => setNotifyMessage(e.target.value)}
                    className="w-full border px-3 py-2 rounded min-h-[120px]"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button onClick={() => setShowNotifyModal(false)} type="button" className="px-3 py-2 bg-gray-200 rounded">
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-2 bg-purple-600 text-white rounded">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Update Status Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
              <h2 className="text-lg font-bold mb-4">Update Applicant Status</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateStatus(selectedApplicantId, newStatus);
                setShowUpdateModal(false);
              }}>
                <div className="space-y-3">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button onClick={() => setShowUpdateModal(false)} type="button" className="px-3 py-2 bg-gray-200 rounded">
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl">
            <h2 className="text-lg font-bold mb-4">Schedule </h2>
            <form onSubmit={handleScheduleAppointment}>
              <div className="space-y-3">
                <input
                  type="text"
                  value={appointmentApplicant?.name || ''}
                  disabled
                  className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
                />
                <div>
                  <label className="block font-medium text-sm mb-1">Appointment Date</label>
                  <input
                    type="date"
                    value={appointmentData.date}
                    onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-sm mb-1">Time Range</label>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col flex-1">
                      <label className="text-xs text-gray-600 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={appointmentData.startTime}
                        onChange={(e) => setAppointmentData({ ...appointmentData, startTime: e.target.value })}
                        className="w-full border px-3 py-2 rounded"
                      />
                    </div>

                    <span className="text-sm font-semibold text-gray-700 pt-5">to</span>

                    <div className="flex flex-col flex-1">
                      <label className="text-xs text-gray-600 mb-1">End Time</label>
                      <input
                        type="time"
                        value={appointmentData.endTime}
                        onChange={(e) => setAppointmentData({ ...appointmentData, endTime: e.target.value })}
                        className="w-full border px-3 py-2 rounded"
                      />
                    </div>
                  </div>
                </div>

                <select
                  value={appointmentData.type}
                  onChange={(e) => setAppointmentData({ ...appointmentData, type: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Interview">Interview</option>
                  <option value="Test">Test</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={appointmentData.location}
                  onChange={(e) => setAppointmentData({ ...appointmentData, location: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  placeholder="Add any relevant notes..."
                  value={appointmentData.notes}
                  onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                  className="w-full border px-3 py-2 rounded min-h-[100px]"
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  type="button"
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-green-600 text-white rounded"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}
