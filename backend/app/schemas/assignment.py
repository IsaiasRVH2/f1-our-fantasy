from pydantic import BaseModel, ConfigDict
from uuid import UUID
from typing import Optional
from app.models.assignment import AcquiredMethod

class AssignmentBase(BaseModel):
    user_id: UUID
    driver_id: int
    gp_id: int
    acquired_method: AcquiredMethod
    is_active: bool = True
    is_pack_opened: bool = False

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentOut(AssignmentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)