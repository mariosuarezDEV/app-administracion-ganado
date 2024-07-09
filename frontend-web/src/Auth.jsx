import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [autenticate, setAutenticate] = useState(null)
    const url = "http://192.168.100.88:8000/" //Cambiar esta dirección para que el sitio trabaje en LAN (Cambiar la dirección IP por la de la computadora que aloja el backend)
    return (
        <AuthContext.Provider value={{ autenticate, setAutenticate,url }}>
            {children}
        </AuthContext.Provider>
    )
}