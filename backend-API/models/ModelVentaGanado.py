from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VentaGanado(BaseModel):
    id: Optional[str] = None
    tipo_venta: str
    aretes_vendidos: list
    total_venta: float
    fecha_venta: datetime
    cliente: str
