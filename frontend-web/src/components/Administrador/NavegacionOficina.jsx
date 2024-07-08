import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import { useNavigate } from "react-router-dom";

import { BiHomeAlt } from "react-icons/bi";
import { BiHighlight } from "react-icons/bi";
import { BiAt } from "react-icons/bi";

// crear un menu de navegacion

export const Navigation = () => {
  const { autenticate } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className=" bg-blue-600 px-4 py-4 grid grid-cols-3 shadow-lg items-center text-center mb-5 text-gray-950">
      <div>
        <h1 className="text-lg mr-6 text-white">{autenticate.full_name}</h1>
      </div>
      <div className="hidden md:block col-span-2">
        <ul className="flex justify-end ">
          <li className="flex items-center text-white hover:bg-white hover:bg-opacity-10 mr-2 ml-2 px-5 py-2 rounded-lg">
            <button
              onClick={() => {
                navigate("/oficina");
              }}
              className="flex items-center"
            >
              <BiHomeAlt className="inline-block mr-2" /> Inicio
            </button>
          </li>
          <li className="flex items-center text-white hover:bg-white hover:bg-opacity-10 mr-2 ml-2 px-5 py-2 rounded-lg">
            <button
              href=""
              className="flex items-center"
              onClick={() => {
                navigate("/oficina/panel");
              }}
            >
              <BiHighlight className="inline-block mr-2" /> Administración
            </button>
          </li>
          <li className="flex items-center text-white hover:bg-white hover:bg-opacity-10 mr-2 ml-2 px-5 py-2 rounded-lg">
            <button href="" className="flex items-center">
              <BiAt className="inline-block mr-2" /> Mi Cuenta
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};