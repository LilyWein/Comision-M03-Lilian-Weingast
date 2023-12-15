import React, { useState } from 'react';

const MenuAcordeon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={toggleAccordion}
        className="w-full py-2 px-4 text-left bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        Desplegar menú
      </button>
      {isOpen && (
        <div className="border rounded mt-2">
          <button
            onClick={toggleAccordion}
            className="w-full py-2 px-4 text-left bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            Cerrar menú
          </button>
          <div className="p-4">
            <p>Comentarios</p>
            {/* Aquí colocarías los elementos del menú acordeón */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuAcordeon;