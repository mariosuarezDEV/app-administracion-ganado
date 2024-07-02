def verEgreso(data):
    id = str(data["_id"])
    descripcion = data["descripcion"]
    cantidad = data["cantidad"]
    fecha = data["fecha"]
    forma_pago = data["forma_pago"]

def verEgresos(data):
    return [verEgreso(item) for item in data]