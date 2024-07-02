from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaEgresos import verEgreso, verEgresos
from models.ModelEgresos import CreateEgreso

apiEgresos = APIRouter()

@apiEgresos.post('/registrarEgreso')
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
        return verEgreso(registro)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str("No se pudo registrar el egreso"))
    
@apiEgresos.get('/precioEgresos')
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