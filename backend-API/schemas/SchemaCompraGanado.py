def ver_compra(data):
    return {
        "id": str(data["_id"]),
        "proveedor": data["proveedor"],
        "cantidadAK": data["cantidadAK"],
        "fecha_compra": data["fecha_compra"],
        "tipo_cobro": data["tipo_cobro"],
        "precion_unitario": data["precion_unitario"],
        "forma_pago": data["forma_pago"],
        "total": data["total"]
    }