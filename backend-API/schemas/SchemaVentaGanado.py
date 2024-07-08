def ver_ganado_vendido(data):
    return{
        "id": str(data["_id"]),
        "tipo_venta": data["tipo_venta"],
        "aretes_vendidos": data["aretes_vendidos"],
        "total_venta": data["total_venta"],
        "fecha_venta": data["fecha_venta"],
        "cliente": data["cliente"]
    }