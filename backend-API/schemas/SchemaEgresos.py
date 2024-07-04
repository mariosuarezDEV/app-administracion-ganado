def verEgreso(data):
    return{
        "id":str(data["_id"]),
        "descripcion":data["descripcion"],
        "cantidad":data["cantidad"],
        "fecha":data["fecha"],
        "forma_pago":data["tipo"]
    }

def verEgresos(data):
    return [verEgreso(item) for item in data]