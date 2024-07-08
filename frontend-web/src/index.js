import React  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import './index.css'

// Componentes de la aplicación
import {Login} from './components/Login/login.jsx'
import {Navigation} from './components/Administrador/NavegacionOficina.jsx'
import {Index} from './components/Ganaderos/Index.jsx'
import {InitPage} from './components/Administrador/index.jsx'
import {CreateUser} from './components/Administrador/CreateUser.jsx'
import { Administracion } from "./components/Administrador/Administracion.jsx";
import { NuevoVendedor } from "./components/Administrador/NuevoVendedor.jsx";
import { ComprarGanado } from "./components/Administrador/ComprarGanado.jsx";
import { AddGanado } from "./components/Administrador/AddGanado.jsx";
import { AgregarCliente } from "./components/Administrador/AgregarCliente.jsx";

import {VenderGanado} from './components/Ganaderos/VenderGanado.jsx'

// Contexto de autenticación (Documentado)
import {AuthProvider} from './Auth.jsx'
import { Protector } from "./Protector.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          index
          element={
            <div className="h-screen">
              <Login />
            </div>
          }
        />
        {/* Rutas para el administrador */}
        <Route element={<Protector />}>
            <Route
            path="/oficina"
            element={
                <div className="">
                <Navigation /> <InitPage />
                </div>
            }
            />
            <Route
            path="/oficina/panel"
            element={
                <div className="">
                <Navigation /> <Administracion/>
                </div>
            }
            />
            <Route
            path="/oficina/new-usr"
            element={
                <div className="">
                <Navigation /> <CreateUser />
                </div>
            }
            />
            <Route
            path="/oficina/nuevo-vendedor"
            element={
                <div className="">
                <Navigation /> <NuevoVendedor />
                </div>
            }
            />
            <Route
            path="/oficina/comprar-ganado"
            element={
                <div className="">
                <Navigation /> <ComprarGanado />
                </div>
            }
            />
            <Route
            path="/oficina/organizar-ganado"
            element={
                <div className="">
                <Navigation /> <AddGanado />
                </div>
            }
            />
            <Route
            path="/oficina/agregar-cliente"
            element={
                <div className="">
                <Navigation /> <AgregarCliente />
                </div>
            }
            />
        </Route>
        {/* Rutas para el ganadero */}
        <Route element= {<Protector />}>
            <Route
            path="/ganadero"
            element={
                <div className="h-screen">
                <Index />
                </div>
            }/>
            
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
);