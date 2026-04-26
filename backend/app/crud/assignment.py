import random
from typing import Iterable

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
