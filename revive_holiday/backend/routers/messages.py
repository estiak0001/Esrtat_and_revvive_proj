from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api", tags=["messages"])


# ── Contact ────────────────────────────────────────────────────────────────────
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str


def _serialize_contact(m: models.ContactMessage):
    return {
        "id": m.id, "name": m.name, "email": m.email, "phone": m.phone,
        "message": m.message, "created_at": m.created_at, "is_read": m.is_read,
    }


@router.post("/contact", status_code=201)
def create_contact(data: ContactCreate, db: Session = Depends(get_db)):
    m = models.ContactMessage(**data.model_dump())
    db.add(m)
    db.commit()
    db.refresh(m)
    return {"id": m.id, "status": "received"}


@router.get("/messages/contact", dependencies=[Depends(get_current_user)])
def list_contact_messages(db: Session = Depends(get_db)):
    rows = db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()
    return [_serialize_contact(m) for m in rows]


@router.patch("/messages/contact/{mid}/read", dependencies=[Depends(get_current_user)])
def mark_contact_read(mid: int, db: Session = Depends(get_db)):
    m = db.query(models.ContactMessage).filter(models.ContactMessage.id == mid).first()
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    m.is_read = not m.is_read
    db.commit()
    return _serialize_contact(m)


@router.delete("/messages/contact/{mid}", dependencies=[Depends(get_current_user)])
def delete_contact_message(mid: int, db: Session = Depends(get_db)):
    db.query(models.ContactMessage).filter(models.ContactMessage.id == mid).delete()
    db.commit()
    return {"message": "Deleted"}


# ── Inquiry ────────────────────────────────────────────────────────────────────
class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    inquiry_type: str
    destination: Optional[str] = None
    message: str


def _serialize_inquiry(i: models.Inquiry):
    return {
        "id": i.id, "name": i.name, "email": i.email, "phone": i.phone,
        "inquiry_type": i.inquiry_type, "destination": i.destination,
        "message": i.message, "created_at": i.created_at, "is_read": i.is_read,
    }


@router.post("/inquiry", status_code=201)
def create_inquiry(data: InquiryCreate, db: Session = Depends(get_db)):
    i = models.Inquiry(**data.model_dump())
    db.add(i)
    db.commit()
    db.refresh(i)
    return {"id": i.id, "status": "received"}


@router.get("/messages/inquiry", dependencies=[Depends(get_current_user)])
def list_inquiries(db: Session = Depends(get_db)):
    rows = db.query(models.Inquiry).order_by(models.Inquiry.created_at.desc()).all()
    return [_serialize_inquiry(i) for i in rows]


@router.patch("/messages/inquiry/{iid}/read", dependencies=[Depends(get_current_user)])
def mark_inquiry_read(iid: int, db: Session = Depends(get_db)):
    i = db.query(models.Inquiry).filter(models.Inquiry.id == iid).first()
    if not i:
        raise HTTPException(status_code=404, detail="Not found")
    i.is_read = not i.is_read
    db.commit()
    return _serialize_inquiry(i)


@router.delete("/messages/inquiry/{iid}", dependencies=[Depends(get_current_user)])
def delete_inquiry(iid: int, db: Session = Depends(get_db)):
    db.query(models.Inquiry).filter(models.Inquiry.id == iid).delete()
    db.commit()
    return {"message": "Deleted"}
