from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.dependencies import get_current_admin_user
from app.schemas.race_results import RaceResultCreate, RaceResultOut
from app.crud import race_results as results_crud

# Usamos el prefijo /admin/results
router = APIRouter(prefix="/admin/results", tags=["Resultados de Carrera"])

@router.post("/{gp_id}", response_model=List[RaceResultOut], status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin_user)])
def upload_race_results(
    gp_id: int, 
    results: List[RaceResultCreate], 
    db: Session = Depends(get_db)
):
    """
    Carga o sobrescribe los resultados oficiales de un Gran Premio específico.
    Solo accesible para el Director de Carrera (Admin).
    """
    # Asegurar que el body no traiga IDs de otro GP
    for r in results:
        if r.gp_id != gp_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail=f"Un resultado tiene gp_id {r.gp_id} pero la URL indica {gp_id}"
            )
            
    # Guardar todo de golpe
    saved_results = results_crud.save_race_results(db, gp_id, results)
    return saved_results