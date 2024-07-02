from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaUsers import show_user, show_users
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
        return {"mensaje": "Egreso registrado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str("No se pudo registrar el egreso"))