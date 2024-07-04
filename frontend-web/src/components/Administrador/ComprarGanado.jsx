import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

async function realizar_compra(vendedor, cantidad, fecha, tipoCobro, precioUnitario, payment){
  try{
    const response = await axios.post("http://127.0.0.1:8000/registrarCompraGanado",{
      proveedor: vendedor,
      cantidadAK: cantidad,
      fecha_compra: fecha,
      tipo_cobro: tipoCobro,
      precion_unitario: precioUnitario,
      forma_pago: payment
    })
    return response.data;
  } catch(error){
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("No se pudo realizar la compra");
      }
      throw new Error("Error en el servidor");
    }
  }
}

async function realizar_egreso(vendedor, fecha, payment, montoFinal){
  try{
    const response = await axios.post("http://127.0.0.1:8000/registrarEgreso",{
      descripcion: "Compra de ganado con el proveedor " + vendedor,
      cantidad: montoFinal,
      fecha: fecha,
      tipo: payment
    })
    return response.data;
  } catch (error){
    if (error.response){
      if (error.response.status === 400){
        throw new Error("No se pudo realizar el egreso");
      }
      throw new Error("Error en el servidor");
    }
  }
}

const validar_y_hacer_pago = (proveedor, cantidadAK, fecha_compra, tipo_cobro, precio_cu, forma_pago, total, efectivo,banco ) => {
  const validar_monto = (recibido, total) =>{
      if (recibido === total){
        return true; // el monto no es igual al esperado
      }
  }
  switch (forma_pago) {
    case "Efectivo":
      if (validar_monto(efectivo, total)){

        realizar_egreso(proveedor, fecha_compra, forma_pago, efectivo);

        realizar_compra(proveedor, cantidadAK, fecha_compra, tipo_cobro, precio_cu, forma_pago);
        return true;
      }
      break;
    case "Banco":
      if (validar_monto(banco, total)){
        realizar_egreso(proveedor, fecha_compra, forma_pago, banco);

        realizar_compra(proveedor, cantidadAK, fecha_compra, tipo_cobro, precio_cu, forma_pago);
        return true;
      }
      break;
    case "Ambos":
      if (validar_monto(efectivo+banco, total)){
        realizar_egreso(proveedor, fecha_compra, "Efectivo", efectivo);
        realizar_egreso(proveedor, fecha_compra, "Banco", banco);

        realizar_compra(proveedor, cantidadAK, fecha_compra, tipo_cobro, precio_cu, forma_pago);
        return true;
      }
      break;
    default:
      return false;
  }
}


