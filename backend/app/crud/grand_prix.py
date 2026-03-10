from sqlalchemy.orm import Session
from app import models
from app.schemas.grand_prix import GrandPrixCreate, GrandPrixUpdate

def get_all_gps(db: Session):
    """
    Obtiene el calendario completo de Grandes Premios, 
    ordenados de forma ascendente por la fecha de la carrera.
    """
    return db.query(models.GrandPrix).order_by(models.GrandPrix.race_date.asc()).all()

def get_gp_by_id(db: Session, gp_id: int):
    return db.query(models.GrandPrix).filter(models.GrandPrix.id == gp_id).first()

def create_gp(db: Session, gp_in: GrandPrixCreate):
    db_gp = models.GrandPrix(**gp_in.model_dump())
    db.add(db_gp)
    db.commit()
    db.refresh(db_gp)
    return db_gp

def update_gp(db: Session, db_gp: models.GrandPrix, gp_in: GrandPrixUpdate):
    update_data = gp_in.model_dump(exclude_unset=True) 
    
    if update_data.get("is_active") is True:
        currently_active = db.query(models.GrandPrix).filter(
            models.GrandPrix.is_active == True,
            models.GrandPrix.id != db_gp.id
        ).first()
        
        if currently_active:
            currently_active.is_active = False
            db.add(currently_active)
    
    for key, value in update_data.items():
        setattr(db_gp, key, value)
        
    db.add(db_gp)
    db.commit()
    db.refresh(db_gp)
    return db_gp

def delete_gp(db: Session, gp_id: int):
    db_gp = get_gp_by_id(db, gp_id)
    if db_gp:
        db.delete(db_gp)
        db.commit()
    return db_gp