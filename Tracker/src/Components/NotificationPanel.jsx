import { useState, useEffect, useMemo } from 'react';

export default function NotificationPanel({ email }) {
  const [notifications, setNotifications] = useState([]);
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    console.log("Email for fetching notifications:", email);
    if (!email) return;

    fetch(`http://localhost/Application-Status-Tracking/Tracker/php/get_notifications.php?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, [email]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => (sortNewest ? new Date(b.timestamp) - new Date(a.timestamp) : new Date(a.timestamp) - new Date(b.timestamp)));
  }, [notifications, sortNewest]);

  return (
    <div className="p-6 max-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">NOTIFICATIONS</h2>
      <div className="bg-white shadow rounded">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Inbox</span>
            <span className="bg-red-500 text-white text-xs rounded-full px-2">
              {notifications.length}
            </span>
          </div>
          <div className="text-sm flex items-center gap-2">
            <span className="cursor-pointer" onClick={() => setSortNewest(!sortNewest)}>
              Sort By {sortNewest ? '↓' : '↑'}
            </span>
          </div>
        </div>

        <ul className="divide-y">
          {sortedNotifications.map((notif) => (
            <li
              key={notif.notification_ID}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all"
            >
              {/* Checkbox */}
              <input type="checkbox" className="mt-1" />

              {/* Subject, Status, and Message */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-black">
                      {notif.subject}
                    </span>
                    <span
                      className={`
                        text-xs px-2 py-1 rounded font-medium
                        ${notif.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          notif.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'}
                      `}
                    >
                      {notif.status}
                    </span>
                  </div>

                  <span className="text-xs text-gray-500">
                    {timeAgo(notif.timestamp)}
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
    </div>
    
  );

  
  function timeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = Math.floor((now - then) / 1000); // in seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return then.toLocaleDateString();
}

}
