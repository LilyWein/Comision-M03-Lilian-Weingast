import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "../components/TaskCard";

export const TaskPage = () => {
  
  const { getAllTask, task } = useTasks();

  
  useEffect(() => {
    getAllTask();
  }, []);

  if (task.length === 0)
    return (
      <>
        <Navbar />
        <h1>No Tiene Posteos</h1>
      </>
    );

  return (
    <>
      <Navbar />
      <h1>Posteos</h1>
      
      <div className="grid grid-cols-3 gap-2">
        {task.map((task, i) => (
          <TaskCard task={task} key={i} />
        ))}
      </div>
    </>
  );
};
