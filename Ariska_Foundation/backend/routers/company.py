from typing import Dict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
import models

router = APIRouter(prefix="/api/company", tags=["company"])


@router.get("")
def get_company(db: Session = Depends(get_db)):
    rows = db.query(models.CompanySetting).all()
    return {row.key: row.value for row in rows}


@router.put("", dependencies=[Depends(get_current_user)])
def update_company(payload: Dict[str, str], db: Session = Depends(get_db)):
    for key, value in payload.items():
        row = db.query(models.CompanySetting).filter(models.CompanySetting.key == key).first()
        if row:
            row.value = value
        else:
            db.add(models.CompanySetting(key=key, value=value))
    db.commit()
    rows = db.query(models.CompanySetting).all()
    return {row.key: row.value for row in rows}
