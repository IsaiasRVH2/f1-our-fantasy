from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator
from uuid import UUID
from datetime import datetime
from typing import Optional
import re
from app.models.user import UserRole

# Atributos base
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, examples=["checo_fan"])
    email: EmailStr
    role: UserRole = UserRole.player

# Esquema para Registro
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, examples=["secret123"])
    access_code: str
    
    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        # Al menos una mayúscula
        if not re.search(r'[A-Z]', v):
            raise ValueError('La contraseña debe contener al menos una letra mayúscula.')
        # Al menos una minúscula
        if not re.search(r'[a-z]', v):
            raise ValueError('La contraseña debe contener al menos una letra minúscula.')
        # Al menos un número
        if not re.search(r'\d', v):
            raise ValueError('La contraseña debe contener al menos un número.')
        # Al menos un símbolo (carácter especial)
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('La contraseña debe contener al menos un símbolo especial de esta lista: !@#$%^&*(),.?":{}|<>.')

        return v

# Esquema para Respuesta
class UserOut(UserBase):
    id: UUID
    total_points: int
    is_active: bool
    created_at: datetime

    # Configuración para que Pydantic entienda los objetos de SQLAlchemy
    model_config = ConfigDict(from_attributes=True)

# Esquema para Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str