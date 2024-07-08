from pydantic import BaseModel
from typing import Optional

class Createcliente(BaseModel):
    id: Optional[str] = None
    nombre: str
    psg: str
    rfc: str
    