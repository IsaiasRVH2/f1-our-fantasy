from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    team_name = Column(String, nullable=False)
    abbreviation = Column(String(3), nullable=False)
    image_url = Column(Text, nullable=True)

    def __repr__(self):
        return f"<Driver(name={self.full_name}, code={self.abbreviation})>"