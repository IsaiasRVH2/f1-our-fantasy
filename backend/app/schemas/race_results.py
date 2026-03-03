from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

class RaceResultBase(BaseModel):
    gp_id: int
    driver_id: int
    race_pos: int = Field(..., ge=1, le=20)
    race_points: int = Field(0, ge=0)
    sprint_pos: Optional[int] = Field(None, ge=1, le=20)
    sprint_points: int = Field(0, ge=0)
    gp_points: int = Field(0, ge=0)
    is_dnf: bool = False

class RaceResultCreate(RaceResultBase):
    pass

class RaceResultOut(RaceResultBase):
    id: int

    model_config = ConfigDict(from_attributes=True)