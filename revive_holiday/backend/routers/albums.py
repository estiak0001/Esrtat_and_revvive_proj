from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from database import get_db
import models
from auth import get_current_user

router = APIRouter(prefix="/api/albums", tags=["albums"])


class AlbumPhotoSchema(BaseModel):
    id: Optional[int] = None
    order: int = 0
    image_url: str


class AlbumBase(BaseModel):
    order: int = 0
    title: str
    short_note: str
    cover_image_url: Optional[str] = None
    active: bool = True


class AlbumWithPhotos(AlbumBase):
    photos: List[AlbumPhotoSchema] = []


def _photos_for(album_id: int, db: Session):
    return (
        db.query(models.AlbumPhoto)
        .filter(models.AlbumPhoto.album_id == album_id)
        .order_by(models.AlbumPhoto.order)
        .all()
    )


def _serialize_list(a: models.Album, photo_count: int):
    return {
        "id": a.id, "order": a.order, "title": a.title, "short_note": a.short_note,
        "cover_image_url": a.cover_image_url, "active": a.active, "photo_count": photo_count,
    }


def _serialize_full(a: models.Album, db: Session):
    photos = _photos_for(a.id, db)
    return {
        "id": a.id, "order": a.order, "title": a.title, "short_note": a.short_note,
        "cover_image_url": a.cover_image_url, "active": a.active,
        "photos": [{"id": p.id, "order": p.order, "image_url": p.image_url} for p in photos],
    }


# Public — light list, active only
@router.get("")
def list_albums(db: Session = Depends(get_db)):
    albums = db.query(models.Album).filter(models.Album.active == True).order_by(models.Album.order).all()
    return [_serialize_list(a, len(_photos_for(a.id, db))) for a in albums]


# Public — full detail with photos, active only
@router.get("/{album_id}")
def get_album(album_id: int, db: Session = Depends(get_db)):
    a = db.query(models.Album).filter(models.Album.id == album_id, models.Album.active == True).first()
    if not a:
        raise HTTPException(status_code=404, detail="Album not found")
    return _serialize_full(a, db)


# Admin — full list incl. inactive, with nested photos
@router.get("/admin/all", dependencies=[Depends(get_current_user)])
def list_all_albums(db: Session = Depends(get_db)):
    albums = db.query(models.Album).order_by(models.Album.order).all()
    return [_serialize_full(a, db) for a in albums]


@router.post("", dependencies=[Depends(get_current_user)])
def create_album(data: AlbumWithPhotos, db: Session = Depends(get_db)):
    a = models.Album(
        order=data.order, title=data.title, short_note=data.short_note,
        cover_image_url=data.cover_image_url, active=data.active,
    )
    db.add(a)
    db.commit()
    db.refresh(a)
    db.add_all([models.AlbumPhoto(album_id=a.id, order=p.order, image_url=p.image_url) for p in data.photos])
    db.commit()
    return _serialize_full(a, db)


@router.put("/{album_id}", dependencies=[Depends(get_current_user)])
def update_album(album_id: int, data: AlbumWithPhotos, db: Session = Depends(get_db)):
    a = db.query(models.Album).filter(models.Album.id == album_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Album not found")
    a.order = data.order
    a.title = data.title
    a.short_note = data.short_note
    a.cover_image_url = data.cover_image_url
    a.active = data.active
    db.query(models.AlbumPhoto).filter(models.AlbumPhoto.album_id == album_id).delete()
    db.add_all([models.AlbumPhoto(album_id=album_id, order=p.order, image_url=p.image_url) for p in data.photos])
    db.commit()
    return _serialize_full(a, db)


@router.patch("/{album_id}/toggle", dependencies=[Depends(get_current_user)])
def toggle_album(album_id: int, db: Session = Depends(get_db)):
    a = db.query(models.Album).filter(models.Album.id == album_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Album not found")
    a.active = not a.active
    db.commit()
    return _serialize_full(a, db)


@router.delete("/{album_id}", dependencies=[Depends(get_current_user)])
def delete_album(album_id: int, db: Session = Depends(get_db)):
    a = db.query(models.Album).filter(models.Album.id == album_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Album not found")
    db.query(models.AlbumPhoto).filter(models.AlbumPhoto.album_id == album_id).delete()
    db.delete(a)
    db.commit()
    return {"message": "Deleted"}
