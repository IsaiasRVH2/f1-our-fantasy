from pydantic import BaseModel, ConfigDict, Field
from uuid import UUID
from datetime import datetime
from app.models.wildcard_usage import WildcardType

class WildcardUsageBase(BaseModel):
    user_id: UUID
    gp_id: int
    wildcard_type: WildcardType
    season_half: int = Field(..., ge=1, le=2)

class WildcardUsageCreate(WildcardUsageBase):
    pass

class WildcardUsageOut(WildcardUsageBase):
    id: int
    used_at: datetime

    model_config = ConfigDict(from_attributes=True)