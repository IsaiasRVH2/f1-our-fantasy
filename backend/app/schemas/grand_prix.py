from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional

class GrandPrixBase(BaseModel):
    name: str
    season_year: int = Field(..., ge=2024)
    season_half: int = Field(..., le=2)
    fp1_date: datetime
    fp2_date: Optional[datetime] = None
    fp3_date: Optional[datetime] = None
    squaly_date: Optional[datetime] = None
    sprint_date: Optional[datetime] = None
    qualy_date: datetime
    race_date: datetime
    has_sprint: bool = False
    is_active: bool = False

    @field_validator("season_half")
    @classmethod
    def validate_half(cls, v: int) -> int:
        if v not in [1, 2]:
            raise ValueError("La mitad de la temporada debe ser 1 o 2")
        return v

class GrandPrixCreate(GrandPrixBase):
    pass

class GrandPrixOut(GrandPrixBase):
    id: int
    
    class Config:
        from_attributes = True