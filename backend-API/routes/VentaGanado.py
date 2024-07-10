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
    

# 1. Seleccionar si se pesa por grupo o individual
# 2. Seleccionar los aretes de los animales (hacer una busqueda de los aretes para obtener su infomacion y mostrarla)
# 3. Poner el peso de los animales (si es en grupo se pone el peso total e internamente se pone el peso promedio de cada animal y si es indivual se le pone el peso al animal)
# 4. Si el peso del animal es igual o mayor a 320 kilos entonces se puede agregar la etiqueta de vender y se pone en true
# 5. Mandar una notificación de los animales listos para la venta a la oficina