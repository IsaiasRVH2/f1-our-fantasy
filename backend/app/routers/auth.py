from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db 
from app.schemas.user import UserCreate, UserOut
from app.crud import user as user_crud
from app.core.security import create_access_token
from app.schemas.token import Token

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

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Endpoint de login estándar OAuth2.
    El campo 'username' del formulario se usa como el 'email'.
    """
    # Autenticar usando el CRUD
    user = user_crud.authenticate_user(
        db, 
        form_data.username,
        form_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generar el JWT
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer"
    }