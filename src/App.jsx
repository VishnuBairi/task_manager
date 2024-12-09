import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        const formattedTasks = data.slice(0, 20).map(task => ({
          id: task.id,
          title: task.title,
          description: `Task ${task.id} description`,
          status: task.completed ? 'Done' : 'To Do'
        }));
        setTasks(formattedTasks);
        setLoading(false);
      });
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Task List Manager</h1>
      
      <TaskForm onAddTask={handleAddTask} />
      
      <TaskStats tasks={tasks} />
      
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <TaskTable
        tasks={tasks}
        onTaskUpdate={handleUpdateTask}
        onTaskDelete={handleDeleteTask}
        statusFilter={statusFilter}
      />

      <ToastContainer position="bottom-right" />
    </div>
  );
}


export default App;