import { useState, useEffect, useMemo } from 'react';
import { Trash2 } from 'lucide-react';

export default function NotificationPanel({ email }) {
  const [notifications, setNotifications] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [selected, setSelected] = useState([]);
  const [activeNotification, setActiveNotification] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost/Application-Status-Tracking/Tracker/php/get_notifications.php?email=${email}`)
      .then((res) => res.json())
      .then(setNotifications)
      .catch((err) => console.error('Fetch error:', err));
  }, [email]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      if (sortOption === 'oldest') return dateA - dateB;
      return dateB - dateA;
    });
  }, [notifications, sortOption]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the selected notifications?');
    if (!confirmDelete) return;

    try {
      const res = await fetch('http://localhost/Application-Status-Tracking/Tracker/php/delete_notifications.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected })
      });

      const result = await res.json();
      if (result.success) {
        setNotifications((prev) => prev.filter((n) => !selected.includes(n.notification_ID)));
        setSelected([]);
      } else {
        console.error('Server error:', result.error);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const formattedDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const relative = timeAgo(timestamp);
    return `${date.toLocaleString('en-US', options)} (${relative})`;
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="p-6 max-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">NOTIFICATIONS</h2>
      <div className="bg-white shadow rounded">
        <div className="flex justify-between items-center px-4 py-2 border-b relative">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Inbox</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2">
              {notifications.length}
            </span>
          </div>
          <div className="text-sm flex items-center gap-4">
            {selected.length > 0 && (
              <button
                onClick={deleteSelected}
                className="text-red-600 hover:text-red-700"
                title="Delete selected"
              >
                <Trash2 size={18} />
              </button>
            )}
            <div className="relative">
              <span className="cursor-pointer select-none" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                Sort By ▾
              </span>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow text-sm z-10">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setSortOption('newest');
                      setShowSortDropdown(false);
                    }}
                  >
                    Date (Newest)
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setSortOption('oldest');
                      setShowSortDropdown(false);
                    }}
                  >
                    Date (Oldest)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <ul className="divide-y">
          {sortedNotifications.map((notif) => (
            <li
              key={notif.notification_ID}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all cursor-pointer"
              onClick={() => setActiveNotification(notif)}
            >
              <input
                type="checkbox"
                className="mt-1"
                checked={selected.includes(notif.notification_ID)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleSelect(notif.notification_ID);
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-black">
                      {notif.subject}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      notif.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      notif.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {notif.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 text-right">
                    {formattedDateTime(notif.timestamp)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1 truncate">
                  {notif.message}
                </div>
              </div>
            </li>
          ))}

          {notifications.length === 0 && (
            <li className="text-center text-gray-400 py-6">No notifications to show.</li>
          )}
        </ul>
      </div>

      {activeNotification && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl w-full max-w-2xl border border-violet-200">
            <h3 className="text-2xl font-bold text-violet-800 mb-1">
              {activeNotification.subject}
            </h3>
            <hr className="border-violet-200 mb-4" />
            <div className="mb-6 space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-600">From:</span>{' '}
                <span className="text-violet-700 font-medium">Tomyang University</span>
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-600">To:</span>{' '}
                <span className="text-gray-800 font-medium">{email}</span>
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-600">Date:</span>{' '}
                <span className="text-gray-800 font-medium">{formattedDateTime(activeNotification.timestamp)}</span>
              </p>
            </div>
            <p className="text-base leading-relaxed text-gray-700 mb-6">
              {activeNotification.message}
            </p>
            <div className="text-right">
              <button
                className="px-5 py-2 text-sm bg-violet-100 text-violet-800 hover:bg-violet-200 rounded-md"
                onClick={() => setActiveNotification(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
