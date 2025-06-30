import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { UserCircle, Plus, X } from 'lucide-react';

const initialTasks = [
  {
    id: 1,
    title: 'Design login page',
    status: 'To Do',
    assigned: 'Alice Johnson',
    due: '2024-07-01',
  },
  {
    id: 2,
    title: 'API integration',
    status: 'In Progress',
    assigned: 'Bob Smith',
    due: '2024-07-03',
  },
  {
    id: 3,
    title: 'Write unit tests',
    status: 'To Do',
    assigned: 'Carol Lee',
    due: '2024-07-05',
  },
  {
    id: 4,
    title: 'Fix bug #123',
    status: 'Done',
    assigned: 'David Kim',
    due: '2024-06-28',
  },
  {
    id: 5,
    title: 'Update docs',
    status: 'In Progress',
    assigned: 'Eva Brown',
    due: '2024-07-02',
  },
  {
    id: 6,
    title: 'Deploy to staging',
    status: 'To Do',
    assigned: 'Frank Green',
    due: '2024-07-04',
  },
];

const columns = [
  { key: 'To Do', label: 'To Do', color: 'from-blue-500 to-blue-600' },
  { key: 'In Progress', label: 'In Progress', color: 'from-yellow-500 to-yellow-600' },
  { key: 'Done', label: 'Done', color: 'from-green-500 to-green-600' },
];

function CreateTaskModal({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (task: any) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    status: 'To Do',
    assigned: '',
    due: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ title: '', status: 'To Do', assigned: '', due: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assigned To</label>
            <input
              type="text"
              required
              value={formData.assigned}
              onChange={(e) => setFormData({ ...formData, assigned: e.target.value })}
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
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
            <input
              type="date"
              required
              value={formData.due}
              onChange={(e) => setFormData({ ...formData, due: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Create Task
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

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [dragged, setDragged] = useState(null as null | number);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const onDragStart = (id: number) => setDragged(id);
  const onDragEnd = () => setDragged(null);
  const onDrop = (status: string) => {
    if (dragged !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === dragged ? { ...task, status } : task
        )
      );
      setDragged(null);
    }
  };

  const handleCreateTask = (newTask: any) => {
    const task = {
      ...newTask,
      id: Date.now()
    };
    setTasks([...tasks, task]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tasks Kanban Board</h1>
              <p className="text-gray-600 dark:text-gray-400">Organize and track your team's tasks efficiently.</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Create Task
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {columns.map((col, index) => (
            <div
              key={col.key}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-soft p-6 min-h-[400px] flex flex-col border border-gray-200 dark:border-gray-700"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(col.key)}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <h2 className="text-lg font-semibold mb-6 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${col.color}`}></div>
                {col.label}
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {tasks.filter((t) => t.status === col.key).length}
                </span>
              </h2>
              <div className="flex-1 space-y-4">
                {tasks.filter((t) => t.status === col.key).length === 0 && (
                  <div className="text-gray-400 dark:text-gray-500 text-sm text-center mt-8">No tasks</div>
                )}
                {tasks
                  .filter((t) => t.status === col.key)
                  .map((task) => (
                    <div
                      key={task.id}
                      className={`card-gradient rounded-xl shadow-soft p-4 cursor-move border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out card-hover ${dragged === task.id ? 'opacity-50' : ''}`}
                      draggable
                      onDragStart={() => onDragStart(task.id)}
                      onDragEnd={onDragEnd}
                    >
                      <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{task.title}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <UserCircle className="h-4 w-4 text-gray-400" />
                        {task.assigned}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md inline-block">
                        Due: {task.due}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateTask}
        />
      </div>
    </DashboardLayout>
  );
} 