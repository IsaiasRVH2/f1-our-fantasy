from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db 
from app.schemas.user import UserCreate, UserOut
from app.crud import user as user_crud
from app.core.security import create_access_token
from app.schemas.token import Token
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo usuario usando la sesión inyectada por get_db.
    """
    # Verificar código de acceso
    if user_in.access_code != settings.ACCESS_CODE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Código de acceso inválido."
        )

    # Verificar si el email ya esta registrado
    if user_crud.get_user_by_email(db, email=user_in.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Este email ya está registrado. Usa otro."
        )
        
    # Verificar si el usuario ya esta registrado
    if user_crud.get_user_by_username(db, username=user_in.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Este nombre de usuario ya está en uso. Elige otro."       )
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
    access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer"
    }