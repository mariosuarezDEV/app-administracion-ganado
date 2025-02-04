import React  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import './index.css'

// Componentes de la aplicación
import {Login} from './components/Login/login.jsx'
import {Navigation, InitPage} from './components/Administrador/index.jsx'
import {CreateUser} from './components/Administrador/CreateUser.jsx'
import { Administracion } from "./components/Administrador/Administracion.jsx";
import { NuevoVendedor } from "./components/Administrador/NuevoVendedor.jsx";

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
            path="/admin"
            element={
                <div className="">
                <Navigation /> <InitPage />
                </div>
            }
            />
            <Route
            path="/admin/panel"
            element={
                <div className="">
                <Navigation /> <Administracion/>
                </div>
            }
            />
            <Route
            path="/admin/new-usr"
            element={
                <div className="">
                <Navigation /> <CreateUser />
                </div>
            }
            />
            <Route
            path="/admin/nuevo-vendedor"
            element={
                <div className="">
                <Navigation /> <NuevoVendedor />
                </div>
            }
            />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>

);