from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaCompraGanado import ver_compra
from models.ModelCompraGanado import CreateCompraGanado

apiCompraGanado = APIRouter()

@apiCompraGanado.post('/registrarCompraGanado')
async def create_compra_ganado(compra_ganado: CreateCompraGanado):
    registro = dict(compra_ganado)
    registro["fecha_compra"] = registro["fecha_compra"].strftime("%Y-%m-%d")
    registro["total"] = registro["cantidadAK"] * registro["precion_unitario"]
    del registro["id"]
    try:
        conn.ganadodb.compra_ganado.insert_one(registro).inserted_id
        return ver_compra(registro)
    except:
        raise HTTPException(status_code=400, detail="No se pudo registrar la compra de ganado")