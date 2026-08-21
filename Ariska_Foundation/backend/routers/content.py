from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/content", tags=["content"])


# ── Stats ──────────────────────────────────────────────────────────────────────
class StatSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    value: int
    suffix: str = ""
    label: str


@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return [{"id": s.id, "order": s.order, "value": s.value, "suffix": s.suffix, "label": s.label}
            for s in db.query(models.Stat).order_by(models.Stat.order).all()]


@router.put("/stats", dependencies=[Depends(get_current_user)])
def update_stats(data: List[StatSchema], db: Session = Depends(get_db)):
    db.query(models.Stat).delete()
    db.add_all([models.Stat(order=s.order, value=s.value, suffix=s.suffix, label=s.label) for s in data])
    db.commit()
    return get_stats(db)


# ── Services ───────────────────────────────────────────────────────────────────
class ServiceItemSchema(BaseModel):
    item: str
    order: int = 0


class ServiceSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    slug: str
    title: str
    icon: str
    description: str
    active: bool = True
    items: List[ServiceItemSchema] = []


@router.get("/services")
def get_services(db: Session = Depends(get_db)):
    services = db.query(models.Service).filter(models.Service.active == True).order_by(models.Service.order).all()
    return _serialize_services(services, db)


@router.get("/services/all", dependencies=[Depends(get_current_user)])
def get_all_services(db: Session = Depends(get_db)):
    services = db.query(models.Service).order_by(models.Service.order).all()
    return _serialize_services(services, db)


def _serialize_services(services, db):
    result = []
    for svc in services:
        items = db.query(models.ServiceItem).filter(
            models.ServiceItem.service_id == svc.id
        ).order_by(models.ServiceItem.order).all()
        result.append({
            "id": svc.id, "order": svc.order, "slug": svc.slug,
            "title": svc.title, "icon": svc.icon, "description": svc.description,
            "active": svc.active, "items": [i.item for i in items],
        })
    return result


@router.put("/services/{service_id}", dependencies=[Depends(get_current_user)])
def update_service(service_id: int, data: ServiceSchema, db: Session = Depends(get_db)):
    svc = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not svc:
        raise HTTPException(status_code=404, detail="Service not found")
    svc.order = data.order
    svc.slug = data.slug
    svc.title = data.title
    svc.icon = data.icon
    svc.description = data.description
    svc.active = data.active
    db.query(models.ServiceItem).filter(models.ServiceItem.service_id == service_id).delete()
    db.add_all([models.ServiceItem(service_id=service_id, order=i.order, item=i.item) for i in data.items])
    db.commit()
    return {"message": "Updated"}


# ── Why Choose ─────────────────────────────────────────────────────────────────
class WhyChooseSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    title: str
    icon: str


@router.get("/why-choose")
def get_why_choose(db: Session = Depends(get_db)):
    return [{"id": w.id, "order": w.order, "title": w.title, "icon": w.icon}
            for w in db.query(models.WhyChoose).order_by(models.WhyChoose.order).all()]


@router.put("/why-choose", dependencies=[Depends(get_current_user)])
def update_why_choose(data: List[WhyChooseSchema], db: Session = Depends(get_db)):
    db.query(models.WhyChoose).delete()
    db.add_all([models.WhyChoose(order=w.order, title=w.title, icon=w.icon) for w in data])
    db.commit()
    return get_why_choose(db)


# ── Industries ─────────────────────────────────────────────────────────────────
class IndustrySchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    name: str


@router.get("/industries")
def get_industries(db: Session = Depends(get_db)):
    return [{"id": i.id, "order": i.order, "name": i.name}
            for i in db.query(models.Industry).order_by(models.Industry.order).all()]


@router.put("/industries", dependencies=[Depends(get_current_user)])
def update_industries(data: List[IndustrySchema], db: Session = Depends(get_db)):
    db.query(models.Industry).delete()
    db.add_all([models.Industry(order=i.order, name=i.name) for i in data])
    db.commit()
    return get_industries(db)


# ── Core Values ────────────────────────────────────────────────────────────────
class CoreValueSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    title: str
    icon: str
    desc: str


@router.get("/core-values")
def get_core_values(db: Session = Depends(get_db)):
    return [{"id": v.id, "order": v.order, "title": v.title, "icon": v.icon, "desc": v.desc}
            for v in db.query(models.CoreValue).order_by(models.CoreValue.order).all()]


@router.put("/core-values", dependencies=[Depends(get_current_user)])
def update_core_values(data: List[CoreValueSchema], db: Session = Depends(get_db)):
    db.query(models.CoreValue).delete()
    db.add_all([models.CoreValue(order=v.order, title=v.title, icon=v.icon, desc=v.desc) for v in data])
    db.commit()
    return get_core_values(db)


# ── Partners ───────────────────────────────────────────────────────────────────
class PartnerSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    name: str
    initials: str
    color: str
    logo_url: Optional[str] = None


@router.get("/partners")
def get_partners(db: Session = Depends(get_db)):
    return [{"id": p.id, "order": p.order, "name": p.name, "initials": p.initials, "color": p.color, "logo_url": p.logo_url}
            for p in db.query(models.Partner).order_by(models.Partner.order).all()]


