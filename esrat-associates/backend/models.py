from sqlalchemy import Column, Integer, String, Text, Boolean, Float
from database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)


class HeroSlide(Base):
    __tablename__ = "hero_slides"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    badge = Column(String(120), nullable=False)
    heading = Column(String(200), nullable=False)
    highlight = Column(String(200), nullable=False)
    sub = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    cta_label = Column(String(100), nullable=False)
    cta_href = Column(String(255), nullable=False)
    image_url = Column(String(500), nullable=True)
    active = Column(Boolean, default=True)


class CompanySetting(Base):
    __tablename__ = "company_settings"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=True)


class Stat(Base):
    __tablename__ = "stats"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    value = Column(Integer, nullable=False)
    suffix = Column(String(10), default="")
    label = Column(String(150), nullable=False)


class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    slug = Column(String(100), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    icon = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    active = Column(Boolean, default=True)


class ServiceItem(Base):
    __tablename__ = "service_items"
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, nullable=False, index=True)
    order = Column(Integer, default=0)
    item = Column(String(255), nullable=False)


class WhyChoose(Base):
    __tablename__ = "why_choose"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(200), nullable=False)
    icon = Column(String(50), nullable=False)


class Industry(Base):
    __tablename__ = "industries"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(200), nullable=False)


class CoreValue(Base):
    __tablename__ = "core_values"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(100), nullable=False)
    icon = Column(String(50), nullable=False)
    desc = Column(Text, nullable=False)


class Partner(Base):
    __tablename__ = "partners"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(200), nullable=False)
    initials = Column(String(20), nullable=False)
    color = Column(String(20), nullable=False)
    logo_url = Column(String(500), nullable=True)


class Consultant(Base):
    __tablename__ = "consultants"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(200), nullable=False)
    title = Column(String(200), nullable=False)
    bio = Column(Text, nullable=True)
    photo_url = Column(String(500), nullable=True)
    expertise = Column(Text, nullable=True)   # JSON array stored as text
    education = Column(Text, nullable=True)   # JSON array stored as text
    phone = Column(String(50), nullable=True)
    email = Column(String(200), nullable=True)
    is_founder = Column(Boolean, default=False)
    active = Column(Boolean, default=True)


class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(200), nullable=False)
    title = Column(String(200), nullable=False)
    service = Column(String(150), nullable=False)
    service_icon = Column(String(50), nullable=False)
    review = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    active = Column(Boolean, default=True)
