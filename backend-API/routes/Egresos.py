from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from datetime import datetime

from schemas.SchemaEgresos import verEgreso, verEgresos, ultimo_egreso, ultimos_egresos
from models.ModelEgresos import CreateEgreso

apiEgresos = APIRouter()

@apiEgresos.post('/egresos/registrar')
async def create_egreso(egreso: CreateEgreso):
    # creamos un diccionario para almacenar el json del modelo
    registro = dict(egreso)
    # Eliminamos el ID
    del registro["id"]
    # Le damos formato a la fecha
    registro["fecha"] = registro["fecha"].strftime("%Y-%m-%d")
    # insertar el registro
    try:
        id = conn.ganadodb.egresos.insert_one(registro).inserted_id
        data = conn.ganadodb.egresos.find_one({"_id": id})
        return verEgreso(data)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    
@apiEgresos.get('/egresos/totales')
async def sumEgresos():
    # Obtener solo los elementos de cantidad
    egresos = conn.ganadodb.egresos.find({}, {"cantidad": 1})
    if egresos is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str("No se encontraron egresos"))
    # Sumar los elementos de cantidad
    total = 0
    for egreso in egresos:
        total += egreso["cantidad"]
    return {"total": total}

# EndPoint para obtener la suma de todos los egresos de el mes en el que estamos
@apiEgresos.get('/egresos/mensuales')
async def sumEgresosMes():
    # Obtener la fecha actual
    fecha = datetime.now()
    # Solo guardar mes
    fechaInicio = fecha.strftime("%Y-%m-01")
    fechaFin = fecha.strftime("%Y-%m-30") # El numero 31 es solo para tener un rango de fecha
    
    filtro = {"fecha": {"$gte": fechaInicio, "$lt": fechaFin}} # Obtenemos la informacion de los documentos que sean mayor o igual (gte) a la fechaInicio y menor (lt) a la fechaFin
    
    egresos = conn.ganadodb.egresos.find(filtro, {"cantidad": 1}) # Hacemos la query aplicando un find donde se pone el filtro de las fechas y muestra solo el campo cantidad ({"cantidad": 1})
    
    if egresos is None: # Sino obtenemos ingresos entonces mandamos un 404 y se trata desde el frontend
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str("No se encontraron egresos"))
    
    # Sumar los elementos de cantidad
    total = 0
    for egreso in egresos:
        total += egreso["cantidad"]
    return {"total": total, "fechaInicio": fechaInicio, "fechaFin": fechaFin} #En el front end solo obtenemos el total


# Obtener los ultimos 3 registros de egresos
@apiEgresos.get('/egresos/ultimos')
async def ultimosEgresos():
    egresos = conn.ganadodb.egresos.find().sort("_id", -1).limit(3)
    if egresos is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str("No se encontraron egresos"))
    
    return ultimos_egresos(egresos)