from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/destinations", tags=["destinations"])


class DestinationBase(BaseModel):
    order: int = 0
    name: str
    description: str
    image_url: Optional[str] = None
    active: bool = True


def _serialize(d: models.Destination):
    return {
        "id": d.id, "order": d.order, "name": d.name,
        "description": d.description, "image_url": d.image_url, "active": d.active,
    }


# Public
@router.get("")
def list_destinations(db: Session = Depends(get_db)):
    rows = (
        db.query(models.Destination)
        .filter(models.Destination.active == True)
        .order_by(models.Destination.order)
        .all()
    )
    return [_serialize(r) for r in rows]


# Admin — list all (including inactive)
@router.get("/all", dependencies=[Depends(get_current_user)])
def list_all_destinations(db: Session = Depends(get_db)):
    rows = db.query(models.Destination).order_by(models.Destination.order).all()
    return [_serialize(r) for r in rows]


@router.post("", dependencies=[Depends(get_current_user)])
def create_destination(data: DestinationBase, db: Session = Depends(get_db)):
    d = models.Destination(**data.model_dump())
    db.add(d)
    db.commit()
    db.refresh(d)
    return _serialize(d)


@router.put("/{did}", dependencies=[Depends(get_current_user)])
def update_destination(did: int, data: DestinationBase, db: Session = Depends(get_db)):
    d = db.query(models.Destination).filter(models.Destination.id == did).first()
    if not d:
        raise HTTPException(status_code=404, detail="Destination not found")
    for k, v in data.model_dump().items():
        setattr(d, k, v)
    db.commit()
    db.refresh(d)
    return _serialize(d)


@router.patch("/{did}/toggle", dependencies=[Depends(get_current_user)])
def toggle_destination(did: int, db: Session = Depends(get_db)):
    d = db.query(models.Destination).filter(models.Destination.id == did).first()
    if not d:
        raise HTTPException(status_code=404, detail="Destination not found")
    d.active = not d.active
    db.commit()
    return _serialize(d)


@router.delete("/{did}", dependencies=[Depends(get_current_user)])
def delete_destination(did: int, db: Session = Depends(get_db)):
    d = db.query(models.Destination).filter(models.Destination.id == did).first()
    if not d:
        raise HTTPException(status_code=404, detail="Destination not found")
    db.delete(d)
    db.commit()
    return {"message": "Deleted"}
