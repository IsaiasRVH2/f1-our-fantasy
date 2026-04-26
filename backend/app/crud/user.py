from sqlalchemy.orm import Session
from uuid import UUID
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user_in: UserCreate):
    
    hashed_pwd = get_password_hash(user_in.password)
    db_user = User(
        email=user_in.email,
        username=user_in.username,
        password_hash=hashed_pwd,
        role=user_in.role,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user


def get_all_users(db: Session):
    return db.query(User).order_by(User.created_at.desc()).all()


def get_user_by_id(db: Session, user_id: UUID):
    return db.query(User).filter(User.id == user_id).first()


def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()


def reset_user_password(db: Session, user: User, default_password: str):
    user.password_hash = get_password_hash(default_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user