from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

from routers import auth, slides, company, content, upload, consultants

app = FastAPI(title="Esrat Associates Admin API", version="1.0.0")


def _cors_origins() -> list[str]:
    """Frontend can be reached at both the bare domain and the www subdomain
    (nginx serves both without redirecting one to the other), so both must be
    allowed or the browser blocks every API call made from whichever one
    isn't listed."""
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    origins = {frontend_url, "http://localhost:5174"}
    if "://" in frontend_url:
        scheme, rest = frontend_url.split("://", 1)
        if rest.startswith("www."):
            origins.add(f"{scheme}://{rest[4:]}")
        else:
            origins.add(f"{scheme}://www.{rest}")
    return list(origins)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Never let browsers/proxies cache API responses — always serve live data
@app.middleware("http")
async def no_store_cache_headers(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"
    return response

# Routers
app.include_router(auth.router)
app.include_router(slides.router)
app.include_router(company.router)
app.include_router(content.router)
app.include_router(upload.router)
app.include_router(consultants.router)

# Serve uploaded files
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


@app.get("/health")
def health():
    return {"status": "ok"}
