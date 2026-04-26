from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_admin_user
from app.config import settings
from app.crud import user as user_crud
from app.schemas.user import UserAdminActionOut, UserOut


router = APIRouter(
    prefix="/admin/users",
    tags=["Admin - Users"],
    dependencies=[Depends(get_current_admin_user)],
)


@router.get("/", response_model=List[UserOut], status_code=status.HTTP_200_OK)
def read_users(db: Session = Depends(get_db)):
    return user_crud.get_all_users(db)


@router.delete("/{user_id}", response_model=UserAdminActionOut, status_code=status.HTTP_200_OK)
def remove_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin_user),
):
    user = user_crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
    if user.id == current_admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No puedes eliminar tu propia cuenta de administrador.",
        )

    user_crud.delete_user(db, user)
    return {"message": "Usuario eliminado correctamente."}


@router.post(
    "/{user_id}/reset-password",
    response_model=UserAdminActionOut,
    status_code=status.HTTP_200_OK,
)
def reset_user_password(
    user_id: UUID,
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin_user),
):
    user = user_crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
    if user.id == current_admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No puedes reiniciar tu propia contraseña desde este panel.",
        )

    user_crud.reset_user_password(db, user, settings.ADMIN_DEFAULT_RESET_PASSWORD)
    return {
        "message": f"Contraseña reiniciada a la clave por defecto: {settings.ADMIN_DEFAULT_RESET_PASSWORD}",
    }
