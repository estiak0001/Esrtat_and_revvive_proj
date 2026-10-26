import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers import auth, company, content, upload, products, highlights

load_dotenv()

app = FastAPI(title="ARISKA Admin API", version="1.0.0")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
allowed_origins = {FRONTEND_URL, "http://localhost:5174"}
if FRONTEND_URL.startswith("https://www."):
    allowed_origins.add(FRONTEND_URL.replace("https://www.", "https://"))
elif FRONTEND_URL.startswith("https://"):
    allowed_origins.add(FRONTEND_URL.replace("https://", "https://www."))

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(allowed_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def no_cache_api(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"
    return response


app.include_router(auth.router)
app.include_router(company.router)
app.include_router(content.router)
app.include_router(upload.router)
app.include_router(products.router)
app.include_router(highlights.router)

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.get("/health")
def health():
    return {"status": "ok"}
