import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

export const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
 
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-semibold text-white">{task.title}</h1>
        <div className="flex gap-x-2 items-center"></div>
      
      </header>
      <p className="">{task.description}</p>
      {/*client*/}

           
     <button
     className="bg-red-700 rounded-md px-2 mt 16"
       onClick={() => {
              
        deleteTask(task._id);
       }}
      >
       eliminar
      </button>
      <Link className="bg-green-600 rounded-md px-2" to={`/task/${task._id}`}>
        editar
      </Link>
      
     {/*<img
        src= {post.imagen}
        alt=""
      />*/}
     
      <p className="text-2xl">
        {new Date(task.date).toLocaleDateString()}
      </p>
    </div>
       
  );
};
