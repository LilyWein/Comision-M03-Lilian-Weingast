import { createContext, useContext, useEffect, useState } from "react";
import { registerReq, loginRequest, verifyToken } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

export const AuthProvider = ({ children }) => {
  //datos del usuario que va a ser leido en toda la aplicación.
  const [user, setUser] = useState(null);

  //informe si esta o no Autenticado
  const [isAuth, setIsAuth] = useState(false);

  //Manejo de estados de errores:
  const [errors, setErrors] = useState([]);

  //datos del registro
  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      //actualizacion del usser
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      
      setErrors(error.response.data);
    }
  };

  // Validación del Login
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
     
      setErrors(error.response.data);
    }
  };

  //Logout

  const signout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Para cuando validamos cookies
  useEffect(() => {
    async function verifyLogin() {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          console.log(res);
          if (res.data) {
            setIsAuth(true);
            setUser(res.data);
          } else {
            setIsAuth(false);
          }
        } catch (error) {
          setIsAuth(false);
          setUser(null);
        }
      }
    }
    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        signout,
        user,
        isAuth,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
