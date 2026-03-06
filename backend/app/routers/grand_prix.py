from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import grand_prix as gp_crud
from app.schemas.grand_prix import GrandPrixOut

# Definir el router con el prefijo /gp
router = APIRouter(prefix="/gp", tags=["Grandes Premios"])

@router.get("/", response_model=List[GrandPrixOut])
def read_gps(db: Session = Depends(get_db)):
    """
    Retorna el calendario de Grandes Premios.
    Incluye todas las sesiones, ordenados por la fecha de la carrera.
    """
    gps = gp_crud.get_all_gps(db)
    return gps