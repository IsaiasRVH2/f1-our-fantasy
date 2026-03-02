from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings  # Importamos la configuración validada

# Crear el Motor usando la URL validada por Pydantic
engine = create_engine(settings.DATABASE_URL)

# Configurar la Sesión
# Se usa autocommit=False para asegurar integridad en transacciones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los Modelos ORM
Base = declarative_base()