export const ComprarGanado = () => {
  const navegar = useNavigate();
  const [nombreProvedores, setNombreProvedores] = useState([]);

  // Datos del formulario
  const [vendedor, setVendedor] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [tipoCobro, setTipoCobro] = useState(null); // 1 = animal, 2 = kilogramo
  const [precioUnitario, setPrecioUnitario] = useState(null);
  const [payment, setPayment] = useState(null);
  const [totalEfectivo, setTotalEfectivo] = useState(null);
  const [totalBanco, setTotalBanco] = useState(null);

  const [montototal, setMontototal] = useState(null);
  let monto = 0;


  useEffect(() => {
    const ObtenerProveedores = async () =>{
      try {
        const response = await axios.get("http://127.0.0.1:8000/vendedores/nombres");
        setNombreProvedores(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            throw new Error("No hay proveedores registrados");
          }
          throw new Error("Error en el servidor");
        }
      }
    }
    ObtenerProveedores();
  }, []);

  
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4 mt-2">
        Comprar ganado
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-3">
        {/* Detalles de la compra */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-2 text-center">
            Detalles de la compra
          </h2>
          <form action="" className="flex flex-col" onSubmit={(e) =>{
            e.preventDefault();
          }}>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Selecciona al proveedor
            </span>
            <select
              name=""
              id="selectVendedor"
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required onChange={(e) => {
                setVendedor(e.target.value);
              }}
            >
              <option value="">Selecciona un proveedor</option>
              {nombreProvedores.length>0 ? (
                nombreProvedores.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <option value="">No hay proveedores registrados</option>
              )}
            </select>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Cantidad de animales o kilos comprados
            </span>
            <input
              type="text"
              name=""
              id="txtCantidad"
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required onChange={(e) => {
                let cantidadi = parseInt(e.target.value);
                setCantidad(cantidadi);
                // establecer el monto total
                monto = cantidadi * precioUnitario;
                setMontototal(monto);
              }}
            />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Fecha de la compra
            </span>
            <input
              type="date"
              name=""
              id="dateCompra"
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required onChange={(e) => {
                setFecha(e.target.value);
                //alert(e.target.value);
              }}
            />
          </form>
        </div>

        {/* Detalles de ganado */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-2 text-center">
            Información de compra
          </h2>
          <form action="" className="flex flex-col" onSubmit={(e) =>{
            e.preventDefault();
          }}>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Tipo de cobro
            </span>
            <select
              name=""
              id=""
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required onChange={(e) =>{
                setTipoCobro(e.target.value);
              }}
            >
              <option value="">Selecciona el tipo de cobro</option>
              <option value="Animal">Por animal</option>
              <option value="Kilo">Por kilogramo</option>
            </select>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Precio unitario
            </span>
            <input
              type="text"
              name=""
              id="txtPrecioUnitario"
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required onChange={(e) => {
                //Pasar como float
                let preciof = parseFloat(e.target.value);
                setPrecioUnitario(preciof);
                setMontototal(preciof * cantidad);
              }}
            />
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Método de pago
            </span>
            <select
              name=""
              id="selectPay"
              className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
              required
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            >
              <option value="">Selecciona el método de pago</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Banco">Banco</option>
              <option value="Ambos">Ambos</option>
            </select>
            {payment === "Banco" && (
              <>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Ingresa la cantidad total pagada
                </span>
                <input
                  type="text"
                  name=""
                  id="txtBanco"
                  className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
                  required onChange={(e) => {
                    //Pasar como float
                    let bancof = parseFloat(e.target.value);
                    if (bancof > montototal) {
                      alert("El pago no puede ser mayor al monto total");
                      e.target.value = montototal;
                      setTotalBanco(montototal);
                      // poner el estilo en rojo
                      e.target.style.borderColor = "orange";
                    } else{
                      setTotalBanco(bancof);
                    }
                  }}
                />
              </>
            )}

            {payment === "Efectivo" && (
              <>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Ingresa la cantidad total pagada
                </span>
                <input
                  type="text"
                  name=""
                  id="txtEfectivo"
                  className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none"
                  required onChange={(e) => {
                    //Pasar como float
                    let efectivof = parseFloat(e.target.value);
                    if (efectivof > montototal) {
                      alert("El pago no puede ser mayor al monto total");
                      e.target.value = montototal;
                      setTotalEfectivo(montototal);
                      // poner el estilo en rojo
                      e.target.style.borderColor = "orange";
                    } else{
                      setTotalEfectivo(efectivof);
                    }
                  }}
                />
              </>
            )}
            {payment === "Ambos" && (
              <>
                <div className="grid grid-cols-2 gap-x-5">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 col-span-2">
                    Ingresa la cantidad total pagada
                  </span>
                  <input
                    type="text"
                    name=""
                    id="txtEfectivoAmbos"
                    className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none col-span-1"
                    placeholder="Total en efectivo" onChange={(e) => {
                      //Pasar como float
                      let efectivof = parseFloat(e.target.value);
                      if (efectivof > montototal) {
                        alert("El pago no puede ser mayor al monto total");
                        e.target.value = montototal;
                        // poner el estilo en rojo
                        e.target.style.borderColor = "orange";
                      }
                      // Validar que el valor esta dentro del rango
                      const resta = montototal - totalBanco;
                      if(efectivof > resta){
                        alert("Este monto excede el total a pagar");
                        e.target.value = resta;
                        setTotalEfectivo(resta);
                        e.target.style.borderColor = "orange";
                      } else{
                        setTotalEfectivo(efectivof);
                      }
                      
                    }}
                  />
                  <input
                    type="text"
                    name=""
                    id="txtBancoAmbos"
                    className="bg-gray-100 px-4 py-2 rounded-lg border-2 mt-1 mb-4 focus:outline-none col-span-1"
                    placeholder="Total en banco" onChange={(e) => {
                      //Pasar como float
                      let bancof = parseFloat(e.target.value);
                      if (bancof > montototal) {
                        alert("El pago no puede ser mayor al monto total");
                        e.target.value = montototal;
                        // poner el estilo en rojo
                        e.target.style.borderColor = "orange";
                      }

                      // Validar que el valor esta dentro del rango
                      const resta = montototal - totalEfectivo;
                      if(bancof > resta){
                        alert("Este monto excede el total a pagar");
                        e.target.value = resta;
                        setTotalBanco(resta);
                        e.target.style.borderColor = "orange";
                      } else{
                        setTotalBanco(bancof);
                      }
                    }}
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      {/* Boton para mandar los dos formularios */}
      <div className="flex justify-center mt-4 mb-10">
        <button className="bg-blue-500 text-white px-5 py-2 rounded-xl flex items-center transition delay-75 ease-in-out hover:bg-blue-700 shadow-md duration-300" onClick={() =>{
          // validar que los campos no esten vacios
          if(vendedor === null || cantidad === null || fecha === null || tipoCobro === null || precioUnitario === null || payment === null || totalEfectivo === null && totalBanco === null){
            alert("Todos los campos son obligatorios");
            return;
          } else{
            if(validar_y_hacer_pago(vendedor, cantidad, fecha, tipoCobro, precioUnitario, payment, montototal, totalEfectivo, totalBanco)){
              alert("Compra realizada con exito");
              navegar("/admin");
            }else{
              alert("Los datos parecen incorrectos, por favor revisa los campos");
            }
          }

        }}>
          <FaCartShopping className="inline-block text-xl mr-2" /> Realizar
          compra
        </button>
      </div>
    </>
  );
};
