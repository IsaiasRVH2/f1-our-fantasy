# Importamos el Base de la base de datos
from app.database import Base

# Importamos TODOS los modelos para que Base.metadata los registre
from app.models.user import User
from app.models.driver import Driver
from app.models.grand_prix import GrandPrix
from app.models.assignment import Assignment
from app.models.wildcard_usage import WildcardUsage
from app.models.race_results import RaceResult