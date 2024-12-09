import { useEffect, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { toast } from 'react-toastify';

const TaskTable = ({ tasks, onTaskUpdate, onTaskDelete, statusFilter }) => {
  const [tableData, setTableData] = useState(tasks);

  useEffect(() => {
    const filtered = statusFilter 
      ? tasks.filter(task => task.status === statusFilter)
      : tasks;
    setTableData(filtered);
  }, [tasks, statusFilter]);

  const columns = [
    { title: "ID", field: "id", width: 70, headerFilter: true },
    { title: "Title", field: "title", editor: "input", headerFilter: true },
    { title: "Description", field: "description", editor: "input", headerFilter: true },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: {
        values: ["To Do", "In Progress", "Done"]
      },
      headerFilter: "select",
      headerFilterParams: {
        values: ["To Do", "In Progress", "Done"]
      }
    },
    {
      title: "Actions",
      formatter: function(cell) {
        return '<button class="delete-btn">Delete</button>';
      },
      cellClick: function(e, cell) {
        onTaskDelete(cell.getRow().getData().id);
        toast.success('Task deleted successfully!');
      }
    }
  ];

  const options = {
    layout: "fitColumns",
    responsiveLayout: "hide",
    pagination: "local",
    paginationSize: 10,
    height: "400px",
  };

  const handleCellEdited = (cell) => {
    const task = cell.getRow().getData();
    onTaskUpdate(task);
    toast.success('Task updated successfully!');
  };

  return (
    <div className="w-full overflow-x-auto">
      <ReactTabulator
        data={tableData}
        columns={columns}
        options={options}
        events={{
          cellEdited: handleCellEdited,
        }}
      />
    </div>
  );
};

export default TaskTable;