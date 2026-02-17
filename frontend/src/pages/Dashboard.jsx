import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  LogOut, 
  User,
  CheckCircle2,
  Circle,
  Clock,
  BarChart3,
  Trash2,
  Edit,
  X,
  Calendar,
  Tag,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: '',
  });

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filterStatus, filterPriority]);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      if (searchTerm) params.search = searchTerm;

      const response = await tasksAPI.getAll(params);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await tasksAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleSearch = () => {
    fetchTasks();
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        ...taskForm,
        tags: taskForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      
      if (editingTask) {
        await tasksAPI.update(editingTask._id, taskData);
        toast.success('Task updated successfully!');
      } else {
        await tasksAPI.create(taskData);
        toast.success('Task created successfully!');
      }
      
      setShowModal(false);
      setEditingTask(null);
      setTaskForm({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        tags: '',
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error('Failed to save task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      tags: task.tags ? task.tags.join(', ') : '',
    });
    setShowModal(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(id);
        toast.success('Task deleted successfully!');
        fetchTasks();
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { updateProfile } = useAuth();
    const result = await updateProfile(profileForm);
    if (result.success) {
      setShowProfile(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-pink-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-green-500 to-emerald-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-slate-500 to-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="glass-effect rounded-2xl p-6 shadow-xl border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-slate-400">Manage your tasks efficiently</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowProfile(true)}
                className="glass-effect px-4 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 border border-white/10 hover:border-purple-500/50"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={logout}
                className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2 border border-red-500/30"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-xl p-6 border border-white/10 card-hover">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold gradient-text">{stats.total}</span>
            </div>
            <p className="text-slate-400">Total Tasks</p>
          </div>
          <div className="glass-effect rounded-xl p-6 border border-white/10 card-hover">
            <div className="flex items-center justify-between mb-2">
              <Circle className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">{stats.todo}</span>
            </div>
            <p className="text-slate-400">To Do</p>
          </div>
          <div className="glass-effect rounded-xl p-6 border border-white/10 card-hover">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-yellow-400">{stats.inProgress}</span>
            </div>
            <p className="text-slate-400">In Progress</p>
          </div>
          <div className="glass-effect rounded-xl p-6 border border-white/10 card-hover">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-green-400">{stats.completed}</span>
            </div>
            <p className="text-slate-400">Completed</p>
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow"
                  placeholder="Search tasks..."
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none input-glow"
            >
              <option value="">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none input-glow"
            >
              <option value="">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setTaskForm({
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                dueDate: '',
                tags: '',
              });
              setShowModal(true);
            }}
            className="btn-gradient px-6 py-3 rounded-lg flex items-center gap-2 text-white font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>New Task</span>
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="glass-effect rounded-xl p-12 text-center border border-white/10">
            <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No tasks found</h3>
            <p className="text-slate-400">Create your first task to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="glass-effect rounded-xl p-6 border border-white/10 card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getPriorityColor(task.priority)} text-white`}>
                      {task.priority}
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
                {task.description && (
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{task.description}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {task.tags && task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(task.status)} text-white`}>
                    {task.status.replace('-', ' ')}
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="w-4 h-4" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-effect rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow resize-none"
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none input-glow"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none input-glow"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none input-glow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={taskForm.tags}
                  onChange={(e) => setTaskForm({ ...taskForm, tags: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow"
                  placeholder="work, urgent, important"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gradient text-white font-semibold py-3 rounded-lg"
              >
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-effect rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Your Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-glow resize-none"
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gradient text-white font-semibold py-3 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;