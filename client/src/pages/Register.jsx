import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuth, errors: authErrors } = useAuth();


  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/post");
  }, [isAuth]);


  const onSubmit = handleSubmit(async (values) => {

    signup(values);
  });
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center mt-10 ">
        <div className="bg-gray-600 max-w-md p-5 rounded-md">
          {/* FORMULARIO */}
          <h1 className="text-3xl text-center font-semibold my-3">Registrarse</h1>
          {authErrors.map((err, i) => (
            <div key={i} className="bg-red-800 text-white m-3">
              {err}
            </div>
          ))}
          <form
            onSubmit={onSubmit}
          >
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-300 text-gray-950 px-4 py-2 rounded-md my-3"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-400">El Username es requerido</p>
            )}
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-300 text-gray-950 px-4 py-2 rounded-md my-3"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-400">El Email es requerido</p>
            )}
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-300 text-gray-950 px-4 py-2 rounded-md my-3"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-400">El Password es requerido</p>
            )}
            <input
              type="URL"
              accept="image/*"
              {...register("avatar", { required: false })}
              className="w-full bg-zinc-300 text-gray-950 px-4 py-2 rounded-md my-3"
              placeholder="Avatar"
            />
            {errors.username && (
              <p className="text-red-400">Ingrese una imagen</p>
            )}
            <button
              className="h-10 px-6 my-4 font-semibold rounded-md bg-gray-700 text-green-400"
              type="submit"
            >
              Registrarse
            </button>
          </form>
          <p className="flex items-center mr-8 pt-5 pl-20">
            ¿Tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold bg-gray-700 text-green-400 rounded-md p-3 ml-6"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
