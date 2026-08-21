from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/slides", tags=["slides"])


class SlideBase(BaseModel):
    order: int = 0
    badge: str
    heading: str
    highlight: str
    sub: str
    description: str
    cta_label: str
    cta_href: str
    image_url: Optional[str] = None
    active: bool = True


class SlideUpdate(SlideBase):
    pass


def _serialize(s: models.HeroSlide):
    return {
        "id": s.id, "order": s.order, "badge": s.badge,
        "heading": s.heading, "highlight": s.highlight, "sub": s.sub,
        "description": s.description, "cta_label": s.cta_label,
        "cta_href": s.cta_href, "image_url": s.image_url, "active": s.active,
    }


# Public
@router.get("")
def list_slides(db: Session = Depends(get_db)):
    slides = db.query(models.HeroSlide).filter(models.HeroSlide.active == True).order_by(models.HeroSlide.order).all()
    return [_serialize(s) for s in slides]


# Admin
@router.get("/all", dependencies=[Depends(get_current_user)])
def list_all_slides(db: Session = Depends(get_db)):
    slides = db.query(models.HeroSlide).order_by(models.HeroSlide.order).all()
    return [_serialize(s) for s in slides]


@router.post("", dependencies=[Depends(get_current_user)])
def create_slide(data: SlideBase, db: Session = Depends(get_db)):
    slide = models.HeroSlide(**data.model_dump())
    db.add(slide)
    db.commit()
    db.refresh(slide)
    return _serialize(slide)


@router.put("/{slide_id}", dependencies=[Depends(get_current_user)])
def update_slide(slide_id: int, data: SlideUpdate, db: Session = Depends(get_db)):
    slide = db.query(models.HeroSlide).filter(models.HeroSlide.id == slide_id).first()
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    for k, v in data.model_dump().items():
        setattr(slide, k, v)
    db.commit()
    db.refresh(slide)
    return _serialize(slide)


@router.delete("/{slide_id}", dependencies=[Depends(get_current_user)])
def delete_slide(slide_id: int, db: Session = Depends(get_db)):
    slide = db.query(models.HeroSlide).filter(models.HeroSlide.id == slide_id).first()
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    db.delete(slide)
    db.commit()
    return {"message": "Deleted"}


@router.patch("/{slide_id}/toggle", dependencies=[Depends(get_current_user)])
def toggle_slide(slide_id: int, db: Session = Depends(get_db)):
    slide = db.query(models.HeroSlide).filter(models.HeroSlide.id == slide_id).first()
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    slide.active = not slide.active
    db.commit()
    return {"active": slide.active}
