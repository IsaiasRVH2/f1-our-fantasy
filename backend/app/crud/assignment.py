import random
from typing import Iterable

from sqlalchemy import text
from sqlalchemy.orm import Session

from app import models
from app.models.assignment import AcquiredMethod
from app.models.user import UserRole


def _build_random_assignments(
    users: Iterable[models.User],
    drivers: Iterable[models.Driver],
    gp_id: int,
    drivers_per_user: int = 5,
):
    """
    Genera asignaciones aleatorias de pilotos para un GP.
    Cada usuario recibe `drivers_per_user` pilotos únicos.
    """
    users_list = list(users)
    drivers_list = list(drivers)

    if not users_list:
        raise ValueError("No hay usuarios activos para asignar pilotos.")
    if drivers_per_user <= 0:
        raise ValueError("drivers_per_user debe ser mayor a cero.")

    required_drivers = len(users_list) * drivers_per_user
    if len(drivers_list) < required_drivers:
        raise ValueError(
            f"No hay suficientes pilotos. Se requieren {required_drivers} y hay {len(drivers_list)}."
        )

    random.shuffle(drivers_list)

    assignments = []
    cursor = 0
    for user in users_list:
        for _ in range(drivers_per_user):
            driver = drivers_list[cursor]
            cursor += 1
            assignments.append(
                models.Assignment(
                    user_id=user.id,
                    driver_id=driver.id,
                    gp_id=gp_id,
                    acquired_method=AcquiredMethod.pack_opening,
                    is_active=True,
                    is_pack_opened=False,
                )
            )

    return assignments


def generate_batch_assignments(db: Session, gp_id: int, drivers_per_user: int = 5):
    """
    T4.1:
    Toma usuarios activos tipo player y pilotos disponibles para crear
    asignaciones aleatorias de 5 pilotos únicos por usuario.
    """
    active_users = (
        db.query(models.User)
        .filter(models.User.is_active == True, models.User.role == UserRole.player)
        .all()
    )
    drivers = db.query(models.Driver).all()

    return _build_random_assignments(active_users, drivers, gp_id, drivers_per_user)


def open_pack_for_current_gp(db: Session, requester_user_id, drivers_per_user: int = 5):
    """
    T4.2:
    - Bloquea tabla assignments durante el proceso
    - Verifica si ya hay asignaciones para el GP activo
    - Si no hay, ejecuta reparto masivo (T4.1)
    - Marca al usuario solicitante como "Sobre Abierto"
    """
    current_gp = db.query(models.GrandPrix).filter(models.GrandPrix.is_active == True).first()
    if not current_gp:
        raise ValueError("No hay un Grand Prix activo para abrir sobres.")

    # Lock explícito de tabla para evitar colisiones en primera apertura concurrente.
    db.execute(text("LOCK TABLE assignments IN SHARE ROW EXCLUSIVE MODE"))

    has_assignments = (
        db.query(models.Assignment.id).filter(models.Assignment.gp_id == current_gp.id).first()
        is not None
    )

    if not has_assignments:
        batch_assignments = generate_batch_assignments(db, current_gp.id, drivers_per_user)
        db.add_all(batch_assignments)
        db.flush()

    user_assignments = (
        db.query(models.Assignment)
        .filter(
            models.Assignment.gp_id == current_gp.id,
            models.Assignment.user_id == requester_user_id,
            models.Assignment.is_active == True,
        )
        .all()
    )

    if not user_assignments:
        raise ValueError("El usuario no tiene asignaciones activas para el GP actual.")

    for assignment in user_assignments:
        assignment.is_pack_opened = True
        db.add(assignment)

    db.commit()

    return user_assignments


def get_user_assignments_for_current_gp(db: Session, requester_user_id):
    """
    Recupera asignaciones del usuario para el GP activo sin crear ni modificar datos.
    """
    current_gp = db.query(models.GrandPrix).filter(models.GrandPrix.is_active == True).first()
    if not current_gp:
        raise ValueError("No hay un Grand Prix activo.")

    user_assignments = (
        db.query(models.Assignment)
        .filter(
            models.Assignment.gp_id == current_gp.id,
            models.Assignment.user_id == requester_user_id,
            models.Assignment.is_active == True,
        )
        .all()
    )

    if not user_assignments:
        raise ValueError("El usuario no tiene pilotos asignados para el GP actual.")

    return user_assignments
