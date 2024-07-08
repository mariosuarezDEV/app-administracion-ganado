def ver_ingreso(data):
    return {
        "id": str(data["_id"]),
        "descripcion": data["descripcion"],
        "cantidad": data["cantidad"],
        "fecha": data["fecha"],
        "tipo": data["tipo"]
    }
    
def ultimo_ingreso(data):
    return{
        "descripcion":data["descripcion"],
        "fecha":data["fecha"],
        "cantidad": data["cantidad"]
    }
    
def ultimos_ingresos(data):
    return [ultimo_ingreso(item) for item in data]