import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Auth";
import { ObtenerAncho } from "./design/ObtenerAncho";

import axios from "axios";
import Typewriter from "typewriter-effect";
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { TbSend } from "react-icons/tb";

import dddepth from "./img/dddepth.jpg";



export const Login = () => {
  const { setAutenticate } = useContext(AuthContext);
  const url = useContext(AuthContext).url;
  const navigate = useNavigate();
  
  const [campoClave, setCampoClave] = useState(false)

  const [parent] = useAutoAnimate();

  useEffect(() => {
    //procesos que se inician al cargar la pagina
    
  });

  const buscar_correo = async (email) =>{
    try{
      await axios.post(url+"usuario/correo",{
        "email": email
      })
      //console.log(respuesta.data)
      return true
    } catch (error){
      console.log(error)
      return false
    }
    
  }

  const ValidarCorreo = async (e) =>{
    const correo = e.target.value
    console.log(correo)
    const respuesta = await buscar_correo(correo)
    if(respuesta){
      //quitar el contorno rojo si lo tiene
      e.target.classList.remove("border-stone-800")
      e.target.classList.remove("border-red-500")
      // poner el campo con un contorno verde
      e.target.classList.add("border-green-500")
      setCampoClave(true)
      //Desactivar el campo de correo
      e.target.disabled = true
      return true
    } else {
      //quitar el contorno verde si lo tiene
      e.target.classList.remove("border-stone-800")
      e.target.classList.remove("border-green-500")
      e.target.classList.add("border-red-500")
      setCampoClave(false)
      return false
    }
  }

  async function loginAPI(username, password) {
    const userData = { username, password };
    try {
      const response = await axios.post(url+"login", userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            throw new Error("Las credenciales no coinciden con alguna cuenta");
          default:
            throw new Error("Error en el servidor");
        }
      } else {
        throw new Error("Error en la conexión");
      }
    }
  }
  
  async function sendForm() {
    const correo = document.getElementById("txtLogin").value;
    const password = document.getElementById("txtPassword").value;
  
    if (!correo || !password) {
      alert("Por favor, ingrese todos los campos");
      return;
    }
    try {
      const user = await loginAPI(correo, password);
      setAutenticate(user);
      if (user.permisos === "administrador") {
        navigate("/oficina");
      } else {
        navigate("/ganadero");
      }
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <>
      <div className="dark:bg-zinc-700 grid grid-cols-1 md:grid-cols-3 grid-rows-1 md:grid-rows-3 h-full">
        <div className="md:col-span-3 flex md:row-span-3 rounded-xl dark:bg-zinc-800 mx-14 my-auto shadow-2xl shadow-zinc-800"> {/* Contenedor principal */}

          <div className="md:w-2/3 flex justify-center items-center px-4 py-4 m-auto"> {/* Contenedor de formulario */}
            <form action="" className="text-center w-full" onSubmit={(e) => {
              e.preventDefault();
              sendForm();
            }}>
              <h1 className="text-3xl font-bold dark:text-white">
                <Typewriter
                  options={{ delay: 32 }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Administración de ganado")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Iniciar sesión")
                      .start();
                  }}
                />
              </h1>
              <div className="flex flex-col justify-center text-left md:px-9 py-4 gap-2" ref={parent}> {/* Contenedor de inputs */}
                <span className="dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                  Correo electrónico empresarial
                </span>
                <input type="text" name="" id="txtLogin" className="dark:bg-zinc-700 dark:text-neutral-100 px-4 py-2 rounded-lg border-2 border-stone-800 focus:outline-none" placeholder="usuario@administracion.of" required onChange={ValidarCorreo}/>
                {campoClave && (
                  <>
                    <span className="dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña</span>
                    <input
                      type="password" id="txtPassword"
                      className="dark:bg-zinc-700 dark:text-neutral-100 px-4 py-2 rounded-lg border-2 border-stone-800 focus:outline-none"
                      placeholder="Contraseña"
                      required
                    />
                    <div className="flex flex-col justify-center items-center my-6">
                  <button className="dark:text-zinc-900 flex items-center justify-center text-lg dark:bg-neutral-100 px-4 py-2 rounded-lg transition ease-in-out hover:bg-zinc-600 hover:text-neutral-100 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900">
                    Iniciar sesión <TbSend className="ml-2 text-lg"/>
                  </button>
                </div>
                  </>
                )}
                
              </div>
            </form>
          </div>

          <img
            src={dddepth}
            alt=""
            className="object-cover h-full w-2/5 rounded-tr-xl rounded-br-xl hidden md:block"
          />

        </div>
      </div>
    </>
  );
};
