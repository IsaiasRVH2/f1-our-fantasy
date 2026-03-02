from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.database import engine

router = APIRouter(prefix="/health", tags=["System Health"])

@router.get("")
def health_check():
    """
    Verifica el estado de la API y la conexión a la base de datos.
    """
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database connection failed: {str(e)}"
        )