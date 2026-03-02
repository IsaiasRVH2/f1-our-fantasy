from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.config import settings
from sqlalchemy import text
import logging

# Configuración básica de logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="F1 Fantasy TCG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.on_event("startup")
def verify_db_connection():
    """
    Intenta conectar a la DB y lanza un mensaje de éxito en consola.
    """
    try:
        # Intentamos ejecutar una consulta simple (SELECT 1)
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        logger.info("Conexión con Backend y DB Establecida ")
    except Exception as e:
        logger.error(f"Error al conectar con la base de datos: {e}")
        # En esta fase, es mejor que el servidor falle si no hay DB 
        raise e