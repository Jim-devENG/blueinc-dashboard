import {
  Users,
  FolderKanban,
  ListChecks,
  Mail,
  CalendarCheck2,
  Bot,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const cards = [
  {
    name: 'Total Staff',
    value: 42,
    icon: Users,
    badge: 'Staff',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Projects in Progress',
    value: 8,
    icon: FolderKanban,
    badge: 'Projects',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Tasks Assigned',
    value: 27,
    icon: ListChecks,
    badge: 'Tasks',
    badgeColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    gradient: 'from-yellow-500 to-yellow-600',
  },
  {
    name: 'Messages Sent',
    value: 134,
    icon: Mail,
    badge: 'Mail',
    badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    gradient: 'from-green-500 to-green-600',
  },
  {
    name: 'Pending Leaves',
    value: 3,
    icon: CalendarCheck2,
    badge: 'Leave',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    gradient: 'from-red-500 to-red-600',
  },
  {
    name: 'Active Bots',
    value: 5,
    icon: Bot,
    badge: 'Bots',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    gradient: 'from-indigo-500 to-indigo-600',
  },
];

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.name}
                className="card-gradient rounded-2xl shadow-soft p-6 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out card-hover border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <div className={`flex-shrink-0 rounded-2xl p-4 bg-gradient-to-br ${card.gradient} shadow-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${card.badgeColor} status-badge`}>
                      {card.badge}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{card.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{card.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
} 