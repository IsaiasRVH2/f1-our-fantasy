from sqlalchemy import Column, Integer, BigInteger, ForeignKey, Boolean
from app.database import Base

class RaceResult(Base):
    __tablename__ = "race_results"

    id = Column(BigInteger, primary_key=True, index=True)
    gp_id = Column(Integer, ForeignKey("grand_prix.id"), nullable=False)
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=False)
    
    # Resultados de Carrera Principal
    race_pos = Column(Integer, nullable=False)
    race_points = Column(Integer, default=0)
    
    # Resultados de Sprint
    sprint_pos = Column(Integer, nullable=True) # Solo si hubo Sprint
    sprint_points = Column(Integer, default=0)
    
    # Total acumulado del fin de semana (Suma de puntos)
    gp_points = Column(Integer, default=0)
    
    is_dnf = Column(Boolean, default=False)

    def __repr__(self):
        return f"<RaceResult(gp={self.gp_id}, driver={self.driver_id}, total={self.gp_points})>"