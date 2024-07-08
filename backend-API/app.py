from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.users import apiusr
from routes.vendedores import apivend
from routes.Egresos import apiEgresos
from routes.CompraGanado import apiCompraGanado
from routes.Ingresos import apiIngresos
from routes.Clientes import apiClientes

app = FastAPI()
app.include_router(apiusr)
app.include_router(apivend)
app.include_router(apiEgresos)
app.include_router(apiCompraGanado)
app.include_router(apiIngresos)
app.include_router(apiClientes)

# crear una ruta get
@app.get('/')
def ruta_raiz():
    return {'mensaje': 'Hola Mundo'}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)