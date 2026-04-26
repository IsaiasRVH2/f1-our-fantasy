from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from typing import List
from app import models
from app.schemas.race_results import RaceResultCreate

def save_race_results(db: Session, gp_id: int, results: List[RaceResultCreate]):
    """
    Guarda la parrilla completa de resultados para un Gran Premio.
    Si ya existían resultados, los sobrescribe para evitar duplicados.
    """
    # Limpia los resultados anteriores de este GP para evitar duplicados
    db.query(models.RaceResult).filter(models.RaceResult.gp_id == gp_id).delete()
    
    # Prepara los registros
    db_results = [models.RaceResult(**r.model_dump()) for r in results]
    
    # Guardado masivo
    db.add_all(db_results)
    try:
        db.commit()
    except IntegrityError as e:
        db.rollback() # Abortar la transacción fallida
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El Gran Premio o uno de los Pilotos especificados no existe en la base de datos."
        )

    # Retornamos los datos recién guardados
    return db.query(models.RaceResult).filter(models.RaceResult.gp_id == gp_id).all()