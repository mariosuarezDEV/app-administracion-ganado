import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";

// Conexión a la API para obtener el nombre de los proveedores
/*async function getProviders() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/vendedores/nombres"
    );
    if (Array.isArray(response.data)) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("No hay proveedores registrados");
      }
      throw new Error("Error en el servidor");
    }
  }
}*/

export const ComprarGanado = () => {
  const [nombreProvedores, setNombreProvedores] = useState([]);
  useEffect(() => {
    const ObtenerProveedores = async () =>{
      try {
        const response = await axios.get("http://127.0.0.1:8000/vendedores/nombres");
        setNombreProvedores(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            throw new Error("No hay proveedores registrados");
          }
          throw new Error("Error en el servidor");
        }
      }
    }
    ObtenerProveedores();
  }, []);

  const [payment, setPayment] = useState(null);
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4 mt-2">
        Comprar ganado
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-3">
        {/* Detalles de la compra */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-2 text-center">
            Detalles de la compra
          </h2>
          <form action="" className="flex flex-col">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Selecciona al proveedor
            </span>
            <select
              name=""
              id=""
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
            >
              <option value="">Selecciona un proveedor</option>
              {nombreProvedores.length>0 ? (
                nombreProvedores.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <option value="">No hay proveedores registrados</option>
              )}
            </select>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Cantidad de animales o kilos comprados
            </span>
            <input
              type="text"
              name=""
              id=""
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
            />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Fecha de la compra
            </span>
            <input
              type="date"
              name=""
              id=""
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
            />
          </form>
        </div>

        {/* Detalles de ganado */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-2 text-center">
            Información de compra
          </h2>
          <form action="" className="flex flex-col">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Tipo de cobro
            </span>
            <select
              name=""
              id=""
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
            >
              <option value="">Selecciona el tipo de cobro</option>
              <option value="1">Por animal</option>
              <option value="2">Por kilogramo</option>
            </select>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Precio unitario
            </span>
            <input
              type="text"
              name=""
              id=""
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
            />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Método de pago
            </span>
            <select
              name=""
              id="selectPay"
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            >
              <option value="">Selecciona el método de pago</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Banco">Banco</option>
              <option value="Ambos">Ambos</option>
            </select>
            {payment === "Banco" && (
              <>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Ingresa la cantidad total pagada
                </span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
                  required
                />
              </>
            )}

            {payment === "Efectivo" && (
              <>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Ingresa la cantidad total pagada
                </span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
                  required
                />
              </>
            )}
            {payment === "Ambos" && (
              <>
                <div className="grid grid-cols-2 gap-x-5">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 col-span-2">
                    Ingresa la cantidad total pagada
                  </span>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none col-span-1"
                    placeholder="Total en efectivo"
                  />
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none col-span-1"
                    placeholder="Total en banco"
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      {/* Boton para mandar los dos formularios */}
      <div className="flex justify-center mt-4 mb-10">
        <button className="bg-blue-500 text-white px-5 py-2 rounded-xl flex items-center transition delay-75 ease-in-out hover:bg-blue-700 shadow-md duration-300">
          <FaCartShopping className="inline-block text-xl mr-2" /> Realizar
          compra
        </button>
      </div>
    </>
  );
};
