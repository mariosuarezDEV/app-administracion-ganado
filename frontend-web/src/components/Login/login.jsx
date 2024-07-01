import React, { useContext, useStat }  from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from 'react-router-dom';

 import { AuthContext, AuthProvider } from "../../Auth";


import axios from "axios";

// Terceros
import { BiRightArrowAlt } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";
import { BiMessageSquareDots } from "react-icons/bi";

// Importar imagenes
import PortadaLoginDos from "../img/PortadaLoginDos.jpg";


//Cambiar el color de los input si estan vacios o no
export function estiloInput(input) {
  if (input.value === "") {
    input.classList.remove("ring-2");
    input.classList.remove("ring-green-400");

    input.classList.add("ring-2");
    input.classList.add("ring-red-400");
    input.focus();
  } else {
    input.classList.remove("ring-2");
    input.classList.remove("ring-red-400");

    input.classList.add("ring-2");
    input.classList.add("ring-green-400");
  }
}

// creación de un componente login
export const Login = () => {
  const {setAutenticate} = useContext(AuthContext);
  const navigate = useNavigate();

  async function loginAPI(username, password) {
    const userData = {username, password};
    try {
      const response = await axios.post("http://127.0.0.1:8000/login",userData);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error("Las credenciales no coinciden con alguna cuenta");
        }
        throw new Error("Error en el servidor");
      }
    }
  }
  
  async function sendForm() {
    const correo = document.getElementById("txtLogin");
    const password = document.getElementById("txtPassword");
    // contexto
    try{
      const user = await loginAPI(correo.value , password.value);
      setAutenticate(user.access_token);
      alert("Bienvenido " + user.access_token);
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-4 text-center justify-center h-full font-sans bg-gray-50">
        <div className=" p-5 ml-3 mr-3 row-span-3 my-auto">
          <h1 className="text-4xl font-semibold tracking-wide mb-8 mt-8">
            Administración Ganado
          </h1>
          <form
            id="formLogin"
            className="text-left p-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Correo de usuario
            </span>
            <br />
            <div className="mt-2.5 relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 flex items-center pl-3 rtl:pr-3 pointer-events-none">
                <BiMailSend className="text-xl text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="txtLogin"
                placeholder="usuario@empresa.com"
                className="w-full px-11 py-2 rtl:pr-10 rtl:pl-4 bg-white border shadow-sm border-slate-300 focus:outline-none rounded-md invalid:ring-2 invalid:ring-red-400" onChange={(e) => {
                  e.target.value === "" ? estiloInput(e.target) : estiloInput(e.target);
                
                }}
              />
            </div>
            <br />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Contraseña de usuario
            </span>
            <br />
            <div className="mt-2.5 relative">
              <div className="absolute inset-y-0 left-0 rtl:right-0 flex items-center pl-3 rtl:pr-3 pointer-events-none">
                <BiMessageSquareDots className="text-xl text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                id="txtPassword"
                placeholder="Escribe tu contraseña"
                className="w-full px-11 py-2 rtl:pr-10 rtl:pl-4 bg-white border shadow-sm border-slate-300 focus:outline-none rounded-md invalid:ring-2 invalid:ring-red-400" onChange={(e) => {
                  e.target.value === "" ? estiloInput(e.target) : estiloInput(e.target);
                
                }}
              />
            </div>
            <div className="grid grid-cols-3 mt-3">
              <a
                href="#"
                className="underline decoration-pink-600 col-span-3 text-right text-pink-600 transition ease-in-out delay-150 hover:text-orange-500 hover:decoration-orange-400"
              >
                Olvide mi contraseña.
              </a>
            </div>
            <br />
            <div className="flex justify-center items-center">
              <button
                className="mb-3 mt-1 rounded-full text-sm font-semibold transition ease-in-out delay-150 bg-gray-600 text-white hover:bg-green-500 duration-300 px-8 py-2 flex items-center justify-center" onClick={() => {
                  sendForm();
                }} 
              >
                Iniciar sesión <BiRightArrowAlt className="text-lg" />
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block row-span-3">
          <img
            src={PortadaLoginDos}
            className="h-full w-full object-cover"
            alt="Imagen decorativa para inicio de sesión"
          />
        </div>
      </div>
    </>
  );
};
