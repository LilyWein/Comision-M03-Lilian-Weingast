import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div>Perfil</div>

      {JSON.stringify(user,null, 3)}
    </>
  );
};
