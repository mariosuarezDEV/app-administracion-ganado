from fastapi import APIRouter, HTTPException, Depends, status
from config.db import conn

from schemas.SchemaUsers import show_user, show_users
from models.ModelUsers import CreateUser, LoginUser

# Mis funciones
from functions.searchDataUsr import search_email, search_username, token_auth
from functions.hashPassword import hash_password, verify_password

# Autenticación de usuarios
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

apiusr = APIRouter()
oauth = OAuth2PasswordBearer(tokenUrl="login")

async def token_auth (token: str = Depends(oauth)):
    usr = token_auth(token)
    if not usr:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Acceso denegado")
    return usr

@apiusr.post('/signup')
async def signup(user: CreateUser):
    # Obtener los datos del usuario
    new_user = dict(user)
    # Validar que el correo no exista
    if search_email(new_user["email"]):
        raise HTTPException(status_code=status.HTTP_306_RESERVED, detail="El correo ya existe")
    else:
        # Encriptar la contraseña
        new_user["password"] = hash_password(new_user["password"])
        del new_user["id"] # eliminamos el id ya que se genera automaticamente
        id = conn.ganadodb.users.insert_one(new_user).inserted_id # insertamos el usuario con un id
        usr = conn.ganadodb.users.find_one({"_id": id}) # buscamos el usuario para devolverlo    
        if usr:
            return show_user(usr)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario no creado")
    
@apiusr.post('/login')
async def login(data: LoginUser):
    data.username= search_username(data.username)
    if not data.username:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado en la base de datos")
    # guardar los datos del usuario
    usrdat = conn.ganadodb.users.find_one({"username": data.username})
    #print(usrdat["password"])
    # validar que la contraseña sea coreccta
    if not verify_password(data.password, usrdat["password"]):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contraseña incorrecta")
    return {
        'access_token': data.username,
        'token_type': 'bearer',
        'full_name': usrdat["full_name"],
    }

@apiusr.get('/users')
async def find_all_users(user: CreateUser = Depends(token_auth)):
    return show_users(conn.ganadodb.users.find())