import React, {useContext} from "react";
import { AuthContext } from "../../Auth";
import {useNavigate} from "react-router-dom";

import { BiHomeAlt } from "react-icons/bi";
import { BiHighlight } from "react-icons/bi";
import { BiAt } from "react-icons/bi";
import { BiCloudDownload } from "react-icons/bi";
import { BiNavigation } from "react-icons/bi";


// crear un menu de navegacion

export const Navigation = () => {
  const { autenticate } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className=" bg-blue-600 px-4 py-4 grid grid-cols-3 shadow-lg items-center text-center mb-5 text-gray-950">
      <div>
        <h1 className="text-lg mr-6 text-white">{autenticate}</h1>
      </div>
      <div className="hidden md:block col-span-2">
        <ul className="flex justify-end ">
          <li className="flex items-center text-white hover:bg-white hover:bg-opacity-10 mr-2 ml-2 px-5 py-2 rounded-lg">
            <button onClick={() => {
              navigate("/admin");
            }} className="flex items-center">
              <BiHomeAlt className="inline-block mr-2" /> Inicio
            </button>
          </li>
          <li className="flex items-center text-white hover:bg-white hover:bg-opacity-10 mr-2 ml-2 px-5 py-2 rounded-lg">
            <button href="" className="flex items-center" onClick={() => {
              navigate("/admin/panel");
            }}>
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

export const InitPage = () => {
  const navigate = useNavigate();
  return(
    <div className="px-4 py-3 grid grid-cols-1 gap-2">
      <h1 className="text-4xl text-center font-bold text-gray-800">
        Administración de Ganado
      </h1>

      {/* Mostrar el control de ingresos de ganado */}
      <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-5 mt-5">
        {/* Analiticas de gastos mensuales, ingresos mensuales e ingresos totales */ }
        <div className="bg-white rounded-md border-2 border-green-300 shadow-md">
          <h1 className="mt-3">
            Ingresos mensuales
          </h1>
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-green-600">
              $0.00
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-md border-2 border-blue-300">
          <h1 className="mt-3">
            Ingresos totales
          </h1>
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-blue-600">
              $0.00
            </h2>
          </div>
        </div>
        <div className="bg-white rounded-md border-2 border-orange-300 shadow-md">
          <h1 className="mt-3">
            Gastos mensuales
          </h1>
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-orange-600">
              $0.00
            </h2>
          </div>
        </div>
        <div className="md:col-span-3 mt-1 mb-1 flex justify-center">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-xl flex items-center transition delay-75 ease-in-out hover:bg-blue-600 shadow-md duration-300"><BiCloudDownload className="inline-block text-xl mr-2"/> Descargar reporte</button>
        </div>
      </div>

      {/* Tabla de ingresos de mes */}
      <div className="grid grid-cols-1 mt-5 mb-1 text-center">
          <h1 className="text-2xl font-bold mb-5 text-gray-800">
            Registro de ingresos mensuales
          </h1>
          <table className="mb-5 border-collapse table-auto">
            <thead>
              <tr className="bg-blue-600 text-white">
              <th className=" py-3 rounded-tl-lg">Concepto</th>
                <th className="py-3">Fecha</th>
                <th className="py-3 rounded-tr-lg">Ingreso</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="hover:bg-gray-100">
                <td className="border-b border-gray-400 py-3">Compra de ganado</td>
                <td className="border-b border-gray-400 py-3">12-5-2024</td>
                <td className="border-b border-gray-400 py-3">$100,000.00</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border-b border-gray-400 py-3">Compra de ganado</td>
                <td className="border-b border-gray-400 py-3">12-5-2024</td>
                <td className="border-b border-gray-400 py-3">$100,000.00</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border-b border-gray-400 py-3">Compra de ganado</td>
                <td className="border-b border-gray-400 py-3">12-5-2024</td>
                <td className="border-b border-gray-400 py-3">$100,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Acceso a funcionalidades rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-4 py-3 mb-5">
          <h1 className="text-2xl font-bold text-center text-gray-800 col-span-2 md:col-span-4">
            Acceso rápido
          </h1>
          <div className="text-center px-2 py-4 rounded-lg border shadow-md">
            {/*  Comprar ganado */}
            <h1 className="font-bold text-xl mb-2 text-center">
              Comprar ganado
            </h1>
            <p className="mb-2">
              Registra un nuevo usuario para que pueda acceder al sistema.
            </p>
            <div className="flex justify-center">
            <button className="mt-2 mb-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
                <BiNavigation className="inline-block text-lg mr-2"/>Registrar
            </button>
            </div>
          </div>
          <div className="text-center px-2 py-4 rounded-lg border shadow-md">
            {/*  Vender ganado */}
            <h1 className="font-bold text-xl mb-2 text-center">
              Vender ganado
            </h1>
            <p className="mb-2">
              Registra un nuevo usuario para que pueda acceder al sistema.
            </p>
            <div className="flex justify-center">
            <button className="mt-2 mb-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
                <BiNavigation className="inline-block text-lg mr-2"/>Registrar
            </button>
            </div>
          </div>
          <div className="text-center px-2 py-4 rounded-lg border shadow-md">
            {/*  Ver ganado */}
            <h1 className="font-bold text-xl mb-2 text-center">
              Consultar ganado
            </h1>
            <p className="mb-2">
              Registra un nuevo usuario para que pueda acceder al sistema.
            </p>
            <div className="flex justify-center">
            <button className="mt-2 mb-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
                <BiNavigation className="inline-block text-lg mr-2"/>Registrar
            </button>
            </div>
          </div>
          <div className="text-center px-2 py-4 rounded-lg border shadow-md">
            {/*  Registrar usuario */}
            <h1 className="font-bold text-xl mb-2 text-center">
              Registrar usuario
            </h1>
            <p className="mb-2">
              Registra un nuevo usuario para que pueda acceder al sistema.
            </p>
            <div className="flex justify-center">
            <button  className="mt-2 mb-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700" onClick={() => {
              navigate("/admin/new-usr");
            }}>
                <BiNavigation className="inline-block text-lg mr-2"/>Registrar
            </button>
            </div>
          </div>
        </div>

    </div>
  );
}
