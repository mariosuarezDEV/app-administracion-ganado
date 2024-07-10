import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth";


export const VenderGanado = () => {
    const { autenticate } = useContext(AuthContext);
    return (
        <div>
            <h1>Vender Ganado</h1>
        </div>
    );
}