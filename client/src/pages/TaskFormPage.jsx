import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();

  const {task, createTask, getTaskById, updateTask } = useTasks();
  
  const params = useParams();
  useEffect(() => {
    
    async function loadTask() {
      if (params.id) {
        const task = await getTaskById(params.id);
       
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
   
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/task");
  });
  return (
    <div>
      <Navbar />
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Titulo"
            {...register("title")}
            autoFocus
          />
          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            rows="3"
            placeholder="Descripción"
            {...register("description")}
          ></textarea>

          <label>Completado</label>
          <input type="checkbox" {...register("completed")} />
          <button
            className="flex h-10 px-6 font-semibold rounded-md bg-green-900 text-white my-5"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
