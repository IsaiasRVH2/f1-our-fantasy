from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import driver as driver_crud
from app.schemas.driver import DriverOut

# Definimos el router con su prefijo
router = APIRouter(prefix="/drivers", tags=["Pilotos"])

@router.get("/", response_model=List[DriverOut])
def read_drivers(db: Session = Depends(get_db)):
    """
    Retorna la lista de todos los pilotos disponibles en la tabla drivers.
    """
    drivers = driver_crud.get_all_drivers(db)
    return drivers