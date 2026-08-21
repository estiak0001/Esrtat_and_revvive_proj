import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/consultants", tags=["consultants"])


class ConsultantBase(BaseModel):
    order: int = 0
    name: str
    title: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    expertise: Optional[str] = None   # JSON string
    education: Optional[str] = None   # JSON string
    phone: Optional[str] = None
    email: Optional[str] = None
    is_founder: bool = False
    active: bool = True


def _serialize(c: models.Consultant):
    return {
        "id": c.id,
        "order": c.order,
        "name": c.name,
        "title": c.title,
        "bio": c.bio,
        "photo_url": c.photo_url,
        "expertise": json.loads(c.expertise) if c.expertise else [],
        "education": json.loads(c.education) if c.education else [],
        "phone": c.phone,
        "email": c.email,
        "is_founder": c.is_founder,
        "active": c.active,
    }


# Public
@router.get("")
def list_consultants(db: Session = Depends(get_db)):
    rows = (
        db.query(models.Consultant)
        .filter(models.Consultant.active == True)
        .order_by(models.Consultant.order)
        .all()
    )
    return [_serialize(r) for r in rows]


# Admin — list all (including inactive)
@router.get("/all", dependencies=[Depends(get_current_user)])
def list_all_consultants(db: Session = Depends(get_db)):
    rows = db.query(models.Consultant).order_by(models.Consultant.order).all()
    return [_serialize(r) for r in rows]


@router.post("", dependencies=[Depends(get_current_user)])
def create_consultant(data: ConsultantBase, db: Session = Depends(get_db)):
    c = models.Consultant(**data.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return _serialize(c)


@router.put("/{cid}", dependencies=[Depends(get_current_user)])
def update_consultant(cid: int, data: ConsultantBase, db: Session = Depends(get_db)):
    c = db.query(models.Consultant).filter(models.Consultant.id == cid).first()
    if not c:
        raise HTTPException(status_code=404, detail="Consultant not found")
    for k, v in data.model_dump().items():
        setattr(c, k, v)
    db.commit()
    db.refresh(c)
    return _serialize(c)


@router.patch("/{cid}/toggle", dependencies=[Depends(get_current_user)])
def toggle_consultant(cid: int, db: Session = Depends(get_db)):
    c = db.query(models.Consultant).filter(models.Consultant.id == cid).first()
    if not c:
        raise HTTPException(status_code=404, detail="Consultant not found")
    c.active = not c.active
    db.commit()
    return _serialize(c)


@router.delete("/{cid}", dependencies=[Depends(get_current_user)])
def delete_consultant(cid: int, db: Session = Depends(get_db)):
    c = db.query(models.Consultant).filter(models.Consultant.id == cid).first()
    if not c:
        raise HTTPException(status_code=404, detail="Consultant not found")
    db.delete(c)
    db.commit()
    return {"message": "Deleted"}
