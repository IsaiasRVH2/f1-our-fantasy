from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine
from app.routers import auth, drivers, grand_prix as gp, race_results, health
from app.lifespan import lifespan
import logging

# Configuración básica de logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="F1 Fantasy TCG API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],
)

# Registro de Routers
app.include_router(auth.router)
app.include_router(drivers.router)
app.include_router(gp.router)
app.include_router(race_results.router)
app.include_router(health.router)