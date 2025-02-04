from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.users import apiusr
from routes.vendedores import apivend

app = FastAPI()
app.include_router(apiusr)
app.include_router(apivend)

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