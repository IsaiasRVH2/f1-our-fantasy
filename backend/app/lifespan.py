from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text
from app.database import engine
import logging

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Lógica de Startup
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        logger.info("Conexión con Backend y DB Establecida")
    except Exception as e:
        logger.error(f"Error en la conexión a la DB: {e}")
        raise e
    
    yield  
    
    # Lógica de Shutdown
    logger.info("Sistemas apagándose...")