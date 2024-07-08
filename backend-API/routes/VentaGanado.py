from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaVentaGanado import ventaGanadero, ventaOficina
from models.ModelVentaGanado import VentaGanaderos, VentaOficina

ventaGanado = APIRouter()

@ventaGanado.post('/vender/ganado/rancho')
async def vender_ganado_rancho(venta: VentaGanaderos):
    venta = dict(venta)
    # Eliminar el id para crear uno nuevo interno
    del venta["id"]
    # Insertar la venta
    id = conn.ganadodb.venta_ganado_rancho.insert_one(venta).inserted_id
    try:
        venta = conn.ganadodb.venta_ganado_rancho.find_one({"_id": id})
        return ventaGanadero(venta)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Venta no creada")
    
@ventaGanado.post('/vender/ganado/oficina')
async def vender_ganado_oficina(venta: VentaOficina):
    venta = dict(venta)
    # Eliminar el id para crear uno nuevo interno
    del venta["id"]
    # Insertar la venta
    id = conn.ganadodb.venta_ganado_oficina.insert_one(venta).inserted_id
    try:
        venta = conn.ganadodb.venta_ganado_oficina.find_one({"_id": id})
        return ventaOficina(venta)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Venta no creada")