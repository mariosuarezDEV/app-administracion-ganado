import React, { useState, useContext, useEffec, useEffect } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import axios from "axios";

import { estiloInput } from "../Login/login";

export const AgregarCliente = () => {
  const [nombreCliente, setNombreCliente] = useState(null);
  const [clienteRFC, setClienteRFC] = useState(null);
  const [clientePSG, setClientePSG] = useState(null);

  const apiURL = "http://127.0.0.1:8000/clientes/registrar";
  const apiURL2 = "http://127.0.0.1:8000/clientes/nombres";

  const registrarcliente = async () => {
    try {
      const response = await axios.post(apiURL, {
        nombre: nombreCliente,
        rfc: clienteRFC,
        psg: clientePSG,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error("Error al registrar el cliente");
        }
        throw new Error("Error en el servidor");
      }
    }
  }

  
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const verclientes = async () => {
      try {
        const response = await axios.get(apiURL2); //Devuelve una lista con nombres de los clientes
        setClientes(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            throw new Error("Error al obtener los clientes");
          }
          throw new Error("Error en el servidor");
        }
      }
    }
    verclientes();
  } );

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4 mt-2">
        Clientes de Ganado
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 py-3">
        {/* Formulario para agregar un nuevo cliente */}
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col"
        >
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4 mt-2">
            Registrar cliente
          </h2>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Nombre completo del cliente
          </span>
          <input
            type="text"
            name=""
            id="txtPSG"
            className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
            placeholder="Juan José Portillo Flórez"
            onChange={(e) => {
              estiloInput(e.target);
              if (e.target.value !== "") {
                setNombreCliente(e.target.value);
              } // Validar que el campo no esté vacío al momento de enviar el formulario
            }} required
          />
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            PSG
          </span>
          <input
            type="text"
            name=""
            id="txtNombre"
            className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
            placeholder="2879854030"
            onChange={(e) => {
              estiloInput(e.target);
              if (e.target.value !== "") {
                setClientePSG(e.target.value);
              } // Validar que el campo no esté vacío al momento de enviar el formulario
            }} required
          />
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            RFC
          </span>
          <input
            type="text"
            name=""
            id="txtRFC"
            className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
            placeholder="94878760z"
            onChange={(e) => {
              estiloInput(e.target);
              if (e.target.value !== "") {
                setClienteRFC(e.target.value);
              } // Validar que el campo no esté vacío al momento de enviar el formulario
            }} required
          />
          <div className="flex justify-center mt-4 mb-6">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-xl flex items-center transition delay-75 ease-in-out hover:bg-blue-700 shadow-md duration-300"
              onClick={() => {
                if (
                  document.getElementById("txtNombre").value !== "" &&
                  document.getElementById("txtPSG").value !== "" &&
                  document.getElementById("txtPSG").value !== ""
                ) {
                  try {
                    registrarcliente();
                    alert("Cliente registrado");
                    document.getElementById("txtNombre").value = "";
                    document.getElementById("txtPSG").value = "";
                    document.getElementById("txtRFC").value = "";
                    // Eliminamos el borde
                    document
                      .getElementById("txtNombre")
                      .classList.remove("ring-2");
                    document
                      .getElementById("txtPSG")
                      .classList.remove("ring-2");
                    document
                      .getElementById("txtRFC")
                      .classList.remove("ring-2");
                  } catch (error) {
                    alert(error);
                  }
                } else {
                  alert("Llene todos los campos");
                  if (document.getElementById("txtNombre").value === "") {
                    estiloInput(document.getElementById("txtNombre"));
                  }
                  if (document.getElementById("txtPSG").value === "") {
                    estiloInput(document.getElementById("txtPSG"));
                  }
                  if (document.getElementById("txtRFC").value === "") {
                    estiloInput(document.getElementById("txtRFC"));
                  }
                }
              }}
            >
              <BsPersonFillAdd className="inline-block mr-2 text-lg" />
              Registrar cliente
            </button>
          </div>
        </form>
        <div className="">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4 mt-2">
            Clientes registrados
          </h2>
          <table className="mb-5 border-collapse w-full mt-0 md:mt-10">
            {/* Tabla que muestre el nombre de los clientes*/}
            <thead>
              <tr className="bg-blue-600 text-white py-20">
                <th className=" py-3 rounded-tl-lg rounded-tr-lg">Nombre de los clientes</th>
              </tr>
            </thead>
            <tbody>
                {clientes.length > 0 ? (
                  clientes.map((item,index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border-b border-gray-400 py-3 text-center">{item}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No hay clientes registrados</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
