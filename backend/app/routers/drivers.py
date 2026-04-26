from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.crud import driver as driver_crud
from app.schemas.driver import DriverOut, DriverCreate, DriverUpdate
from app.dependencies import get_current_admin_user
from app.core.auth import get_current_user

# Definimos el router con su prefijo
router = APIRouter(prefix="/drivers", tags=["Pilotos"])

@router.get("/", response_model=List[DriverOut], dependencies=[Depends(get_current_user)])
def read_drivers(db: Session = Depends(get_db)):
    """
    Retorna la lista de todos los pilotos disponibles en la tabla drivers.
    """
    drivers = driver_crud.get_all_drivers(db)
    return drivers

@router.get("/free-agents", response_model=List[DriverOut], dependencies=[Depends(get_current_user)])
def read_free_agents(gp_id: int | None = None, db: Session = Depends(get_db)):
    """
    Retorna la lista de pilotos no asignados para un GP.
    Si no se envía gp_id, usa el GP activo.
    """
    return driver_crud.get_free_agents(db, gp_id)

@router.get("/my-assigned", response_model=List[DriverOut], dependencies=[Depends(get_current_user)])
def read_my_assigned_drivers(
    gp_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Retorna la lista de pilotos asignados al usuario autenticado para un GP específico.
    """
    return driver_crud.get_user_assigned_drivers(db, current_user.id, gp_id)

@router.post("/", response_model=DriverOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin_user)])
def create_driver(driver_in: DriverCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo piloto en la base de datos.
    """
    return driver_crud.create_driver(db, driver_in)

@router.patch("/{driver_id}", response_model=DriverOut, dependencies=[Depends(get_current_admin_user)])
def update_driver(driver_id: int, driver_in: DriverUpdate, db: Session = Depends(get_db)):
    """
    Actualiza un piloto existente en la base de datos.
    """
    db_driver = driver_crud.get_driver_by_id(db, driver_id)
    if not db_driver:
        raise HTTPException(status_code=404, detail="Piloto no encontrado en el paddock.")
    return driver_crud.update_driver(db, db_driver, driver_in)

@router.delete("/{driver_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin_user)])
def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    """
    Elimina un piloto existente en la base de datos.
    """
    db_driver = driver_crud.get_driver_by_id(db, driver_id)
    if not db_driver:
        raise HTTPException(status_code=404, detail="Piloto no encontrado.")
    driver_crud.delete_driver(db, driver_id)
    return None