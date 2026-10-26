import json
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
import models

router = APIRouter(prefix="/api/content", tags=["content"])


# ---------- Shared bulk-replace helper ----------

def bulk_replace(db: Session, model, rows: List[dict]):
    db.query(model).delete()
    for i, row in enumerate(rows):
        db.add(model(order=i, **row))
    db.commit()


def list_ordered(db: Session, model):
    return db.query(model).order_by(model.order).all()


# ---------- Pillars ----------

class PillarIn(BaseModel):
    title: str


@router.get("/pillars")
def get_pillars(db: Session = Depends(get_db)):
    return [{"id": r.id, "order": r.order, "title": r.title} for r in list_ordered(db, models.Pillar)]


@router.put("/pillars", dependencies=[Depends(get_current_user)])
def put_pillars(payload: List[PillarIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.Pillar, [p.model_dump() for p in payload])
    return get_pillars(db)


# ---------- What We Do ----------

class WhatWeDoIn(BaseModel):
    title: str
    description: str


@router.get("/what-we-do")
def get_what_we_do(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "title": r.title, "description": r.description}
        for r in list_ordered(db, models.WhatWeDo)
    ]


@router.put("/what-we-do", dependencies=[Depends(get_current_user)])
def put_what_we_do(payload: List[WhatWeDoIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.WhatWeDo, [p.model_dump() for p in payload])
    return get_what_we_do(db)


# ---------- Markets ----------

class MarketIn(BaseModel):
    country: str
    description: str


@router.get("/markets")
def get_markets(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "country": r.country, "description": r.description}
        for r in list_ordered(db, models.Market)
    ]


@router.put("/markets", dependencies=[Depends(get_current_user)])
def put_markets(payload: List[MarketIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.Market, [p.model_dump() for p in payload])
    return get_markets(db)


# ---------- Journey ----------

class JourneyIn(BaseModel):
    value: str
    label: str


@router.get("/journey")
def get_journey(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "value": r.value, "label": r.label}
        for r in list_ordered(db, models.Journey)
    ]


