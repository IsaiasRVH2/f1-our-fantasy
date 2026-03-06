from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
# Ajusta estos imports según la estructura real de tu proyecto
from app.database import get_db
from app import models
from app.routers.auth import get_current_user # Asumiendo que aquí tienes tu validador de JWT

def get_current_admin_user(current_user: models.User = Depends(get_current_user)):
    """
    Dependencia que verifica si el usuario autenticado tiene rol de 'admin'.
    Si no lo tiene, levanta un error 403 Forbidden.
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acceso denegado: No tienes permisos de ADMINISTRADOR."
        )
    return current_user