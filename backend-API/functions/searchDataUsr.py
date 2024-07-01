# importar la conexiones la base de datos
from config.db import conn

def search_email(email: str):
    # buscar el correo en la base de datos
    flag = conn.ganadodb.users.find_one({"email": email})
    if flag:
        return True
    return False

# Buscar el nombre de usuario mediante el correo
def search_username(email: str):
    username = conn.ganadodb.users.find_one({"email": email})
    if username:
        return username["username"]
    return False

# Autorizar API mediante el token
def token_auth (token: str):
    usr = search_username(token)
    if not usr:
        return False
    return usr