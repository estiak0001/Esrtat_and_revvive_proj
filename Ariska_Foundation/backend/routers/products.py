import json
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
import models

router = APIRouter(prefix="/api/products", tags=["products"])


class ProductIn(BaseModel):
    slug: str
    title: str
    category: Optional[str] = None
    summary: str
    description: Optional[str] = None
    images: List[str] = []
    active: bool = True


def to_dict(r: models.Product):
    return {
        "id": r.id,
        "order": r.order,
        "slug": r.slug,
        "title": r.title,
        "category": r.category,
        "summary": r.summary,
        "description": r.description,
        "images": json.loads(r.images_json or "[]"),
        "active": r.active,
    }


@router.get("")
def list_products(db: Session = Depends(get_db)):
    rows = db.query(models.Product).filter(models.Product.active == True).order_by(models.Product.order).all()  # noqa: E712
    return [to_dict(r) for r in rows]


@router.get("/all", dependencies=[Depends(get_current_user)])
def list_all_products(db: Session = Depends(get_db)):
    rows = db.query(models.Product).order_by(models.Product.order).all()
    return [to_dict(r) for r in rows]


@router.get("/{slug}")
def get_product(slug: str, db: Session = Depends(get_db)):
    row = db.query(models.Product).filter(models.Product.slug == slug, models.Product.active == True).first()  # noqa: E712
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    return to_dict(row)


@router.post("", dependencies=[Depends(get_current_user)])
def create_product(payload: ProductIn, db: Session = Depends(get_db)):
    count = db.query(models.Product).count()
    row = models.Product(
        order=count,
        slug=payload.slug,
        title=payload.title,
        category=payload.category,
        summary=payload.summary,
        description=payload.description,
        images_json=json.dumps(payload.images),
        active=payload.active,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return to_dict(row)


@router.put("/{product_id}", dependencies=[Depends(get_current_user)])
def update_product(product_id: int, payload: ProductIn, db: Session = Depends(get_db)):
    row = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    row.slug = payload.slug
    row.title = payload.title
    row.category = payload.category
    row.summary = payload.summary
    row.description = payload.description
    row.images_json = json.dumps(payload.images)
    row.active = payload.active
    db.commit()
    db.refresh(row)
    return to_dict(row)


@router.delete("/{product_id}", dependencies=[Depends(get_current_user)])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    row = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(row)
    db.commit()
    return {"status": "ok"}


@router.patch("/{product_id}/toggle", dependencies=[Depends(get_current_user)])
def toggle_product(product_id: int, db: Session = Depends(get_db)):
    row = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    row.active = not row.active
    db.commit()
    return to_dict(row)
