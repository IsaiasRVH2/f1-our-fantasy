from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.grand_prix import GrandPrix
from datetime import datetime, timedelta

def seed_grand_prix():
    db: Session = SessionLocal()
    
    # Calendario oficial F1 2026 (24 carreras, 6 sprints)
    gps_data = [
        {
            "name": "Gran Premio de Australia",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-03-05T19:30:00-06:00",
            "fp2_date": "2026-03-05T23:00:00-06:00",
            "fp3_date": "2026-03-06T19:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-03-06T23:00:00-06:00",
            "race_date": "2026-03-07T22:00:00-06:00",
            "has_sprint": False,
            "is_active": True 
        },
        {
            "name": "Gran Premio de China",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-03-12T21:30:00-06:00",
            "fp2_date": None,
            "fp3_date": None,
            "squaly_date": "2026-03-13T01:30:00-06:00",
            "sprint_date": "2026-03-13T21:00:00-06:00",
            "qualy_date": "2026-03-14T01:00:00-06:00",
            "race_date": "2026-03-15T01:00:00-06:00",
            "has_sprint": True,
            "is_active": False
        },
        {
            "name": "Gran Premio de Japón",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-03-26T20:30:00-06:00",
            "fp2_date": "2026-03-27T00:00:00-06:00",
            "fp3_date": "2026-03-27T20:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-03-28T00:00:00-06:00",
            "race_date": "2026-03-28T23:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Bahréin",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-04-10T05:30:00-06:00",
            "fp2_date": "2026-04-10T09:00:00-06:00",
            "fp3_date": "2026-04-11T06:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-04-11T10:00:00-06:00",
            "race_date": "2026-04-12T09:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Arabia Saudita",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-04-17T07:30:00-06:00",
            "fp2_date": "2026-04-17T11:00:00-06:00",
            "fp3_date": "2026-04-18T07:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-04-18T11:00:00-06:00",
            "race_date": "2026-04-19T11:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Miami",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-05-01T10:30:00-06:00",
            "fp2_date": None,
            "fp3_date": None,
            "squaly_date": "2026-05-01T14:30:00-06:00",
            "sprint_date": "2026-05-02T10:00:00-06:00",
            "qualy_date": "2026-05-02T14:00:00-06:00",
            "race_date": "2026-05-03T14:00:00-06:00",
            "has_sprint": True,
            "is_active": False
        },
        {
            "name": "Gran Premio de Canadá",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-05-22T10:30:00-06:00",
            "fp2_date": None,
            "fp3_date": None,
            "squaly_date": "2026-05-22T14:30:00-06:00",
            "sprint_date": "2026-05-23T10:00:00-06:00",
            "qualy_date": "2026-05-23T14:00:00-06:00",
            "race_date": "2026-05-24T14:00:00-06:00",
            "has_sprint": True,
            "is_active": False
        },
        {
            "name": "Gran Premio de Mónaco",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-06-05T05:30:00-06:00",
            "fp2_date": "2026-06-05T09:00:00-06:00",
            "fp3_date": "2026-06-06T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-06-06T08:00:00-06:00",
            "race_date": "2026-06-07T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Cataluña (Barcelona)",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-06-12T05:30:00-06:00",
            "fp2_date": "2026-06-12T09:00:00-06:00",
            "fp3_date": "2026-06-13T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-06-13T08:00:00-06:00",
            "race_date": "2026-06-14T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Austria",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-06-26T05:30:00-06:00",
            "fp2_date": "2026-06-26T09:00:00-06:00",
            "fp3_date": "2026-06-27T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-06-27T08:00:00-06:00",
            "race_date": "2026-06-28T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Gran Bretaña",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-07-03T05:30:00-06:00",
            "fp2_date": None,
            "fp3_date": None,
            "squaly_date": "2026-07-03T09:30:00-06:00",
            "sprint_date": "2026-07-04T05:00:00-06:00",
            "qualy_date": "2026-07-04T09:00:00-06:00",
            "race_date": "2026-07-05T08:00:00-06:00",
            "has_sprint": True,
            "is_active": False
        },
        {
            "name": "Gran Premio de Bélgica",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-07-17T05:30:00-06:00",
            "fp2_date": "2026-07-17T09:00:00-06:00",
            "fp3_date": "2026-07-18T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-07-18T08:00:00-06:00",
            "race_date": "2026-07-19T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Hungría",
            "season_year": 2026,
            "season_half": 1,
            "fp1_date": "2026-07-24T05:30:00-06:00",
            "fp2_date": "2026-07-24T09:00:00-06:00",
            "fp3_date": "2026-07-25T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-07-25T08:00:00-06:00",
            "race_date": "2026-07-26T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de los Países Bajos",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-08-21T04:30:00-06:00",
            "fp2_date": None,
            "fp3_date": None,
            "squaly_date": "2026-08-21T08:30:00-06:00",
            "sprint_date": "2026-08-22T04:00:00-06:00",
            "qualy_date": "2026-08-22T08:00:00-06:00",
            "race_date": "2026-08-23T07:00:00-06:00",
            "has_sprint": True,
            "is_active": False
        },
        {
            "name": "Gran Premio de Italia",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-09-04T04:30:00-06:00",
            "fp2_date": "2026-09-04T08:00:00-06:00",
            "fp3_date": "2026-09-05T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-09-05T08:00:00-06:00",
            "race_date": "2026-09-06T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de España (Madrid)",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-09-11T05:30:00-06:00",
            "fp2_date": "2026-09-11T09:00:00-06:00",
            "fp3_date": "2026-09-12T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-09-12T08:00:00-06:00",
            "race_date": "2026-09-13T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Azerbaiyán",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-09-24T02:30:00-06:00",
            "fp2_date": "2026-09-24T06:00:00-06:00",
            "fp3_date": "2026-09-25T02:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-09-25T06:00:00-06:00",
            "race_date": "2026-09-26T05:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Singapur",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-10-09T02:30:00-06:00",
            "fp2_date": None,
            "fp3_date": None,
            "squaly_date": "2026-10-09T06:30:00-06:00",
            "sprint_date": "2026-10-10T03:00:00-06:00",
            "qualy_date": "2026-10-10T07:00:00-06:00",
            "race_date": "2026-10-11T06:00:00-06:00",
            "has_sprint": True,
            "is_active": False
        },
        {
            "name": "Gran Premio de Estados Unidos",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-10-23T11:30:00-06:00",
            "fp2_date": "2026-10-23T15:00:00-06:00",
            "fp3_date": "2026-10-24T11:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-10-24T15:00:00-06:00",
            "race_date": "2026-10-25T14:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de la Ciudad de México",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-10-30T12:30:00-06:00",
            "fp2_date": "2026-10-30T16:00:00-06:00",
            "fp3_date": "2026-10-31T11:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-10-31T15:00:00-06:00",
            "race_date": "2026-11-01T14:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de São Paulo",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-11-06T09:30:00-06:00",
            "fp2_date": "2026-11-06T13:00:00-06:00",
            "fp3_date": "2026-11-07T08:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-11-07T12:00:00-06:00",
            "race_date": "2026-11-08T11:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Las Vegas",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-11-19T18:30:00-06:00",
            "fp2_date": "2026-11-19T22:00:00-06:00",
            "fp3_date": "2026-11-20T18:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-11-20T22:00:00-06:00",
            "race_date": "2026-11-21T22:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Qatar",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-11-27T07:30:00-06:00",
            "fp2_date": "2026-11-27T11:00:00-06:00",
            "fp3_date": "2026-11-28T08:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-11-28T12:00:00-06:00",
            "race_date": "2026-11-29T10:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        },
        {
            "name": "Gran Premio de Abu Dabi",
            "season_year": 2026,
            "season_half": 2,
            "fp1_date": "2026-12-04T03:30:00-06:00",
            "fp2_date": "2026-12-04T07:00:00-06:00",
            "fp3_date": "2026-12-05T04:30:00-06:00",
            "squaly_date": None,
            "sprint_date": None,
            "qualy_date": "2026-12-05T08:00:00-06:00",
            "race_date": "2026-12-06T07:00:00-06:00",
            "has_sprint": False,
            "is_active": False
        }
    ]

    try:
        if db.query(GrandPrix).count() == 0:
            print("Poblando la base de datos con los 24 Grandes Premios de 2026...")
            
            for index, gp_info in enumerate(gps_data):
                def to_dt(date_str):
                    return datetime.fromisoformat(date_str) if date_str else None

                gp = GrandPrix(
                    name=gp_info["name"],
                    season_year=gp_info["season_year"],
                    season_half=gp_info["season_half"],
                    has_sprint=gp_info["has_sprint"],
                    
                    fp1_date=to_dt(gp_info["fp1_date"]),
                    fp2_date=to_dt(gp_info["fp2_date"]),
                    fp3_date=to_dt(gp_info["fp3_date"]),
                    squaly_date=to_dt(gp_info["squaly_date"]),
                    sprint_date=to_dt(gp_info["sprint_date"]),
                    qualy_date=to_dt(gp_info["qualy_date"]),
                    race_date=to_dt(gp_info["race_date"]),
                    is_active=(index == 0)  # Australia inicia como activo
                )
                db.add(gp)
            
            db.commit()
            print("¡Los 24 Grandes Premios se han insertado correctamente con sus horarios reales!")
        else:
            print("La tabla de Grandes Premios ya contiene datos.")
            
    except Exception as e:
        db.rollback()
        print(f"Error al poblar la base de datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_grand_prix()