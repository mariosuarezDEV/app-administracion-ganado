import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [autenticate, setAutenticate] = useState(null)
    return (
        <AuthContext.Provider value={{ autenticate, setAutenticate }}>
            {children}
        </AuthContext.Provider>
    )
}