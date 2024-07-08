import { axios } from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AddGanado = () => {
    const location = useLocation();
    const {cantidad} = location.state || {};
    // Se debe subir una foto a plataforma y desde ahi obtener los aretes de cada animal
    return (
        <>
        </>
    );
}