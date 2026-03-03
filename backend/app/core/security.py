from passlib.context import CryptContext

# Configuración del contexto de cifrado
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con el hash almacenado.
    Útil para el proceso de Login.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Genera un hash seguro a partir de una contraseña en texto plano.
    Útil para el proceso de Registro (antes de guardar en la DB).
    """
    return pwd_context.hash(password)