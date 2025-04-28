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

        <ul>
          {sortedNotifications.map((notif) => (
            <li
              key={notif.notification_ID}
              className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50"
            >
              <input type="checkbox" className="mt-1" />
              <div className="flex-1">
                <div className="font-semibold text-sm truncate max-w-[90%]">
                  Notification
                </div>
                <div className="text-xs text-gray-600 truncate max-w-[90%]">
                  {notif.message}
                </div>
              </div>
              <div className="flex flex-col items-end text-xs text-gray-500">
                <span>{new Date(notif.timestamp).toLocaleDateString()}</span>
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
}
