import enum
from sqlalchemy import Column, Integer, BigInteger, Boolean, ForeignKey, Enum, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class AcquiredMethod(enum.Enum):
    pack_opening = "pack_opening"
    wildcard_swap = "wildcard_swap"
    stolen = "stolen"

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(BigInteger, primary_key=True, index=True)
    
    # Llaves Foráneas
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=False)
    gp_id = Column(Integer, ForeignKey("grand_prix.id"), nullable=False)
    
    acquired_method = Column(Enum(AcquiredMethod), nullable=False)
    is_active = Column(Boolean, default=True)

    # Un piloto solo puede pertenecer a un usuario por GP
    __table_args__ = (
        UniqueConstraint('driver_id', 'gp_id', name='_driver_gp_uc'),
    )

    def __repr__(self):
        return f"<Assignment(user={self.user_id}, driver={self.driver_id}, gp={self.gp_id})>"