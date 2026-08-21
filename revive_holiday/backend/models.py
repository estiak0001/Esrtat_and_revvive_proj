from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)


class SiteSetting(Base):
    __tablename__ = "site_settings"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=True)


class Destination(Base):
    __tablename__ = "destinations"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=True)
    active = Column(Boolean, default=True)


class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    icon = Column(String(50), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    active = Column(Boolean, default=True)


class CoreValue(Base):
    __tablename__ = "core_values"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    icon = Column(String(50), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)


class WhyChoose(Base):
    __tablename__ = "why_choose"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    text = Column(String(255), nullable=False)


class CorporateService(Base):
    __tablename__ = "corporate_services"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    text = Column(String(255), nullable=False)


class VisaSupport(Base):
    __tablename__ = "visa_support"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    text = Column(String(255), nullable=False)


class Album(Base):
    __tablename__ = "albums"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(200), nullable=False)
    short_note = Column(Text, nullable=False)
    cover_image_url = Column(String(500), nullable=True)
    active = Column(Boolean, default=True)


class AlbumPhoto(Base):
    __tablename__ = "album_photos"
    id = Column(Integer, primary_key=True, index=True)
    album_id = Column(Integer, nullable=False, index=True)
    order = Column(Integer, default=0)
    image_url = Column(String(500), nullable=False)


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_read = Column(Boolean, default=False)


class Inquiry(Base):
    __tablename__ = "inquiries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=True)
    inquiry_type = Column(String(50), nullable=False)
    destination = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_read = Column(Boolean, default=False)
