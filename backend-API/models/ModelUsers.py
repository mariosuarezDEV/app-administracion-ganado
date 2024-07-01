# modelo de el documentos de usuarios
from typing import Optional
from pydantic import BaseModel

class CreateUser(BaseModel):
    id: Optional[str] = None
    full_name: str
    username: str
    email: str
    password: str

class LoginUser(BaseModel):
    username: str
    password: str