@router.put("/partners", dependencies=[Depends(get_current_user)])
def update_partners(data: List[PartnerSchema], db: Session = Depends(get_db)):
    db.query(models.Partner).delete()
    db.add_all([models.Partner(order=p.order, name=p.name, initials=p.initials, color=p.color, logo_url=p.logo_url) for p in data])
    db.commit()
    return get_partners(db)


# ── Consultants ────────────────────────────────────────────────────────────────
import json

class ConsultantSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    name: str
    title: str
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    expertise: Optional[List[str]] = []
    education: Optional[List[str]] = []
    phone: Optional[str] = None
    email: Optional[str] = None
    is_founder: bool = False
    active: bool = True


def _serialize_consultant(c):
    return {
        "id": c.id, "order": c.order, "name": c.name, "title": c.title,
        "bio": c.bio, "photo_url": c.photo_url,
        "expertise": json.loads(c.expertise) if c.expertise else [],
        "education": json.loads(c.education) if c.education else [],
        "phone": c.phone, "email": c.email,
        "is_founder": c.is_founder, "active": c.active,
    }


@router.get("/consultants")
def get_consultants(db: Session = Depends(get_db)):
    rows = db.query(models.Consultant).filter(models.Consultant.active == True).order_by(models.Consultant.order).all()
    return [_serialize_consultant(c) for c in rows]


@router.get("/consultants/all", dependencies=[Depends(get_current_user)])
def get_all_consultants(db: Session = Depends(get_db)):
    rows = db.query(models.Consultant).order_by(models.Consultant.order).all()
    return [_serialize_consultant(c) for c in rows]


@router.post("/consultants", dependencies=[Depends(get_current_user)])
def create_consultant(data: ConsultantSchema, db: Session = Depends(get_db)):
    c = models.Consultant(
        order=data.order, name=data.name, title=data.title, bio=data.bio,
        photo_url=data.photo_url,
        expertise=json.dumps(data.expertise or []),
        education=json.dumps(data.education or []),
        phone=data.phone, email=data.email,
        is_founder=data.is_founder, active=data.active,
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    return _serialize_consultant(c)


@router.put("/consultants/{consultant_id}", dependencies=[Depends(get_current_user)])
def update_consultant(consultant_id: int, data: ConsultantSchema, db: Session = Depends(get_db)):
    c = db.query(models.Consultant).filter(models.Consultant.id == consultant_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Not found")
    c.order = data.order; c.name = data.name; c.title = data.title; c.bio = data.bio
    c.photo_url = data.photo_url
    c.expertise = json.dumps(data.expertise or [])
    c.education = json.dumps(data.education or [])
    c.phone = data.phone; c.email = data.email
    c.is_founder = data.is_founder; c.active = data.active
    db.commit()
    return _serialize_consultant(c)


@router.delete("/consultants/{consultant_id}", dependencies=[Depends(get_current_user)])
def delete_consultant(consultant_id: int, db: Session = Depends(get_db)):
    db.query(models.Consultant).filter(models.Consultant.id == consultant_id).delete()
    db.commit()
    return {"message": "Deleted"}


# ── Testimonials ───────────────────────────────────────────────────────────────
class TestimonialSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    name: str
    title: str
    service: str
    service_icon: str
    review: str
    rating: int = 5
    active: bool = True


def _serialize_testimonial(t):
    return {
        "id": t.id, "order": t.order, "name": t.name, "title": t.title,
        "service": t.service, "service_icon": t.service_icon,
        "review": t.review, "rating": t.rating, "active": t.active,
    }


@router.get("/testimonials")
def get_testimonials(db: Session = Depends(get_db)):
    rows = db.query(models.Testimonial).filter(models.Testimonial.active == True).order_by(models.Testimonial.order).all()
    return [_serialize_testimonial(t) for t in rows]


@router.get("/testimonials/all", dependencies=[Depends(get_current_user)])
def get_all_testimonials(db: Session = Depends(get_db)):
    rows = db.query(models.Testimonial).order_by(models.Testimonial.order).all()
    return [_serialize_testimonial(t) for t in rows]


@router.post("/testimonials", dependencies=[Depends(get_current_user)])
def create_testimonial(data: TestimonialSchema, db: Session = Depends(get_db)):
    t = models.Testimonial(**data.model_dump(exclude={"id"}))
    db.add(t)
    db.commit()
    db.refresh(t)
    return _serialize_testimonial(t)


@router.put("/testimonials/{tid}", dependencies=[Depends(get_current_user)])
def update_testimonial(tid: int, data: TestimonialSchema, db: Session = Depends(get_db)):
    t = db.query(models.Testimonial).filter(models.Testimonial.id == tid).first()
    if not t:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in data.model_dump(exclude={"id"}).items():
        setattr(t, k, v)
    db.commit()
    return _serialize_testimonial(t)


@router.delete("/testimonials/{tid}", dependencies=[Depends(get_current_user)])
def delete_testimonial(tid: int, db: Session = Depends(get_db)):
    db.query(models.Testimonial).filter(models.Testimonial.id == tid).delete()
    db.commit()
    return {"message": "Deleted"}
