from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Definimos las variables con tipado estricto
    DATABASE_URL: str
    
    # Configuración para leer el archivo .env desde la raíz del backend
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

# Instanciamos para que pueda ser importada en el resto del proyecto
settings = Settings()