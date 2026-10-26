from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/company", tags=["company"])


# Public
@router.get("")
def get_company(db: Session = Depends(get_db)):
    settings = db.query(models.CompanySetting).all()
    return {s.key: s.value for s in settings}


# Admin
@router.put("", dependencies=[Depends(get_current_user)])
def update_company(data: Dict[str, str], db: Session = Depends(get_db)):
    for key, value in data.items():
        setting = db.query(models.CompanySetting).filter(models.CompanySetting.key == key).first()
        if setting:
            setting.value = value
        else:
            db.add(models.CompanySetting(key=key, value=value))
    db.commit()
    settings = db.query(models.CompanySetting).all()
    return {s.key: s.value for s in settings}
