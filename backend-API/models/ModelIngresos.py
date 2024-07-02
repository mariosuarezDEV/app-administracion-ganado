from pydantic import BaseModel
from typing import Optional

class CreateIngreso(BaseModel):
    id: Optional[str] = None
    descripcion: str
    cantidad: float
    fecha: str