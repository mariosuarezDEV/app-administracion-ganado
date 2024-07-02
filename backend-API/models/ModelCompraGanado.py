from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CreateCompraGanado(BaseModel):
    id: Optional[str] = None
    proveedor: str
    cantidadAK: float
    fecha_compra: datetime
    tipo_cobro: str
    precion_unitario: float
    forma_pago: str # Esto define el tipo de Egreso que se registrara
    total: Optional[float] = None