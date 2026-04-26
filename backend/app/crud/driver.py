from sqlalchemy.orm import Session
from app import models
from app.schemas.driver import DriverCreate, DriverUpdate

def get_all_drivers(db: Session):
    """
    Obtiene la lista completa de pilotos desde la base de datos.
    """
    return db.query(models.Driver).all()

def get_free_agents(db: Session, gp_id: int | None = None):
    """
    Obtiene los pilotos que no están asignados para un GP.
    Si no se recibe gp_id, usa el GP activo; si no hay GP activo, retorna toda la parrilla.
    """
    target_gp_id = gp_id
    if target_gp_id is None:
        active_gp = db.query(models.GrandPrix).filter(models.GrandPrix.is_active == True).first()
        if not active_gp:
            return get_all_drivers(db)
        target_gp_id = active_gp.id

    assigned_driver_ids = db.query(models.Assignment.driver_id).filter(
        models.Assignment.gp_id == target_gp_id,
        models.Assignment.is_active == True
    )

    return db.query(models.Driver).filter(~models.Driver.id.in_(assigned_driver_ids)).all()

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