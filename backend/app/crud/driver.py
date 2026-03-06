from sqlalchemy.orm import Session
from app import models
from app.schemas.driver import DriverCreate, DriverUpdate

def get_all_drivers(db: Session):
    """
    Obtiene la lista completa de pilotos desde la base de datos.
    """
    return db.query(models.Driver).all()

def get_driver_by_id(db: Session, driver_id: int):
    return db.query(models.Driver).filter(models.Driver.id == driver_id).first()

def create_driver(db: Session, driver_in: DriverCreate):
    db_driver = models.Driver(**driver_in.model_dump())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

def update_driver(db: Session, db_driver: models.Driver, driver_in: DriverUpdate):
    # exclude_unset=True ignora los campos que el frontend no envió en el PATCH
    update_data = driver_in.model_dump(exclude_unset=True) 
    
    for key, value in update_data.items():
        setattr(db_driver, key, value)
        
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

def delete_driver(db: Session, driver_id: int):
    db_driver = get_driver_by_id(db, driver_id)
    if db_driver:
        db.delete(db_driver)
        db.commit()
    return db_driver