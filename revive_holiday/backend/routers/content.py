from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/content", tags=["content"])


# ── Services ───────────────────────────────────────────────────────────────────
class ServiceSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    icon: str
    title: str
    description: str
    active: bool = True


@router.get("/services")
def get_services(db: Session = Depends(get_db)):
    rows = db.query(models.Service).filter(models.Service.active == True).order_by(models.Service.order).all()
    return [_serialize_service(s) for s in rows]


@router.get("/services/all", dependencies=[Depends(get_current_user)])
def get_all_services(db: Session = Depends(get_db)):
    rows = db.query(models.Service).order_by(models.Service.order).all()
    return [_serialize_service(s) for s in rows]


def _serialize_service(s):
    return {"id": s.id, "order": s.order, "icon": s.icon, "title": s.title,
            "description": s.description, "active": s.active}


@router.put("/services/{service_id}", dependencies=[Depends(get_current_user)])
def update_service(service_id: int, data: ServiceSchema, db: Session = Depends(get_db)):
    svc = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not svc:
        raise HTTPException(status_code=404, detail="Service not found")
    svc.order = data.order
    svc.icon = data.icon
    svc.title = data.title
    svc.description = data.description
    svc.active = data.active
    db.commit()
    return _serialize_service(svc)


# ── Core Values ────────────────────────────────────────────────────────────────
class CoreValueSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    icon: str
    title: str
    description: str


@router.get("/core-values")
def get_core_values(db: Session = Depends(get_db)):
    return [{"id": v.id, "order": v.order, "icon": v.icon, "title": v.title, "description": v.description}
            for v in db.query(models.CoreValue).order_by(models.CoreValue.order).all()]


@router.put("/core-values", dependencies=[Depends(get_current_user)])
def update_core_values(data: List[CoreValueSchema], db: Session = Depends(get_db)):
    db.query(models.CoreValue).delete()
    db.add_all([models.CoreValue(order=v.order, icon=v.icon, title=v.title, description=v.description) for v in data])
    db.commit()
    return get_core_values(db)


# ── Why Choose Us ──────────────────────────────────────────────────────────────
class WhyChooseSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    text: str


@router.get("/why-choose")
def get_why_choose(db: Session = Depends(get_db)):
    return [{"id": w.id, "order": w.order, "text": w.text}
            for w in db.query(models.WhyChoose).order_by(models.WhyChoose.order).all()]


@router.put("/why-choose", dependencies=[Depends(get_current_user)])
def update_why_choose(data: List[WhyChooseSchema], db: Session = Depends(get_db)):
    db.query(models.WhyChoose).delete()
    db.add_all([models.WhyChoose(order=w.order, text=w.text) for w in data])
    db.commit()
    return get_why_choose(db)


# ── Corporate Services ─────────────────────────────────────────────────────────
class CorporateServiceSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    text: str


@router.get("/corporate-services")
def get_corporate_services(db: Session = Depends(get_db)):
    return [{"id": c.id, "order": c.order, "text": c.text}
            for c in db.query(models.CorporateService).order_by(models.CorporateService.order).all()]


@router.put("/corporate-services", dependencies=[Depends(get_current_user)])
def update_corporate_services(data: List[CorporateServiceSchema], db: Session = Depends(get_db)):
    db.query(models.CorporateService).delete()
    db.add_all([models.CorporateService(order=c.order, text=c.text) for c in data])
    db.commit()
    return get_corporate_services(db)


# ── Visa Support ───────────────────────────────────────────────────────────────
class VisaSupportSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    text: str


@router.get("/visa-support")
def get_visa_support(db: Session = Depends(get_db)):
    return [{"id": v.id, "order": v.order, "text": v.text}
            for v in db.query(models.VisaSupport).order_by(models.VisaSupport.order).all()]


@router.put("/visa-support", dependencies=[Depends(get_current_user)])
def update_visa_support(data: List[VisaSupportSchema], db: Session = Depends(get_db)):
    db.query(models.VisaSupport).delete()
    db.add_all([models.VisaSupport(order=v.order, text=v.text) for v in data])
    db.commit()
    return get_visa_support(db)
