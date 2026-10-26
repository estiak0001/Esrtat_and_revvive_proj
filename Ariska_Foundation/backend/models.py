from sqlalchemy import Boolean, Column, Integer, String, Text
from database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)


class CompanySetting(Base):
    __tablename__ = "company_settings"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=True)


class Pillar(Base):
    __tablename__ = "pillars"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(150), nullable=False)


class WhatWeDo(Base):
    __tablename__ = "what_we_do"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class Market(Base):
    __tablename__ = "markets"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    country = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class Journey(Base):
    __tablename__ = "journey"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    value = Column(String(100), nullable=False)
    label = Column(Text, nullable=False)


class MissionPoint(Base):
    __tablename__ = "mission_points"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    text = Column(Text, nullable=False)


class VisionFuture(Base):
    __tablename__ = "vision_future"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    slug = Column(String(100), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    tagline = Column(String(255), nullable=False)
    intro = Column(Text, nullable=False)
    # groups: [{heading, items:[{title, description}]}]
    # client_groups: [{category, names:[string]}] or null
    groups_json = Column(Text, nullable=False, default="[]")
    client_groups_json = Column(Text, nullable=True)


class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(200), nullable=False)
    category = Column(String(200), nullable=False)
    logo_url = Column(String(500), nullable=True)


class TeamMember(Base):
    __tablename__ = "team_members"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    name = Column(String(150), nullable=False)
    role = Column(String(200), nullable=False)
    color = Column(String(30), default="bg-teal-700")
    photo_url = Column(String(500), nullable=True)


class TeamValue(Base):
    __tablename__ = "team_values"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class WhyAriska(Base):
    __tablename__ = "why_ariska"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class BusinessValue(Base):
    __tablename__ = "business_values"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    slug = Column(String(150), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    category = Column(String(150), nullable=True)
    summary = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    # images: ["/uploads/xxx.jpg", ...] — first image is the cover
    images_json = Column(Text, nullable=False, default="[]")
    active = Column(Boolean, default=True)


class Highlight(Base):
    __tablename__ = "highlights"
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, default=0)
    slug = Column(String(150), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    date_label = Column(String(100), nullable=True)
    cover_image = Column(String(500), nullable=True)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=True)
    # images: optional extra gallery for the detail view
    images_json = Column(Text, nullable=False, default="[]")
    active = Column(Boolean, default=True)
