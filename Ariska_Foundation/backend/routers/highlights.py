import json
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
import models

router = APIRouter(prefix="/api/highlights", tags=["highlights"])


class HighlightIn(BaseModel):
    slug: str
    title: str
    date_label: Optional[str] = None
    cover_image: Optional[str] = None
    summary: str
    content: Optional[str] = None
    images: List[str] = []
    active: bool = True


def to_dict(r: models.Highlight):
    return {
        "id": r.id,
        "order": r.order,
        "slug": r.slug,
        "title": r.title,
        "date_label": r.date_label,
        "cover_image": r.cover_image,
        "summary": r.summary,
        "content": r.content,
        "images": json.loads(r.images_json or "[]"),
        "active": r.active,
    }


@router.get("")
def list_highlights(db: Session = Depends(get_db)):
    rows = db.query(models.Highlight).filter(models.Highlight.active == True).order_by(models.Highlight.order).all()  # noqa: E712
    return [to_dict(r) for r in rows]


@router.get("/all", dependencies=[Depends(get_current_user)])
def list_all_highlights(db: Session = Depends(get_db)):
    rows = db.query(models.Highlight).order_by(models.Highlight.order).all()
    return [to_dict(r) for r in rows]


@router.get("/{slug}")
def get_highlight(slug: str, db: Session = Depends(get_db)):
    row = db.query(models.Highlight).filter(models.Highlight.slug == slug, models.Highlight.active == True).first()  # noqa: E712
    if not row:
        raise HTTPException(status_code=404, detail="Highlight not found")
    return to_dict(row)


@router.post("", dependencies=[Depends(get_current_user)])
def create_highlight(payload: HighlightIn, db: Session = Depends(get_db)):
    count = db.query(models.Highlight).count()
    row = models.Highlight(
        order=count,
        slug=payload.slug,
        title=payload.title,
        date_label=payload.date_label,
        cover_image=payload.cover_image,
        summary=payload.summary,
        content=payload.content,
        images_json=json.dumps(payload.images),
        active=payload.active,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return to_dict(row)


@router.put("/{highlight_id}", dependencies=[Depends(get_current_user)])
def update_highlight(highlight_id: int, payload: HighlightIn, db: Session = Depends(get_db)):
    row = db.query(models.Highlight).filter(models.Highlight.id == highlight_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Highlight not found")
    row.slug = payload.slug
    row.title = payload.title
    row.date_label = payload.date_label
    row.cover_image = payload.cover_image
    row.summary = payload.summary
    row.content = payload.content
    row.images_json = json.dumps(payload.images)
    row.active = payload.active
    db.commit()
    db.refresh(row)
    return to_dict(row)


@router.delete("/{highlight_id}", dependencies=[Depends(get_current_user)])
def delete_highlight(highlight_id: int, db: Session = Depends(get_db)):
    row = db.query(models.Highlight).filter(models.Highlight.id == highlight_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Highlight not found")
    db.delete(row)
    db.commit()
    return {"status": "ok"}


@router.patch("/{highlight_id}/toggle", dependencies=[Depends(get_current_user)])
def toggle_highlight(highlight_id: int, db: Session = Depends(get_db)):
    row = db.query(models.Highlight).filter(models.Highlight.id == highlight_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Highlight not found")
    row.active = not row.active
    db.commit()
    return to_dict(row)
