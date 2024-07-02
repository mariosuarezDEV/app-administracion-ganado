from typing import Optional
from pydantic import BaseModel

class Vendedor(BaseModel):
    id: Optional[str] = None
    nombre: str
    psg: str
    