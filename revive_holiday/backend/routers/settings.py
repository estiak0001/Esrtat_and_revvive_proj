from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/settings", tags=["settings"])


# Public
@router.get("")
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(models.SiteSetting).all()
    return {s.key: s.value for s in settings}


# Admin
@router.put("", dependencies=[Depends(get_current_user)])
def update_settings(data: Dict[str, str], db: Session = Depends(get_db)):
    for key, value in data.items():
        setting = db.query(models.SiteSetting).filter(models.SiteSetting.key == key).first()
        if setting:
            setting.value = value
        else:
            db.add(models.SiteSetting(key=key, value=value))
    db.commit()
    settings = db.query(models.SiteSetting).all()
    return {s.key: s.value for s in settings}
