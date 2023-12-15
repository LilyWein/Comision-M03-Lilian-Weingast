import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [forceRefresh, setForceRefresh] = useState(false); 

  const handleEditMode = () => {
    if (editMode) {
      updateProfile(user.id,editedUser);
      setEditedUser(editedUser);
      window.location.reload();
        }
    setEditMode(!editMode);
  };

  useEffect(() => {
    if (forceRefresh) {
      setEditedUser(user); 
      setForceRefresh(false); 
    }
  }, [forceRefresh, user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
       <div className="inline-block rounded overflow-hidden shadow-lg bg-gray-600">
        <div className="px-6 py-4">
          <div className="font-mono font-bold text-stone-300 text-center text-xl mb-2">Perfil</div>
          <ul className="font-mono text-stone-300 font-semibold text-base list-none"> {/* list-none para eliminar los puntos de la lista */}
          <li className="mb-4">
                <strong>Username:</strong>{' '}
                {editMode ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.username
                )}
              </li>
              <li className="mb-4">
                <strong>Email:</strong>{' '}
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </li>
              <li className="mb-4">
                <strong>Avatar:</strong>{' '}
                {editMode ? (
                  <input
                    type="text"
                    name="avatar"
                    value={editedUser.avatar}
                    onChange={handleInputChange}
                  />
                ) : (
                  <img src={user.avatar} alt="Avatar del usuario" className="w-20 h-20 rounded-full mx-auto" />
                )}
              </li>
            </ul>
            <button className='bg-gray-700 text-green-400' onClick={handleEditMode}>
              {editMode ? 'Guardar cambios' : 'Editar perfil'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
