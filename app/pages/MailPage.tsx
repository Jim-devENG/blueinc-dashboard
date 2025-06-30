import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Mail, Plus, Send } from 'lucide-react';

const emails = [
  {
    id: 1,
    sender: 'Alice Johnson',
    subject: 'Weekly Team Meeting',
    date: '2024-06-29 10:15',
    status: 'Unread',
  },
  {
    id: 2,
    sender: 'Bob Smith',
    subject: 'Project Update',
    date: '2024-06-28 16:40',
    status: 'Read',
  },
  {
    id: 3,
    sender: 'Carol Lee',
    subject: 'Leave Request',
    date: '2024-06-27 09:05',
    status: 'Unread',
  },
  {
    id: 4,
    sender: 'David Kim',
    subject: 'Bug Report',
    date: '2024-06-26 14:20',
    status: 'Read',
  },
];

const statusStyles: Record<string, string> = {
  Read: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  Unread: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
};

export default function MailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle mail composition logic here
    console.log('Composing mail:', composeData);
    setIsModalOpen(false);
    setComposeData({ to: '', subject: '', message: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Internal Mail</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your team's internal communications.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out btn-hover"
          >
            <Plus className="h-5 w-5" />
            Compose Mail
          </button>
        </div>
        <div className="card-gradient rounded-2xl shadow-soft p-6 overflow-x-auto border border-gray-100 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sender</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {emails.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer table-hover">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{email.sender}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{email.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{email.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold status-badge ${statusStyles[email.status]}`}>
                      {email.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Compose Mail Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 animate-fade-in">
            <div className="card-gradient rounded-2xl shadow-soft p-6 w-full max-w-md mx-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Compose Mail</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                  <input
                    type="email"
                    value={composeData.to}
                    onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 focus-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 focus-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    value={composeData.message}
                    onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 focus-ring resize-none"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out btn-hover"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out btn-hover"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 