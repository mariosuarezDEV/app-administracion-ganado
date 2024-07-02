def Show_Vendedor(vendedor):
    return {
        "id": str(vendedor["_id"]),
        "nombre": vendedor["nombre"],
        "psg": vendedor["psg"]
    }

def Show_Vendedores(vendedores):
    return [Show_Vendedor(vendedor) for vendedor in vendedores]

def nombre_vendedor(vendedor):
    return vendedor["nombre"]

def nombres_vendedores(vendedores):
    return [nombre_vendedor(vendedor) for vendedor in vendedores]