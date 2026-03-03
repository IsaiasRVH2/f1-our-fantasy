from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
# Importamos get_db desde tu archivo database.py
from app.database import get_db 
from app.schemas.user import UserCreate, UserOut
from app.crud import user as user_crud

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo usuario usando la sesión inyectada por get_db.
    """
    db_user = user_crud.get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="El usuario con este email ya existe."
        )
    return user_crud.create_user(db=db, user_in=user_in)