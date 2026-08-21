from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
import models
from auth import verify_password, hash_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.AdminUser).filter(models.AdminUser.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def me(current_user=Depends(get_current_user)):
    return {"username": current_user.username}


@router.post("/change-password")
def change_password(req: ChangePasswordRequest, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    if not verify_password(req.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    current_user.password_hash = hash_password(req.new_password)
    db.commit()
    return {"message": "Password updated successfully"}