@router.put("/journey", dependencies=[Depends(get_current_user)])
def put_journey(payload: List[JourneyIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.Journey, [p.model_dump() for p in payload])
    return get_journey(db)


# ---------- Mission points ----------

class MissionPointIn(BaseModel):
    text: str


@router.get("/mission-points")
def get_mission_points(db: Session = Depends(get_db)):
    return [{"id": r.id, "order": r.order, "text": r.text} for r in list_ordered(db, models.MissionPoint)]


@router.put("/mission-points", dependencies=[Depends(get_current_user)])
def put_mission_points(payload: List[MissionPointIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.MissionPoint, [p.model_dump() for p in payload])
    return get_mission_points(db)


# ---------- Vision future ----------

class VisionFutureIn(BaseModel):
    title: str
    description: str


@router.get("/vision-future")
def get_vision_future(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "title": r.title, "description": r.description}
        for r in list_ordered(db, models.VisionFuture)
    ]


@router.put("/vision-future", dependencies=[Depends(get_current_user)])
def put_vision_future(payload: List[VisionFutureIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.VisionFuture, [p.model_dump() for p in payload])
    return get_vision_future(db)


# ---------- Team values ----------

class TitleDescIn(BaseModel):
    title: str
    description: str


@router.get("/team-values")
def get_team_values(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "title": r.title, "description": r.description}
        for r in list_ordered(db, models.TeamValue)
    ]


@router.put("/team-values", dependencies=[Depends(get_current_user)])
def put_team_values(payload: List[TitleDescIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.TeamValue, [p.model_dump() for p in payload])
    return get_team_values(db)


# ---------- Why Ariska ----------

@router.get("/why-ariska")
def get_why_ariska(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "title": r.title, "description": r.description}
        for r in list_ordered(db, models.WhyAriska)
    ]


@router.put("/why-ariska", dependencies=[Depends(get_current_user)])
def put_why_ariska(payload: List[TitleDescIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.WhyAriska, [p.model_dump() for p in payload])
    return get_why_ariska(db)


# ---------- Business values ----------

@router.get("/business-values")
def get_business_values(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "title": r.title, "description": r.description}
        for r in list_ordered(db, models.BusinessValue)
    ]


@router.put("/business-values", dependencies=[Depends(get_current_user)])
def put_business_values(payload: List[TitleDescIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.BusinessValue, [p.model_dump() for p in payload])
    return get_business_values(db)


# ---------- Clients ----------

class ClientIn(BaseModel):
    name: str
    category: str
    logo_url: Optional[str] = None


@router.get("/clients")
def get_clients(db: Session = Depends(get_db)):
    return [
        {"id": r.id, "order": r.order, "name": r.name, "category": r.category, "logo_url": r.logo_url}
        for r in list_ordered(db, models.Client)
    ]


@router.put("/clients", dependencies=[Depends(get_current_user)])
def put_clients(payload: List[ClientIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.Client, [p.model_dump() for p in payload])
    return get_clients(db)


# ---------- Team members ----------

class TeamMemberIn(BaseModel):
    name: str
    role: str
    color: str = "bg-teal-700"
    photo_url: Optional[str] = None


@router.get("/team-members")
def get_team_members(db: Session = Depends(get_db)):
    return [
        {
            "id": r.id,
            "order": r.order,
            "name": r.name,
            "role": r.role,
            "color": r.color,
            "photo_url": r.photo_url,
        }
        for r in list_ordered(db, models.TeamMember)
    ]


@router.put("/team-members", dependencies=[Depends(get_current_user)])
def put_team_members(payload: List[TeamMemberIn], db: Session = Depends(get_db)):
    bulk_replace(db, models.TeamMember, [p.model_dump() for p in payload])
    return get_team_members(db)


# ---------- Services (real per-row CRUD — nested groups stored as JSON) ----------

class ServiceItemSchema(BaseModel):
    title: str
    description: str


class ServiceGroupSchema(BaseModel):
    heading: str
    items: List[ServiceItemSchema]


class ClientGroupSchema(BaseModel):
    category: str
    names: List[str]


class ServiceIn(BaseModel):
    slug: str
    title: str
    tagline: str
    intro: str
    groups: List[ServiceGroupSchema]
    clientGroups: Optional[List[ClientGroupSchema]] = None


def service_to_dict(r: models.Service):
    return {
        "id": r.id,
        "order": r.order,
        "slug": r.slug,
        "title": r.title,
        "tagline": r.tagline,
        "intro": r.intro,
        "groups": json.loads(r.groups_json or "[]"),
        "clientGroups": json.loads(r.client_groups_json) if r.client_groups_json else None,
    }


@router.get("/services")
def get_services(db: Session = Depends(get_db)):
    rows = db.query(models.Service).order_by(models.Service.order).all()
    return [service_to_dict(r) for r in rows]


@router.post("/services", dependencies=[Depends(get_current_user)])
def create_service(payload: ServiceIn, db: Session = Depends(get_db)):
    count = db.query(models.Service).count()
    row = models.Service(
        order=count,
        slug=payload.slug,
        title=payload.title,
        tagline=payload.tagline,
        intro=payload.intro,
        groups_json=json.dumps([g.model_dump() for g in payload.groups]),
        client_groups_json=json.dumps([c.model_dump() for c in payload.clientGroups]) if payload.clientGroups else None,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return service_to_dict(row)


@router.put("/services/{service_id}", dependencies=[Depends(get_current_user)])
def update_service(service_id: int, payload: ServiceIn, db: Session = Depends(get_db)):
    row = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Service not found")
    row.slug = payload.slug
    row.title = payload.title
    row.tagline = payload.tagline
    row.intro = payload.intro
    row.groups_json = json.dumps([g.model_dump() for g in payload.groups])
    row.client_groups_json = (
        json.dumps([c.model_dump() for c in payload.clientGroups]) if payload.clientGroups else None
    )
    db.commit()
    db.refresh(row)
    return service_to_dict(row)


@router.delete("/services/{service_id}", dependencies=[Depends(get_current_user)])
def delete_service(service_id: int, db: Session = Depends(get_db)):
    row = db.query(models.Service).filter(models.Service.id == service_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(row)
    db.commit()
    return {"status": "ok"}


@router.put("/services-reorder", dependencies=[Depends(get_current_user)])
def reorder_services(payload: List[int], db: Session = Depends(get_db)):
    for order, service_id in enumerate(payload):
        row = db.query(models.Service).filter(models.Service.id == service_id).first()
        if row:
            row.order = order
    db.commit()
    return get_services(db)
