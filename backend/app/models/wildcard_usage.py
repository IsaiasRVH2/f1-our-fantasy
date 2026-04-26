import enum
from sqlalchemy import Column, Integer, ForeignKey, Enum, DateTime, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base

class WildcardType(enum.Enum):
    pre_race_swap = "pre_race_swap"
    post_race_swap = "post_race_swap"
    random_swap = "random_swap"
    steal = "steal"

class WildcardUsage(Base):
    __tablename__ = "wildcard_usage"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    gp_id = Column(Integer, ForeignKey("grand_prix.id"), nullable=False)
    
    wildcard_type = Column(Enum(WildcardType), nullable=False)
    season_half = Column(Integer, nullable=False)
    used_at = Column(DateTime(timezone=True), server_default=func.now())

    # Restricciones para cumplir las reglas
    __table_args__ = (
        # Un usuario solo tiene 1 wildcard de cada tipo por mitad de temporada
        UniqueConstraint('user_id', 'wildcard_type', 'season_half', name='_user_wildcard_half_uc'),
        # Un usuario solo puede usar 1 wildcard por Gran Premio
        UniqueConstraint('user_id', 'gp_id', name='_user_gp_wildcard_uc'),
    )

    def __repr__(self):
        return f"<WildcardUsage(user={self.user_id}, type={self.wildcard_type}, gp={self.gp_id})>"