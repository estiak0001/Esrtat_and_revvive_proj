from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = (
    f"postgresql://{quote_plus(os.getenv('DB_USER', ''))}:{quote_plus(os.getenv('DB_PASS', ''))}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT', 5432)}/{os.getenv('DB_NAME')}"
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
