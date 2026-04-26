from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.crud import assignment as assignment_crud
from app.crud import driver as driver_crud
from app.database import get_db
from app.schemas.driver import DriverOut


router = APIRouter(prefix="/packs", tags=["Packs"])


@router.post("/open", response_model=List[DriverOut], status_code=status.HTTP_200_OK)
def open_pack(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Dispara la lógica de apertura de sobre para el GP activo y
    retorna los pilotos asignados al usuario autenticado.
    """
    try:
        user_assignments = assignment_crud.open_pack_for_current_gp(db, current_user.id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    gp_id = user_assignments[0].gp_id
    return driver_crud.get_user_assigned_drivers(db, current_user.id, gp_id)
