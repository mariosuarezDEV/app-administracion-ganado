from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from datetime import datetime

from schemas.SchemaIngresos import ver_ingreso, ultimo_ingreso, ultimos_ingresos
from models.ModelIngresos import CreateIngreso

apiIngresos = APIRouter()

@apiIngresos.post('/ingresos/registrar')
async def registrar_ingreso(ingreso: CreateIngreso):
    registro = dict(ingreso)
    # Eliminar el id 
    del registro["id"]
    # Dar formato a la fecha
    registro["fecha"] = registro["fecha"].strftime("%Y-%m-%d")
    try:
        id = conn.ganadodb.ingresos.insert_one(registro).inserted_id
        return ver_ingreso(registro)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    
# Ingresos mensuales
@apiIngresos.get('/ingresos/mensuales')
async def sumIngresosMes():
    # Obtener la fecha actual
    fecha = datetime.now()
    fechaInicio = fecha.strftime("%Y-%m-01")
    fechaFin = fecha.strftime("%Y-%m-30")
    filtro = {"fecha": {"$gte": fechaInicio, "$lt": fechaFin}}
    ingresos = conn.ganadodb.ingresos.find(filtro, {"cantidad": 1})
    if ingresos is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str("No se encontraron ingresos"))
    
    # Sumar la cantidad
    total = 0
    for ingreso in ingresos:
        total += ingreso["cantidad"]
    return {"total": total, "fechaInicio": fechaInicio, "fechaFin": fechaFin}

# Endpoint para obtener los ingresos totales
@apiIngresos.get('/ingresos/totales')
async def ingresos_end():
    # Obtener solo los elementos de cantidad
    ingresos = conn.ganadodb.ingresos.find({}, {"cantidad": 1})
    if ingresos is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str("No se encontraron ingresos"))
    
    # Sumar los elementos encontrados
    total = 0
    for ingreso in ingresos:
        total += ingreso["cantidad"]
    # Ya tenemos almacenado el total
    
    return {"total": total} # Retornamos el total

# Obtener los ultimos 3 registros de ingresos
@apiIngresos.get('/ingresos/ultimos')
async def ultimoIngreso():
    egresos = conn.ganadodb.ingresos.find().sort("_id", -1).limit(3)
    if egresos is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str("No se encontraron ingresos"))
    
    return ultimos_ingresos(egresos)