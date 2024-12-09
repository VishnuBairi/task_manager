const TaskStats = ({ tasks }) => {
    const stats = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
  
    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-bold">To Do</h3>
          <p className="text-2xl">{stats['To Do'] || 0}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold">In Progress</h3>
          <p className="text-2xl">{stats['In Progress'] || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-bold">Done</h3>
          <p className="text-2xl">{stats['Done'] || 0}</p>
        </div>
      </div>
    );
  };
  
  export default TaskStats;