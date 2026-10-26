import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File

from auth import get_current_user

router = APIRouter(prefix="/api/upload", tags=["upload"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/svg+xml", "image/webp"}
MAX_SIZE = 5 * 1024 * 1024  # 5MB


@router.post("", dependencies=[Depends(get_current_user)])
async def upload_file(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 5MB)")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    ext = os.path.splitext(file.filename or "")[1]
    name = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(UPLOAD_DIR, name)
    with open(path, "wb") as f:
        f.write(contents)

    return {"url": f"/uploads/{name}", "filename": name}
