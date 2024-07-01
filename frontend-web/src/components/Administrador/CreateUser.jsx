import React from 'react'
import axios from "axios";
import { BiNavigation } from "react-icons/bi";

import {estiloInput} from "../Login/login.jsx";


async function signupAPI(full_name , username, email, password) {
  const userData = {full_name, username,email, password};
  try{
    const response = await axios.post("http://127.0.0.1:8000/signup",userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 306) {
        throw new Error("El correo ya esta registrado");
      }
      if (error.response.status === 400) {
        throw new Error("No fue posible registrar el usuario");
      }
      throw new Error("Error en el servidor");
    }
  }
}


async function sendForm() {
  const fullName = document.getElementById("txtFullName");
  const username = document.getElementById("txtUserName");
  const email = document.getElementById("txtEmail");
  const password = document.getElementById("txtPassword");
  try {
    const user = await signupAPI(fullName.value, username.value, email.value, password.value);
    alert("Usuario registrado con el correo " + user.email);
  } catch (error) {
    alert(error.message);
  }
}

export function CreateUser() {
  return (
    <div className='grid grid-cols-1 px-4 py-3 gap-2 mr-6 ml-6'>
      <h1 className='text-center text-3xl font-bold text-gray-800'>
        Crear un nuevo usuario
      </h1>
      <div className='grid grid-cols-1'>
        {/* Formulario para obtener los datos del usuario */}
        <form action="" method="post" className='flex flex-col gap-4' onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Nombre completo
          </span>
          <input type="text" name="" id="txtFullName" placeholder='Jaime R. Kugler' className='bg-gray-100 px-3 py-2 rounded-lg border-2 mt-0 mb-2 focus:outline-none' required onChange={(e) => {
            e.target.value === "" ? e.target.classList.remove("ring-2"): estiloInput(e.target);
          }}/>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Nombre de usuario
          </span>
          <input type="text" name="" id="txtUserName" placeholder='Stonsuld' className='bg-gray-100 px-3 py-2 rounded-lg border-2 mt-0 mb-2 focus:outline-none' required onChange={(e) =>{
            e.target.value === "" ? estiloInput(e.target) : estiloInput(e.target);
          }} />
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Correo electrónico
          </span>
          <input type="email" name="" id="txtEmail" placeholder='JaimeRKugler@superrito.com' className='bg-gray-100 px-3 py-2 rounded-lg border-2 mt-0 mb-2 focus:outline-none' required onChange={(e) => {
            e.target.value === "" ? estiloInput(e.target) : estiloInput(e.target);
          }}/>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Escribir una contraseña temporal
          </span>
          <input type="password" name="" id="txtPassword" placeholder='Contraseña segura' className='bg-gray-100 px-3 py-2 rounded-lg border-2 mt-0 mb-2 focus:outline-none' required onChange={(e) => {
            e.target.value === "" ? estiloInput(e.target) : estiloInput(e.target);
          }}/>
          <div className='flex justify-center mt-4 text-center'>
            <button className='bg-blue-500 text-white py-2 px-8 rounded-lg transition delay-75 ease-in-out hover:bg-blue-700 flex items-center'><BiNavigation className='inline-block text-lg mr-2'/>Registrar</button>
          </div>
        </form>
        {/* Obtener el codigo de respuesta y de ahi mandar una notificacion */}
      </div>
    </div>
  )
}
