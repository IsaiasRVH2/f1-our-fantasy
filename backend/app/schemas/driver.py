from pydantic import BaseModel, Field, HttpUrl, ConfigDict
from typing import Optional

class DriverBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    team_name: str = Field(..., min_length=2, max_length=100)
    abbreviation: str = Field(..., min_length=3, max_length=3, pattern="^[A-Z]{3}$")
    image_url: Optional[str] = None

class DriverCreate(DriverBase):
    pass

class DriverOut(DriverBase):
    id: int

    model_config = ConfigDict(from_attributes=True)