from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaClientes import ver_cliente, ver_clientes, ver_nombres_clientes, nombre_cliente
from models.ModelCliente import Createcliente

apiClientes = APIRouter()

@apiClientes.post('/clientes/registrar')
async def create_cliente(cliente: Createcliente):
    registro = dict(cliente)
    del registro["id"]
    try:
        conn.ganadodb.clientes.insert_one(registro).inserted_id
        return ver_cliente(registro)
    except:
        raise HTTPException(status_code=400, detail="No se pudo registrar el cliente")
    

# Obtener el nombre de los clientes
@apiClientes.get('/clientes/nombres')
async def get_clientes():
    try:
        clientes = conn.ganadodb.clientes.find()
        return ver_nombres_clientes(clientes)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Clientes no encontrados")