import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Auth";

import Typewriter from "typewriter-effect";

import { animate__fadeInDown } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";

import { RiArticleFill } from "react-icons/ri";
import { IoExit } from "react-icons/io5";
import { IoIosArrowDroprightCircle } from "react-icons/io";

import bannerUno from "../img/bannerUno.jpg"
import bannerdos from "../img/bannerdos.jpg"

// Diseño de la plataforma para ganaderos
export const Index = () => {
  const { autenticate } = useContext(AuthContext);
  return (
    <>
    <div className="bg-zinc-50 h-full">
    <div className="flex flex-col justify-center text-center md:flex-row gap-2 text-3xl items-center py-16">
        <h1 className="text-gray-800">Bienvenido de nuevo</h1>
        <h1 className="font-bold text-4xl text-gray-900">
          <Typewriter
          options={{delay: 32}}
            onInit={(typewriter) => {
              typewriter.typeString(autenticate.full_name).start();
            }}
          />
        </h1>
      </div>

      <Fade
        direction="down"
        delay="80" className=" ml-4 mr-4 px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center text-center gap-10">
                <div className="bg-white rounded-xl shadow-md flex flex-col text-left">
                    {/* imagen */}
                    <img src={bannerdos} className="rounded-tl-xl rounded-tr-xl object-cover shadow-sm mb-2 h-44" alt="" />
                    {/* titulo con icono */}
                    <div className="flex items-center px-4 py-3 text-gray-800">
                        <RiArticleFill className="mr-4 text-4xl"/><h1 className="text-2xl font-bold">Venta de ganado</h1> 
                    </div>
                    {/* Descripcion */}
                    <p className="px-4 py-3 text-lg text-gray-700">
                        Registra la información necesaria, <b>¡el sistema se encargará de hacer el resto!</b>.
                    </p>
                    {/* Boton */}
                    <div className="flex justify-center items-center py-5 mt-3 bg-neutral-50 rounded-bl-xl rounded-br-xl h-full border-t-2 border-neutral-400 hover:bg-gray-100">
                        <button className="flex items-center text-lg font-bold text-gray-900 rounded-bl-xl rounded-br-xl">
                            Realizar venta <IoIosArrowDroprightCircle className="text-lg ml-3"/>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md flex flex-col text-left">
                    {/* imagen */}
                    <img src={bannerdos} className="rounded-tl-xl rounded-tr-xl object-cover shadow-sm mb-2 h-44" alt="" />
                    {/* titulo con icono */}
                    <div className="flex items-center px-4 py-3 text-gray-800">
                        <RiArticleFill className="mr-4 text-4xl"/><h1 className="text-2xl font-bold">Recibir ganado</h1> 
                    </div>
                    {/* Descripcion */}
                    <p className="px-4 py-3 text-lg text-gray-700">
                        Registra la información necesaria, <b>¡el sistema se encargará de hacer el resto!</b>.
                    </p>
                    {/* Boton */}
                    <div className="flex justify-center items-center py-5 mt-3 bg-neutral-50 rounded-bl-xl rounded-br-xl h-full border-t-2 border-neutral-400 hover:bg-gray-100">
                        <button className="flex items-center text-lg font-bold text-gray-900 rounded-bl-xl rounded-br-xl">
                            Registrar compra <IoIosArrowDroprightCircle className="text-lg ml-3"/>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md flex flex-col text-left">
                    {/* imagen */}
                    <img src={bannerdos} className="rounded-tl-xl rounded-tr-xl object-cover shadow-sm mb-2 h-44" alt="" />
                    {/* titulo con icono */}
                    <div className="flex items-center px-4 py-3 text-gray-800">
                        <RiArticleFill className="mr-4 text-4xl"/><h1 className="text-2xl font-bold">Administrar ganado</h1> 
                    </div>
                    {/* Descripcion */}
                    <p className="px-4 py-3 text-lg text-gray-700">
                        Registra la información necesaria, <b>¡el sistema se encargará de hacer el resto!</b>.
                    </p>
                    {/* Boton */}
                    <div className="flex justify-center items-center py-5 mt-3 bg-neutral-50 rounded-bl-xl rounded-br-xl h-full border-t-2 border-neutral-400 hover:bg-gray-100">
                        <button className="flex items-center text-lg font-bold text-gray-900 rounded-bl-xl rounded-br-xl">
                            Ver ganado <IoIosArrowDroprightCircle className="text-lg ml-3"/>
                        </button>
                    </div>
                </div>

                <div>

                </div>
                <div className="flex rounded-xl bg-red-500 text-white px-3 py-2 justify-center mb-5 mt-5 hover:bg-red-600">
                    <button className="flex items-center text-center text-xl">
                        <IoExit className="text-xl mr-3"/> Cerrar sesión
                    </button>
                </div>

                <div>

                </div>
            </div>
      </Fade>
    </div>
    </>
  );
};
