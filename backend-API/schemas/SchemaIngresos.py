def ver_ingreso(data):
    return {
        "id": str(data["_id"]),
        "descripcion": data["descripcion"],
        "cantidad": data["cantidad"],
        "fecha": data["fecha"],
        "tipo": data["tipo"]
    }