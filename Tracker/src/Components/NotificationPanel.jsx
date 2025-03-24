import { useState, useMemo } from 'react';

export default function NotificationPanel({ applicants }) {
  const [sortNewest, setSortNewest] = useState(true);

  // Extract only applicants with a custom notification message
  const notifications = useMemo(() => {
    return applicants
      .filter((a) => a.notification && a.notification.trim() !== '')
      .map((a) => ({
        id: a.id,
        title: a.name,
        message: a.notification,
        status: a.status,
        timeAgo: '4 minutes ago',
      }));
  }, [applicants]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => (sortNewest ? b.id - a.id : a.id - b.id));
  }, [notifications, sortNewest]);

  const statusColors = {
    Accepted: 'bg-green-100 text-green-700',
    'Under Review': 'bg-yellow-100 text-yellow-700',
    'Interview Scheduled': 'bg-green-100 text-green-700',
    'Pending Submission': 'bg-green-100 text-green-700',
    Overdue: 'bg-red-100 text-red-700',
    Missing: 'bg-red-100 text-red-700',
    Reviewed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-6 max-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">NOTIFICATION</h2>
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
              key={notif.id}
              className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50"
            >
              <input type="checkbox" className="mt-1" />
              <div className="flex-1">
                <div className="font-semibold text-sm truncate max-w-[90%]">
                  {notif.title}
                </div>
                <div className="text-xs text-gray-600 truncate max-w-[90%]">
                  {notif.message}
                </div>
              </div>
              <div className="flex flex-col items-end text-xs text-gray-500">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusColors[notif.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {notif.status}
                </span>
                <span>{notif.timeAgo}</span>
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
