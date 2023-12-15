import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const navigate = useNavigate();

  const handleEditMode = () => {
    if (editMode) {
      updateProfile(user.id,editedUser);
      
        }
    setEditMode(!editMode);
  };

  useEffect( () =>{
    navigate("/profile", {remplace : true})
  },[handleEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
       <div className="inline-block rounded overflow-hidden shadow-lg bg-stone-700">
        <div className="px-6 py-4">
          <div className="font-mono font-bold text-stone-300 text-center text-xl mb-2">Perfil</div>
          <ul className="text-stone-300 font-bold text-base list-none"> {/* list-none para eliminar los puntos de la lista */}
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
                <strong>Fecha de creación:</strong>{' '}
                {editMode ? (
                  <input
                    type="date"
                    name="createdAt"
                    value={editedUser.createdAt}
                    onChange={handleInputChange}
                    readOnly
                  />
                ) : (
                  user.createdAt
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
            <button onClick={handleEditMode}>
              {editMode ? 'Guardar cambios' : 'Editar perfil'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
