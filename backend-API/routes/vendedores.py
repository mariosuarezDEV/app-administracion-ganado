from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaVendedor import Show_Vendedor, Show_Vendedores
from models.ModelVendedores import Vendedor

# Mis funciones

# Autenticación de usuarios

apivend = APIRouter()

@apivend.post('/registrar-vendedor')
async def registrar_vendedor(vendedor: Vendedor):
    vendedor = dict(vendedor)
    # Eliminar el id para crear uno nuevo interno
    del vendedor["id"]
    # Insertar el vendedor
    id = conn.ganadodb.vendedores.insert_one(vendedor).inserted_id
    try:
        vendedor = conn.ganadodb.vendedores.find_one({"_id": id})
        return Show_Vendedor(vendedor)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Vendedor no creado")
