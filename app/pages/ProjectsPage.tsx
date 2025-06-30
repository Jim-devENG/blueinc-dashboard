import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { UserCircle, Plus, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    progress: 80,
    status: 'Active',
    lead: { name: 'Alice Johnson' },
  },
  {
    id: 2,
    title: 'Mobile App',
    progress: 45,
    status: 'On Hold',
    lead: { name: 'Bob Smith' },
  },
  {
    id: 3,
    title: 'API Migration',
    progress: 100,
    status: 'Completed',
    lead: { name: 'Carol Lee' },
  },
  {
    id: 4,
    title: 'Marketing Campaign',
    progress: 60,
    status: 'Active',
    lead: { name: 'David Kim' },
  },
  {
    id: 5,
    title: 'Internal Tool',
    progress: 20,
    status: 'Active',
    lead: { name: 'Eva Brown' },
  },
];

const statusStyles: Record<string, string> = {
  Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Completed: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
};

function CreateProjectModal({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (project: any) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    status: 'Active',
    lead: '',
    progress: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ title: '', status: 'Active', lead: '', progress: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Project</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Lead</label>
            <input
              type="text"
              required
              value={formData.lead}
              onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Create Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState(projects);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = (newProject: any) => {
    const project = {
      ...newProject,
      id: Date.now(),
      lead: { name: newProject.lead }
    };
    setProjectList([...projectList, project]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Projects</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your team's project progress and milestones.</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Create Project
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {projectList.map((project, index) => (
            <div
              key={project.id}
              className="card-gradient rounded-2xl shadow-soft p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out card-hover border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{project.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[project.status]} status-badge`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <UserCircle className="h-7 w-7 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 font-medium">{project.lead.name}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full progress-bar ${
                      project.status === 'Completed'
                        ? 'bg-gray-400 dark:bg-gray-500'
                        : project.status === 'Active'
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateProject}
        />
      </div>
    </DashboardLayout>
  );
} 