from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import grand_prix as gp_crud
from app.schemas.grand_prix import GrandPrixOut, GrandPrixCreate, GrandPrixUpdate
from app.dependencies import get_current_admin_user
from app.core.auth import get_current_user

# Definir el router con el prefijo /gp
router = APIRouter(prefix="/gp", tags=["Grandes Premios"])

@router.get("/", response_model=List[GrandPrixOut], dependencies=[Depends(get_current_user)])
def read_gps(db: Session = Depends(get_db)):
    """
    Retorna el calendario de Grandes Premios.
    Incluye todas las sesiones, ordenados por la fecha de la carrera.
    """
    gps = gp_crud.get_all_gps(db)
    return gps

@router.post("/", response_model=GrandPrixOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin_user)])
def create_gp(gp_in: GrandPrixCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo Gran Premio en el calendario.
    """
    return gp_crud.create_gp(db, gp_in)

@router.patch("/{gp_id}", response_model=GrandPrixOut, dependencies=[Depends(get_current_admin_user)])
def update_gp(gp_id: int, gp_in: GrandPrixUpdate, db: Session = Depends(get_db)):
    """
    Actualiza un Gran Premio existente en el calendario.
    """
    db_gp = gp_crud.get_gp_by_id(db, gp_id)
    if not db_gp:
        raise HTTPException(status_code=404, detail="Gran Premio no encontrado en el calendario.")
    return gp_crud.update_gp(db, db_gp, gp_in)
    
@router.delete("/{gp_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin_user)])
def delete_gp(gp_id: int, db: Session = Depends(get_db)):
    """
    Elimina un Gran Premio del calendario.
    """
    db_gp = gp_crud.get_gp_by_id(db, gp_id)
    if not db_gp:
        raise HTTPException(status_code=404, detail="Gran Premio no encontrado.")
    gp_crud.delete_gp(db, gp_id)
    return None