from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.database import Base

class GrandPrix(Base):
    __tablename__ = "grand_prix"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    season_year = Column(Integer, nullable=False)
    # 1 para la primera mitad, 2 para la segunda
    season_half = Column(Integer, default=1)
    
    # Horarios del fin de semana
    fp1_date = Column(DateTime(timezone=True), nullable=False)
    fp2_date = Column(DateTime(timezone=True), nullable=True)
    fp3_date = Column(DateTime(timezone=True), nullable=True)
    squaly_date = Column(DateTime(timezone=True), nullable=True) # Sprint Qualy
    sprint_date = Column(DateTime(timezone=True), nullable=True)
    qualy_date = Column(DateTime(timezone=True), nullable=False) # Clasificación Principal
    race_date = Column(DateTime(timezone=True), nullable=False)
    
    has_sprint = Column(Boolean, default=False)
    is_active = Column(Boolean, default=False)

    def __repr__(self):
        return f"<GrandPrix(name={self.name}, year={self.season_year})>"