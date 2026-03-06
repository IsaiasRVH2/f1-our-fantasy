from sqlalchemy.orm import Session
from app import models

def get_all_drivers(db: Session):
    """
    Obtiene la lista completa de pilotos desde la base de datos.
    """
    return db.query(models.Driver).all()