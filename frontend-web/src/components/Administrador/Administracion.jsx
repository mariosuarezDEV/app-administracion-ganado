import React from 'react'
import { BsPersonFillAdd } from "react-icons/bs";
import {useNavigate} from "react-router-dom";


export const Administracion = () => {
    const navigate = useNavigate();
    return(
        <>
            <h1 className='text-3xl font-bold text-gray-800 text-center'>
                Panel de Administración
            </h1>
            {/* Agregar un menu de botones para agregar nuevas personas fisicas a la plataforma */}
            <div className='grid grid-cols-3 mt-4 mb-4 px-2 py-3 gap-3'>
                <h2 className='col-span-3 text-xl text-gray-800 font-bold mb-2'>
                    Registrar nuevas personas
                </h2>
                <div className='flex justify-center'>
                    <button className='flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 w-full transition delay-75 ease-in-out hover:bg-blue-700' onClick={() => {
                        navigate('/oficina/nuevo-vendedor');
                    }}>
                        <BsPersonFillAdd className='inline-block mr-2 text-xl'/> Vendedor
                    </button>
                </div>

                <div className='flex justify-center items-center'>
                    <button className='flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 w-full transition delay-75 ease-in-out hover:bg-blue-700' onClick={() => {
                        navigate('/oficina/agregar-cliente');
                    }}>
                        <BsPersonFillAdd className='inline-block mr-2 text-xl'/>Cliente
                    </button>
                </div>

                <div className='flex justify-center items-center'>
                    <button className='flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 w-full transition delay-75 ease-in-out hover:bg-blue-700' onClick={() => {
                        navigate('/oficina/new-usr');
                    }}>
                        <BsPersonFillAdd className='inline-block mr-2 text-xl'/> Usuario
                    </button>
                </div>
            </div>
            <hr className='mr-10 ml-10'/>
        </>
    );
}
