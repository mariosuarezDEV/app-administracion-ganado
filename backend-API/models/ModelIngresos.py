from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CreateIngreso(BaseModel):
    id: Optional[str] = None
    descripcion: str
    cantidad: float
    fecha: datetime
    tipo: str #Banco o Efectivo