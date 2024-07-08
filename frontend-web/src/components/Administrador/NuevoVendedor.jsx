import React, { useState } from 'react'
import { BsPersonFillAdd } from "react-icons/bs";
import axios from 'axios';
import {estiloInput} from "../Login/login.jsx";

async function RegistrarVendedor(nombre, psg) {
    const data = {nombre, psg};
    try {
        const response = await axios.post("http://127.0.0.1:8000/vendedores/registrar", data);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 306) {
                throw new Error("El vendedor ya esta registrado");
            }
            if (error.response.status === 400) {
                throw new Error("No fue posible registrar el vendedor");
            }
            throw new Error("Error en el servidor");
        }
    }
}

export const NuevoVendedor = () => {
    const  [nombre, setNombre] = useState("");
    const [psg, setPsg] = useState("");

    return (
        <>
            <h1 className='text-3xl text-gray-800 font-bold text-center mb-4'>
                Nuevo vendedor de ganado
            </h1>
            <div className='grid grid-cols-1 px-4 py-3 gap-2 mr-6 ml-6'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (nombre === "" || psg === "") {
                        alert("Los campos no pueden estar vacios");
                        return;
                    }
                    try{
                        RegistrarVendedor(nombre, psg)
                        {/* Limpiar campos */}
                        const txtnombre = document.getElementById("txtNombre");
                        const txtpsg = document.getElementById("txtPsg");

                        txtnombre.value = "";
                        txtpsg.value = "";
                        {/* Eliminar etilos de campo verde */}
                        txtnombre.classList.remove("ring-2");
                        txtpsg.classList.remove("ring-2");

                        alert("Vendedor registrado con el nombre " + nombre);
                    } catch (error) {
                        alert(error.message);
                    }
                }} className='flex flex-col gap-4'>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Nombre del vendedor
                    </span>
                    <input type="text" name="" id="txtNombre" placeholder='Vitaliano Quintana Colunga' className='bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none' onChange={(e) => {
                        estiloInput(e.target);
                        try{
                            estiloInput(e.target);
                            setNombre(e.target.value);
                        } catch (error) {
                            console.log(error);
                        }
                    }} required/>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        PSG del vendedor
                    </span>
                    <input type="text" name="" id="txtPsg" placeholder='778 223 991' className='bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none' onChange={(e) => {
                        try{
                            estiloInput(e.target);
                            setPsg(e.target.value);
                        } catch (error) {
                            console.log(error);
                        }

                    }} required/>
                    <div className='flex justify-center mt-4'>
                        <button className='bg-blue-500 text-white py-2 px-8 rounded-lg transition delay-75 ease-in-out hover:bg-blue-700 flex items-center'>
                            <BsPersonFillAdd className='inline-block mr-2 text-lg' />
                            <span className='inline-block'>Guardar</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
