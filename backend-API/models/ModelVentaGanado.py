from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Modelo para ganaderos

class VentaGanaderos(BaseModel):
    id: Optional[str] = None
    cantidadVendida: float
    tipoVenta: str
    aretes : list
    pesoTotal: float
    fecha: datetime

class VentaOficina(BaseModel):
    id: Optional[str] = None
    ingreso: float
    fecha: datetime
    cliente: str

