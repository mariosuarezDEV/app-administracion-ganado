def ver_ganado_vendido(data):
    return{
        "id": str(data["_id"]),
        "tipo_venta": data["tipo_venta"],
        "aretes_vendidos": data["aretes_vendidos"],
        "total_venta": data["total_venta"],
        "fecha_venta": data["fecha_venta"],
        "cliente": data["cliente"]
    }

def ventaGanadero(data):
    return{
        "id": str(data["_id"]),
        "cantidadVendida": data["cantidadVendida"],
        "tipoVenta": data["tipoVenta"], # "tipoVenta": "animal o kilo"
        "aretes": data["aretes"],
        "pesoTotal": data["pesoTotal"],
        "fecha": data["fecha"]
    }

def ventaOficina(data):
    return{
        "id": str(data["_id"]),
        "ingreso": data["ingreso"],
        "fecha": data["fecha"],
        "cliente": data["cliente"]
    }

