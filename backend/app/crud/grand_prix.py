from sqlalchemy.orm import Session
from app import models

def get_all_gps(db: Session):
    """
    Obtiene el calendario completo de Grandes Premios, 
    ordenados de forma ascendente por la fecha de la carrera.
    """
    return db.query(models.GrandPrix).order_by(models.GrandPrix.race_date.asc()).all()