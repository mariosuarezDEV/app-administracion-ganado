def ver_cliente(data):
    return {
        "id": str(data["_id"]),
        "nombre": data["nombre"],
        "psg": data["psg"],
        "rfc": data["rfc"]
    }

def nombre_cliente(data):
    return data["nombre"]

def ver_nombres_clientes(data):
    return [nombre_cliente(cliente) for cliente in data]
    
def ver_clientes(data):
    return [ver_cliente(cliente) for cliente in data]