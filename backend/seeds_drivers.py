from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.driver import Driver

def seed_drivers():
    db: Session = SessionLocal()
    
    # Datos oficiales de la parrilla F1 2026
    drivers_data = [
        {"full_name": "Lando Norris", "team_name": "McLaren", "abbreviation": "NOR"},
        {"full_name": "Oscar Piastri", "team_name": "McLaren", "abbreviation": "PIA"},
        {"full_name": "Charles Leclerc", "team_name": "Ferrari", "abbreviation": "LEC"},
        {"full_name": "Lewis Hamilton", "team_name": "Ferrari", "abbreviation": "HAM"},
        {"full_name": "Max Verstappen", "team_name": "Red Bull", "abbreviation": "VER"},
        {"full_name": "Isack Hadjar", "team_name": "Red Bull", "abbreviation": "HAD"},
        {"full_name": "George Russell", "team_name": "Mercedes", "abbreviation": "RUS"},
        {"full_name": "Kimi Antonelli", "team_name": "Mercedes", "abbreviation": "ANT"},
        {"full_name": "Fernando Alonso", "team_name": "Aston Martin", "abbreviation": "ALO"},
        {"full_name": "Lance Stroll", "team_name": "Aston Martin", "abbreviation": "STR"},
        {"full_name": "Pierre Gasly", "team_name": "Alpine", "abbreviation": "GAS"},
        {"full_name": "Franco Colapinto", "team_name": "Alpine", "abbreviation": "COL"},
        {"full_name": "Esteban Ocon", "team_name": "Haas", "abbreviation": "OCO"},
        {"full_name": "Oliver Bearman", "team_name": "Haas", "abbreviation": "BEA"},
        {"full_name": "Liam Lawson", "team_name": "Racing Bulls", "abbreviation": "LAW"},
        {"full_name": "Arvid Lindblad", "team_name": "Racing Bulls", "abbreviation": "LIN"},
        {"full_name": "Carlos Sainz", "team_name": "Williams", "abbreviation": "SAI"},
        {"full_name": "Alex Albon", "team_name": "Williams", "abbreviation": "ALB"},
        {"full_name": "Nico Hulkenberg", "team_name": "Audi", "abbreviation": "HUL"},
        {"full_name": "Gabriel Bortoleto", "team_name": "Audi", "abbreviation": "BOR"},
        {"full_name": "Sergio Perez", "team_name": "Cadillac", "abbreviation": "PER"},
        {"full_name": "Valtteri Bottas", "team_name": "Cadillac", "abbreviation": "BOT"}
    ]

    try:
        # Verificamos si la tabla ya tiene datos para evitar duplicados
        if db.query(Driver).count() == 0:
            print("Poblando la base de datos con los 22 pilotos de la temporada 2026...")
            for d in drivers_data:
                driver = Driver(**d)
                db.add(driver)
            
            db.commit()
            print("¡Los 22 pilotos se han insertado correctamente!")
        else:
            print("La tabla de pilotos ya contiene datos. Saltando el proceso de seed...")
    
    except Exception as e:
        db.rollback()
        print(f"Error al poblar la base de datos: {e}")
    
    finally:
        db.close()

if __name__ == "__main__":
    seed_drivers()