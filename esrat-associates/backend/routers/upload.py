import os
import uuid
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from PIL import Image
from auth import get_current_user
from dotenv import load_dotenv

load_dotenv()

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
UPLOAD_DIR.mkdir(exist_ok=True)
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/svg+xml", "image/webp"}
MAX_SIZE_MB = 5

router = APIRouter(prefix="/api/upload", tags=["upload"])


@router.post("", dependencies=[Depends(get_current_user)])
async def upload_file(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, SVG, and WebP images are allowed")

    content = await file.read()
    if len(content) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"File size must be under {MAX_SIZE_MB}MB")

    ext = Path(file.filename).suffix.lower() if file.filename else ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / filename

    with open(dest, "wb") as f:
        f.write(content)

    return {"url": f"/uploads/{filename}", "filename": filename}


@router.get("/{filename}")
def serve_file(filename: str):
    path = UPLOAD_DIR / filename
    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    # Prevent path traversal
    if not str(path.resolve()).startswith(str(UPLOAD_DIR.resolve())):
        raise HTTPException(status_code=400, detail="Invalid path")
    return FileResponse(path)
